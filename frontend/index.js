const check = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
        throw new Error('No Push API support!')
    }
}

const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('service.js');
    return swRegistration;
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    console.log(Notification.permission);
    if (permission !== 'granted') {
        throw new Error('Permission not granted for Notification');
    }
}

// const showLocalNotification = (title, body, swRegistration) => {
//     const options = {
//         body,
//     };
//     swRegistration.showLocalNotification(title, options);
// }

const main = async () => {
    check();
    const swRegistration = await registerServiceWorker();
    const permission = await requestNotificationPermission();
    // showLocalNotification('This is title', 'this is the message', swRegistration);
}

//ain();