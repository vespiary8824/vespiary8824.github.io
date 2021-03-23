document.addEventListener('DOMContentLoaded', init, false);



const initSubscribe = (swRegistration) => {

	// 사용자가 브라우저에서 강제로 알람 차단 할 경우 남아있는 키 제거
	if (Notification.permission !== 'granted') {
		removeAccessPushToken();
	}

	// 알림 기본 설정일 경우 구독 시켜주기.
	if (Notification.permission === 'default') {
		subscribeUser(swRegistration);
	}
};


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
