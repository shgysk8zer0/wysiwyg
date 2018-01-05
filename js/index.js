import './std-js/shims.js';
import './std-js/deprefixer.js';
import {ready, registerServiceWorker} from './std-js/functions.js';
import webShareApi from './std-js/webShareApi.js';
import * as shares from './share-config.js';
import * as Init from './init.js';

registerServiceWorker(document.documentElement.dataset.serviceWorker);
ready().then(Init.readyHandler);

webShareApi(...Object.values(shares));
