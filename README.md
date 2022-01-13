# Custom HTML in Pages (custom-html-in-pages)

> Chrome Extension for adding Custom HTML code in Single Page, All Pages or Domains

[![Chrome](https://img.shields.io/badge/Chrome%20Extension-1.0.0-blue)](https://github.com/codeeshop-oc/custom-html-in-pages/blob/main/LICENSE)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/codeeshop-oc/custom-html-in-pages/blob/main/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/codeeshop-oc/custom-html-in-pages/issues?&q=is%3Aissue+is%3Aopen)


## Install the dependencies
```bash
yarn install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev -m bex
```

Follow the development procedure for chrome and firefox described here:
[Quasar BEX Build Commands](https://quasar.dev/quasar-cli/developing-browser-extensions/build-commands)

### Build the app for production
```bash
quasar build -m bex
```

Follow the production building tutorial here:
[Quasar Production BEX Build Commands]](https://quasar.dev/quasar-cli/developing-browser-extensions/build-commands#Building-for-Production)

## What works as of now
Current tested in Chrome only. After installation you can browse to any URL and see the extension working.
- A Popup will open when click on the Chrome Extension Icon
- Fill the fields


### All Props

| Field name         	 | Description                                                         		 | Type    | Values                  
| ---------------------- | --------------------------------------------------------------------------| ------- | ---------------------
| Included URL      	 | Enter the URL in which you want to insert your code in head section. Leave this field blank if you want for all pages 		 | String  | https://google.com
| Excluded URL      	 | Enter the URL in which you dont want to insert your code in head section. Comma separated for multiple values  | String  | https://google.com 
| Script and tags to add | Add the script tags you want to add in head section  					 | String  | <script src="https://unpkg.com/vue-full-autocomplete" async="true"></script>       

- See the result by inspecting ( Ctrl + Shift + F12 ) and check under head section.

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


### 🔖 License

This software is licensed under the [MIT](https://github.com/codeeshop-oc/custom-html-in-pages/blob/main/LICENSE).