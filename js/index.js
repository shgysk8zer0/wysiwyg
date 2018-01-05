import './std-js/shims.js';
import './std-js/deprefixer.js';
import {ready} from './std-js/functions.js';
import webShareApi from './std-js/webShareApi.js';
import * as shares from './share-config.js';
import * as Init from './init.js';

ready.then(Init.readyHandler);

webShareApi(...Object.values(shares));
