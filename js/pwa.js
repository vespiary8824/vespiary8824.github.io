document.addEventListener('DOMContentLoaded', init, false);

function init() {
	if ('serviceWorker' in navigator && navigator.onLine) {
		navigator.serviceWorker.register('/service-worker.js')
			.then((reg) => {
				initSubscribe(reg); //구독 등록
				console.log('Service worker registered -->', reg);
			}, (err) => {
				console.error('Service worker not registered -->', err);
			});
	}
}
