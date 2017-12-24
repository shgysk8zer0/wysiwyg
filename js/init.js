import {$} from './std-js/functions.js';
import * as Mutations from './std-js/mutations.js';
import kbdShortcuts from './std-js/kbd_shortcuts.js';
import wysiwyg from './std-js/wysiwyg.js';
import ImageDrop from './ImageDrop.js';

async function registerServiceWorker(el) {
	return new Promise(async (resolve, reject) => {
		try {
			if (! Navigator.prototype.hasOwnProperty('serviceWorker')) {
				throw new Error('Service worker not supported');
			} else if (! navigator.onLine) {
				throw new Error('Offline');
			}

			const url = new URL(el.dataset.serviceWorker, document.baseURI);
			const reg = await navigator.serviceWorker.register(url, {scope: document.baseURI});

			if (navigator.onLine && reg.hasOwnProperty('update')) {
				reg.update();
			}

			reg.addEventListener('updatefound', event => resolve(event.target));
			reg.addEventListener('install', event => resolve(event.target));
			reg.addEventListener('activate', event => resolve(event.target));
			reg.addEventListener('error', event => reject(event.target));
			reg.addEventListener('fetch', console.info);
			console.log(reg);
		} catch (error) {
			reject(error);
		}
	});
}

export async function readyHandler() {
	Mutations.init();
	const $doc = $(document.documentElement);
	$('[data-service-worker]').each( el => registerServiceWorker(el));

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

	$('.toolbar').each(wysiwyg);

	if (HTMLElement.prototype.hasOwnProperty('contextMenu')) {
		const resp = await fetch(new URL('wysiwyg.html', document.baseURI));
		const parser = new DOMParser();
		const html = await resp.text();
		const doc = parser.parseFromString(html, 'text/html');
		wysiwyg(doc.body.firstElementChild);
		const editor = document.querySelector('[contenteditable="true"]');
		editor.setAttribute('contextmenu', doc.body.firstElementChild.id);
		document.body.appendChild(doc.body.firstElementChild);
	}
}
