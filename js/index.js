import './std-js/shims.js';
import {$} from './std-js/functions.js';
import deprefix from './std-js/deprefixer.js';
import webShareApi from './std-js/webShareApi.js';
import * as shares from './share-config.js';
import * as Init from './init.js';

webShareApi(...Object.values(shares));
deprefix();

$(self).ready(Init.readyHandler, {once: true});
