document.addEventListener('DOMContentLoaded', init, false);


function init() {
	if ('serviceWorker' in navigator && navigator.onLine) {
		navigator.serviceWorker.register('/service-worker.js')
			.then((reg) => {
				console.log('Service worker registered -->', reg);
				initSubscribe(reg); //구독 등록
			}, (err) => {
				console.error('Service worker not registered -->', err);
			});
	}
}
