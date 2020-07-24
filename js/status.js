document.addEventListener('DOMContentLoaded', init, false);

function init() {
	if (!navigator.onLine) {
		const statusElem = document.querySelector('.page-status')

		statusElem.innerHTML = 'offline'
		statusElem.appendChild(document.createElement('img')).src = '/images/h1_logo.png';

	}
}