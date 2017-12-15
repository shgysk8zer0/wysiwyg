import './std-js/shims.js';
import {$} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import deprefix from './std-js/deprefixer.js';
import webShareApi from './std-js/webShareApi.js';
import * as shares from './share-config.js';

webShareApi(...Object.values(shares));
deprefix();

function readyHandler() {
	Mutations.init();
	const $doc = $(document.documentElement);
	$doc.replaceClass('no-js', 'js');
	if (Navigator.prototype.hasOwnProperty('share')) {
		$('[data-share]').attr({hidden: false});
	}
}

$(self).ready(readyHandler, {once: true});
