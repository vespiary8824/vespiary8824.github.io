
//https://blog.woolta.com/categories/3/posts/195
//https://joshua1988.github.io/web-development/pwa/pwa-push-noti-guide/
export const PUSH_APPLICATION_SERVER_KEY = 'AAAAcbstLnc:APA91bHSLhyZKBG7XPMVx73NHDLH-n8hTo8WD6zZ_iGE3QSyJAS1DL1csB37F2psi68H2VtB_qQlyRB_5k4DjvTRI7Q9iHS3_fPl8e9z8jE2H9xF5ZdbmSYLQv6vl9Jqw6q-RpAPK_6N';


// 해시 처리
const urlB64ToUint8Array = (base64String: string) => {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = URL.createObjectURL(new Blob([base64], { type: 'text/plain' })); //window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
};

// 구독하기
export const subscribeUser = (swRegistration) => {

	const applicationServerKey = urlB64ToUint8Array(PUSH_APPLICATION_SERVER_KEY);
	const ACCESS_PUSH_TOKEN = 'ACCESS_PUSH_TOKEN';

	swRegistration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: applicationServerKey, // 서버 키 등록
	}).then((subscription) => {
		const pwaSubscription = JSON.parse(JSON.stringify(subscription));
		localStorage.setItem(ACCESS_PUSH_TOKEN, pwaSubscription.keys.auth); // 추후 코드 제거를 위해 저장합니다.
		pushSubscription(pwaSubscription);
	}).catch(e => console.log(`subscribe error`, e));
};

export const pushSubscription = (subscription) => {
	// 서버로 구독 정보 전송 
	debugger;
	console.log(subscription);
};

// 서버에서 푸쉬가 왔을때 감지하는 이벤트.
self.addEventListener('push', function (event) {
	console.log(`Push had this data: "${event.data.text()}"`);
	const pushInfo = JSON.parse(event.data.text());

	const options = { // 푸쉬 알림창에 대한 각종 설정
		body: pushInfo.content, // 푸쉬 매세지에 대한 설정.
		icon: '/images/icons/icon-192x192.png', // 알림 아이콘 사이즈
		data: {// 푸쉬메세지에 필요한 커스텀값들을 obj 형태로 전달 가능.
			url: pushInfo.url // 알림 클릭시 필요한 url 세팅. 커스텀 데이터
		}
	};

	//showNotification 에 첫 파라미터는 제목, 두번째는 위의 옵션 데이터를 넣어줍니다.
	event.waitUntil(self.registration.showNotification(pushInfo.title, options));
});

// 알림 메세지를 클릭했을때의 이벤트.
self.addEventListener('notificationclick', function (event) {
	event.notification.close(); // 푸쉬 종료 처리

	event.waitUntil(
		// `push` 에서 받은 url로 새창으로 열어 이동
		clients.openWindow(event.notification.data.url)
	);
});

const removeAccessPushToken = () => {
	const pwaSubscriptionKey = localStorage.getItem(ACCESS_PUSH_TOKEN); // subscribeUser 에서 저장한 키 가져오기
	if (!pwaSubscriptionKey) {
		return;
	}
	pushUnsubscription(pwaSubscriptionKey);
	localStorage.removeItem(ACCESS_PUSH_TOKEN);
};

cosnt pushUnsubscription = pwaSubscriptionKey => '서버로 해당 키 제거 요청'




export const initSubscribe = (swRegistration) => {

	// 사용자가 브라우저에서 강제로 알람 차단 할 경우 남아있는 키 제거
	if (Notification.permission !== 'granted') {
		removeAccessPushToken();
	}

	// 알림 기본 설정일 경우 구독 시켜주기.
	if (Notification.permission === 'default') {
		subscribeUser(swRegistration);
	}
};
