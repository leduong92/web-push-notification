// console.log('Hello from service worker');

const urlB64ToUnit8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const saveSubscription = async subscription => {
    const SERVER_URL = 'http://localhost:4000/save-subscription';
    const response = await fetch(SERVER_URL, {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(subscription),
    })
    return response.json();
}


self.addEventListener('activate', async () => {
    console.log('service worker activate');
    try {
        const applicationServerKey = urlB64ToUnit8Array(
            'BHQtE8x_2enI56C14ooaSga8J3PhsAlsP82BNqiONFSg09RPen3TKOTsLgJCbpNCOMa2PEmVevSbvTA2WS62Voo'
        )
        const options = { applicationServerKey, userVisibleOnly: true };
        const subscription = await self.registration.pushManager.subscribe(options);
        // const subscription = await self.registration.pushManager.getSubscription();
        const response = await saveSubscription(subscription);
        // console.log(JSON.stringify(subscription));
        console.log(response);
    }catch (err) {
        console.log('Error', err)
    }
})

self.addEventListener('push', function(event) {
    if (event.data) {
        console.log('Push event!', event.data.text());
        showLocalNotification("yolo", event.data.text(), self.registration);
    } else {
        console.log('Push event but no data');
    }
})

const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body,
    };
    swRegistration.showNotification(title, options);
}