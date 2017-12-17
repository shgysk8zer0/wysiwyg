import {$} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import kbdShortcuts from './std-js/kbd_shortcuts.js';
import wysiwyg from './std-js/wysiwyg.js';

export async function readyHandler() {
	Mutations.init();
	const $doc = $(document.documentElement);
	$doc.replaceClass('no-js', 'js');
	$('[contenteditable="true"]').keypress(kbdShortcuts);
	if (Navigator.prototype.hasOwnProperty('share')) {
		$('[data-share]').attr({hidden: false});
	}

	$doc.click(event => {
		if (! event.target.matches('details[open], details[open] *')) {
			$('details[open].js-auto-close').close();
		}
	});

	$('.toolbar').each(wysiwyg);

	if (HTMLElement.prototype.hasOwnProperty('contextMenu')) {
		const resp = await fetch(new URL('./wysiwyg.html', location.href));
		const parser = new DOMParser();
		const html = await resp.text();
		const doc = parser.parseFromString(html, 'text/html');
		wysiwyg(doc.body.firstElementChild);
		const editor = document.querySelector('[contenteditable="true"]');
		editor.setAttribute('contextmenu', doc.body.firstElementChild.id);
		document.body.appendChild(doc.body.firstElementChild);
	}
}
