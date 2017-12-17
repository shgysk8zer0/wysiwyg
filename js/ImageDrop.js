async function readFiles(files, readAs = 'dataURI') {
	return Promise.all([...files].map(async file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.addEventListener('load', event => resolve(event.target.result));
			reader.addEventListener('error', event => reject(event.target));
			switch(readAs) {
			case 'dataURI':
				reader.readAsDataURL(file);
				break;
			case 'binary':
				reader.readAsBinaryString(file);
				break;
			case 'arrayBuffer':
				reader.readAsArrayBuffer(file);
				break;
			case 'text':
				reader.readAsText(file);
				break;
			default:
				throw new Error(`Unknown read format, ${readAs}`);
			}
		});
	}));
}
function dragEnterHandler(event) {
	event.preventDefault();
	this.classList.add('receiving');
}

function dragExitHandler(event) {
	event.preventDefault();
	this.classList.remove('receiving');
}

function dataURI(event) {
	event.preventDefault();
	this.classList.remove('receiving');

	if (event.dataTransfer.files.length !== 0) {
		readFiles(event.dataTransfer.files, 'dataURI').then(files => {
			files.forEach(uri => document.execCommand('insertImage', false, uri));
		}).catch(console.error);
	}
}

export default class ImageDrop {
	static dataURI(el) {
		el.addEventListener('dragenter', dragEnterHandler);
		el.addEventListener('dragexit', dragExitHandler);
		el.addEventListener('drop', dataURI);
	}
}
