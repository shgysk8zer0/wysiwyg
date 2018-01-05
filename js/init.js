import {$} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import kbdShortcuts from './std-js/kbd_shortcuts.js';
import wysiwyg from './std-js/wysiwyg.js';
import ImageDrop from './ImageDrop.js';

export async function readyHandler() {
	Mutations.init();
	const $doc = $(document.documentElement);

	if (Navigator.prototype.hasOwnProperty('share')) {
		$('[data-share]').attr({hidden: false});
	}

	$doc.replaceClass('no-js', 'js');
	$('[contenteditable="true"]').keypress(kbdShortcuts);
	$('[contenteditable="true"]').each(ImageDrop.dataURI);

	if (Navigator.prototype.hasOwnProperty('share')) {
		$('[data-share]').attr({hidden: false});
	}

	$doc.click(event => {
		if (! event.target.matches('details[open], details[open] *')) {
			$('details[open].js-auto-close').close();
		}
	});

	$('.toolbar, #wysiwyg-menu').each(wysiwyg);
}
