import { bexBackground } from 'quasar/wrappers';

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.onClicked.addListener((/* tab */) => {
    // Opens our extension in a new browser window.
    // Only if a popup isn't defined in the manifest.
    chrome.tabs.create(
      {
        url: chrome.runtime.getURL('www/index.html'),
      },
      (/* newTab */) => {
        // Tab opened.
      }
    );
  });

  chrome.runtime.sendMessage({
    action: 'runConsoleJavaScript',
    javascript: 'console.log("Hello, world1!")'
   });

});

declare module '@quasar/app-vite' {
  interface BexEventMap {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    log: [{ message: string; data?: any[] }, never];
    getTime: [never, number];

    'storage.get': [{ key: string | null }, any];
    'storage.set': [{ key: string; value: any }, any];
    'storage.remove': [{ key: string }, any];
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}

export default bexBackground((bridge /* , allActiveConnections */) => {
  chrome.tabs.query(
    {
      active: true,
    },
    function (tabs) {
      try {
        const activeTab = tabs[0];
        console.log('activeTab', activeTab)
        init(activeTab.url);

      } catch (err) {
        console.warn(err);
      }
    }
  );
    
  
  bridge.on('log', ({ data, respond }) => {
    console.log(`[BEX] ${data.message}`, ...(data.data || []));
    respond();
  });

  bridge.on('getTime', ({ respond }) => {
    respond(Date.now());
  });

  bridge.on('storage.get', ({ data, respond }) => {
    const { key } = data;
    if (key === null) {
      chrome.storage.local.get(null, (items) => {
        // Group the values up into an array to take advantage of the bridge's chunk splitting.
        respond(Object.values(items));
      });
    } else {
      chrome.storage.local.get([key], (items) => {
        respond(items[key]);
      });
    }
  });
  // Usage:
  // const { data } = await bridge.send('storage.get', { key: 'someKey' })

  bridge.on('storage.set', ({ data, respond }) => {
    chrome.storage.local.set({ [data.key]: data.value }, () => {
      respond();
    });
  });
  // Usage:
  // await bridge.send('storage.set', { key: 'someKey', value: 'someValue' })

  bridge.on('storage.remove', ({ data, respond }) => {
    chrome.storage.local.remove(data.key, () => {
      respond();
    });
  });
  // Usage:
  // await bridge.send('storage.remove', { key: 'someKey' })

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

  // bridge.on('highlight.content', ({ data, respond }) => {
  //   bridge.send('highlight.content', {
  //     data,
  //     respond,
  //   });
  //   console.log(data, 'xxxdata');
  //   respond(true);
  // });

  bridge.on('browserURLChanged', async ({ data, respond }) => {
    
    console.log('backen browserURLChangedw')
    await bridge.send('highlight.browserurlchanged', {
      data,
      respond,
    });
    console.log(data, 'wwwdata');
    respond(true);
  });

  try {
    function init(current_active_url) {
      console.log('INIT', current_active_url)

      let localStorageTemp = {}

      const getLocalData = function (key) {
        if(key == 'all') {
          key = 'https://all'
        }
        // console.log(localStorageTemp, key, 'localStorageTemp, key')

        return typeof localStorageTemp[key] == 'undefined' ? null : localStorageTemp[key]
      };

      const QuasarStorageToString = (val) => {
        // console.log(val, val == null, 'QuasarStorageToString1')        
        return val == null ? '' : val.substring(9);
      };

      const StringToJSON = (val) => {
        return JSON.parse(val);
      };

      const getStorageValue = (key) => {
        return StringToJSON(QuasarStorageToString(getLocalData(key)));
      };

      const isExcluded = (current_url, excluded_urls) => {
        if(typeof excluded_urls == 'undefined') {
          excluded_urls = ''
        }
        // console.log(current_url, excluded_urls, 'current_url, excluded_urls')
        const new_excluded_urls = excluded_urls.split(',');
        let isExcludedBool = false;
        for (let i = new_excluded_urls.length - 1; i >= 0; i--) {
          if (new_excluded_urls[i] == current_url) {
            isExcludedBool = true;
            break;
          }
        }

        return isExcludedBool;
      };

      const getOriginFromURL = (url) => {
        let resp = '';
        try {
          if (!['', 'all'].includes(url)) {
            const myUrl = new URL(url);
            resp = myUrl['origin'];
          }
          // console.log(resp, 'resp');
        } catch (err) {
          console.warn(err);
        }
        return resp;
      };

      const checkURLScriptToAdd = async (url) => {
        const curr_origin = getOriginFromURL(url);
        
        let found = false;
        let data = false;
        const res = await bridge.send('getstorage', { url })
        localStorageTemp = res.data
        console.log(localStorageTemp, 'localStorageTemp')      
        
        for (let i = 0; i < localStorageTemp.length; i++) {
          data = getStorageValue(getLocalData(i));
          // data.included_url
          const new_origin = getOriginFromURL(data.included_url);
          if (
            data.included_url != 'all' &&
            (data.included_url == url || new_origin == curr_origin)
          ) {
            found = true;
            break;
          }
        }
        
        if (!found) {
          data = false;
          // console.log(getStorageValue('all'))
          if (getLocalData('all') != null) {
            data = getStorageValue('all');
          }
        }

        // console.log(data, !isExcluded(url, data.excluded_url), 'outside2');
          console.log('outsidexxx1');
        if (data && !isExcluded(url, data.excluded_url)) {
          console.log('insidexxx1');
          const newData = {
            ...data,
            ...{
              current_active_url: current_active_url,
            },
          }
          console.log(newData, 'newData4')
          await bridge.send('browser.URLChanged', newData);
          console.log('afternewData')
        }
      };

      const removeUnwanted = (url) => {
        return (url = url.replace('www.', ''));
      };
      checkURLScriptToAdd(removeUnwanted(current_active_url));
    }
  } catch (err) {
    console.error(err);
  }
});
