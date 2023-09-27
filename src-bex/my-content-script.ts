// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks
import { bexContent } from 'quasar/wrappers';

export default bexContent((bridge) => {
  // Hook into the bridge to listen for events sent from the client BEX.
  // "default_popup": "www/index.html#/popup"
  
  bridge.on('highlight.browserurlchanged', ({ data, respond }) => {
    try {
      console.log('RUN4');
    const payload = data.data.data;    
    if (
      payload.current_active_url == window.location.href ||
      payload.current_active_url == window.location.origin
    ) {
      // bridge.send(event.eventResponseKey);
      console.log('xxxxxxx4')
      // remove the previous code
      const ele = document.querySelector('.custom_html_in_pages')
      if (ele) {        
        document.querySelector('.custom_html_in_pages').parentNode.removeChild(
          ele
        );
      }

      // Define the function as a string
      const functionString = `
        console.log("here now");
      `;
      console.log('xxxxxxx6')

      // Create a function from the string using the Function constructor
      const dynamicFunction = new Function(functionString);

      // Call the dynamically created function
      dynamicFunction();
      console.log(dynamicFunction, 'xxxxxxx5')

      const fragment = document
        .createRange()
        .createContextualFragment(payload.content);
      document.head.prepend(fragment);

    }

    } catch(err) {
      console.log(err)
    }    
    respond();
  });
  

  chrome.runtime.onMessage.addListener(function(message) {
  console.log(message.action, 'message.action')
    if (message.action === 'runConsoleJavaScript') {
      eval(message.javascript);
    }
  });
 
});

const iFrame = document.createElement('iframe'),
  defaultFrameHeight = '0';

/**
 * Set the height of our iFrame housing our BEX
 * @param height
 */
const setIFrameHeight = (height) => {
  iFrame.height = height;
};

/**
 * Reset the iFrame to its default height e.g The height of the top bar.
 */
const resetIFrameHeight = () => {
  setIFrameHeight(defaultFrameHeight);
};

/**
 * The code below will get everything going. Initialize the iFrame with defaults and add it to the page.
 * @type {string}
 */
iFrame.id = 'custom-html-in-pages-iframe';
iFrame.width = '1px';
resetIFrameHeight();

// Assign some styling so it looks seamless
Object.assign(iFrame.style, {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  border: '0',
  zIndex: '9999999', // Make sure it's on top
  overflow: 'visible',
});
(function () {
  // When the page loads, insert our browser extension app.
  iFrame.src = chrome.runtime.getURL('www/index.html');
  document.body.prepend(iFrame);
})();
