const
  iFrame = document.createElement('iframe'),
  defaultFrameHeight = '0'

/**
 * Set the height of our iFrame housing our BEX
 * @param height
 */
const setIFrameHeight = height => {
  iFrame.height = height
}

/**
 * Reset the iFrame to its default height e.g The height of the top bar.
 */
const resetIFrameHeight = () => {
  setIFrameHeight(defaultFrameHeight)
}

/**
 * Content hooks which listen for messages from the BEX in the iFrame
 * @param bridge
 */
export default function attachContentHooks(bridge) {
  /**
   * When the drawer is toggled set the iFrame height to take the whole page.
   * Reset when the drawer is closed.
   */
  // bridge.on('wb.drawer.toggle', event => {
  //   const payload = event.data
  //   if (payload.open) {
  //     setIFrameHeight('100%')
  //   } else {
  //     resetIFrameHeight()
  //   }
  //   bridge.send(event.eventResponseKey)
  // })

  bridge.on('browserURLChanged', event => {
    const payload = event.data
    
    if (payload.current_active_url == window.location.href || payload.current_active_url == window.location.origin) {
      bridge.send(event.eventResponseKey)
      // remove the previous code 
      if(document.querySelector('.custom_html_in_pages')) document.querySelector('.custom_html_in_pages').parentNode.removeChild(document.querySelector('.custom_html_in_pages'))
      const fragment = document.createRange().createContextualFragment(payload.content);
      document.head.prepend(fragment);
      // document.head.insertAdjacentHTML('afterbegin', payload.content);

      // if(!process.env.PROD) {
        // var script = document.createElement('script');
        // script.type = 'text/javascript';
        // script.src = 'https://www.bugherd.com/sidebarv2.js?apikey=gbisld9y95s7vajcukdjqg';
        // document.head.appendChild(script);  
      // }
 
    }
  })
}

/**
 * The code below will get everything going. Initialize the iFrame with defaults and add it to the page.
 * @type {string}
 */
iFrame.id = 'custom-html-in-pages-iframe'
iFrame.width = '100%'
resetIFrameHeight()

// Assign some styling so it looks seamless
Object.assign(iFrame.style, {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  border: '0',
  zIndex: '9999999', // Make sure it's on top
  overflow: 'visible'
})

;
(function() {
  // When the page loads, insert our browser extension app.  
  iFrame.src = chrome.runtime.getURL(`www/index.html`)
  document.body.prepend(iFrame)  
})()