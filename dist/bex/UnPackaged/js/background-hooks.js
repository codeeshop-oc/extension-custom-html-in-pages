// Hooks added here have a bridge allowing communication between the BEX Background Script and the BEX Content Script.
// Note: Events sent from this background script using `bridge.send` can be `listen`'d for by all client BEX bridges for this BEX

// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/background-hooks

export default function attachBackgroundHooks(bridge /* , allActiveConnections */ ) {
   
  bridge.on('storage.get', event => {
    const payload = event.data
    if (payload.key === null) {
      chrome.storage.local.get(null, r => {
        const result = []

        // Group the items up into an array to take advantage of the bridge's chunk splitting.
        for (const itemKey in r) {
          result.push(r[itemKey])
        }
        bridge.send(event.eventResponseKey, result)
      })
    } else {
      chrome.storage.local.get([payload.key], r => {
        bridge.send(event.eventResponseKey, r[payload.key])
      })
    }
  })

  bridge.on('storage.set', event => {
    const payload = event.data
    chrome.storage.local.set({
      [payload.key]: payload.data
    }, () => {
      bridge.send(event.eventResponseKey, payload.data)
    })
  })

  bridge.on('storage.remove', event => {
    const payload = event.data
    chrome.storage.local.remove(payload.key, () => {
      bridge.send(event.eventResponseKey, payload.data)
    })
  })

  /*
  // EXAMPLES
  // Listen to a message from the client
  bridge.on('test', d => {
    console.log(d)
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onCreated.addListener(tab => {
    bridge.send('browserTabCreated', { tab })
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      bridge.send('browserTabUpdated', { tab, changeInfo })
    }
  })
   */

  chrome.tabs.query({
    active: true
  }, function(tabs) {
    try {
      var activeTab = tabs[0];
      init(activeTab.url)
    } catch (err) {
      console.warn(err)
    }
  });

  function init(current_active_url) {
    
    const QuasarStorageToString = (val) => {
      return val.substring(9)
    }

    const StringToJSON = val => {
      return JSON.parse(val)
    }

    const getStorageValue = key => {
      return StringToJSON(QuasarStorageToString(localStorage.getItem(key)))
    }

    const isExcluded = (current_url, excluded_urls) => {      
      let new_excluded_urls = excluded_urls.split(',')
      let isExcludedBool = false
      for (var i = new_excluded_urls.length - 1; i >= 0; i--) {
        if (new_excluded_urls[i] == current_url) {
          isExcludedBool = true
          break;
        }
      }

      return isExcludedBool
    }

    const getOriginFromURL = url => {
      let resp = ''
      try {
        if(!['', 'all'].includes(url)) {          
          const myUrl = new URL(url)    
          resp = myUrl['origin']
        }
      } catch(err) {
        console.warn(err)
      }
      return resp
    }

    const checkURLScriptToAdd = (url) => {
      let curr_origin = getOriginFromURL(url)

      let found = false
      let data = false        
      for (var i = 0; i < localStorage.length; i++) {
        data = getStorageValue(localStorage.key(i))        
        // data.included_url
        let new_origin = getOriginFromURL(data.included_url)

        if (data.included_url != 'all' && (data.included_url == url || new_origin == curr_origin)) {
          found = true
          break;
        }
      }

      if (!found) {
        data = false
        if (localStorage.getItem('all') != null) {
          data = getStorageValue('all')
        }
      }

      if (data && !isExcluded(url, data.excluded_url)) {
        bridge.send('browserURLChanged', {
          ...data,
          ...{
            current_active_url: current_active_url
          }
        });
      }
      // switch()
    }

    checkURLScriptToAdd(current_active_url)
  }
}