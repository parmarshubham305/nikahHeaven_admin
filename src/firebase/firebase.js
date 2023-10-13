import { initializeApp, registerVersion } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import "firebase/messaging";

// Epicbae
const firebaseConfig = {
    apiKey: "AIzaSyAlJSmfUC9rNzGg5CMDdv9TAgxG-WyaKcc",
    authDomain: "nikahheaven-77.firebaseapp.com",
    databaseURL: "https://nikahheaven-77-default-rtdb.firebaseio.com",
    projectId: "nikahheaven-77",
    storageBucket: "nikahheaven-77.appspot.com",
    messagingSenderId: "602164921281",
    appId: "1:602164921281:web:90263203b9e46391c12540",
    measurementId: "G-15Y4P8MRKC",
};

//jeel
// const firebaseConfig = {
//     apiKey: "AIzaSyBq2vzV2AZnVqwbZa9_iRHQNrKkS4R2WVQ",
//     authDomain: "nikahhevan.firebaseapp.com",
//     databaseURL: "https://nikahhevan-default-rtdb.firebaseio.com",
//     projectId: "nikahhevan",
//     storageBucket: "nikahhevan.appspot.com",
//     messagingSenderId: "1084152193627",
//     appId: "1:1084152193627:web:010ad836bb0cadb66cd57e",
//     measurementId: "G-BKW7M361RH",
// };

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const messaging = getMessaging(firebase);

export const requestPermission = () => {
    // const VAPID_KEY = "BNLkZ36KL9DPe9W1C6zxKAzYBLYHOwXOPSz1PKQ8hXSN1gLgRyyZkzytI6pmXnixF57x_gSc--j7q1AIk9tNvko";
    console.log("Requesting User Permission......");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            // self.registration.showNotification(notificationTitle, notificationOptions);
            console.log("Notification User Permission Granted.");
            // navigator.serviceWorker.ready.then((registration) => {
            //     messaging.onBackgroundMessage(function (payload) {
            //         console.log("Received background message ", payload);
            //         const notificationTitle = payload.notification.title;
            //         const notificationOptions = {
            //             body: payload.notification.body,
            //             icon: "./favicon.png",
            //             vibrate: [200, 100, 200, 100, 200, 100, 200]
            //         };

            //         registration.showNotification(notificationTitle, notificationOptions);
            //     });
            //     // registration.showNotification("Vibration Sample", {
            //     //   body: "Buzz! Buzz!",
            //     //   icon: "../images/touch/chrome-touch-icon-192x192.png",
            //     //   vibrate: [200, 100, 200, 100, 200, 100, 200],
            //     //   tag: "vibration-sample",
            //     // });
            //   });

            // return getToken(messaging, { vapidKey:VAPID_KEY })
            //   .then((currentToken) => {
            //     if (currentToken) {
            //       console.log('Client Token: ', currentToken);

            //     } else {

            //       console.log('Failed to generate the app registration token.');
            //     }
            //   })
            //   .catch((err) => {
            //     console.log('An error occurred when requesting to receive the token.', err);
            //   });
        } else {
            console.log("User Permission Denied.");
        }
    });
};

requestPermission();

// export const onMessageListener = () =>
//     new Promise((resolve) => {
//         onMessage(messaging, (payload) => {
//             console.log("PAYLOAD--", payload);
//             const notificationTitle = payload.notification.title;
//             const notificationOptions = {
//                 body: payload.notification.body,
//                 icon: "/favicon.png",
//                 vibrate: [200, 100, 200, 100, 200, 100, 200],
//             };

//             // eslint-disable-next-line no-restricted-globals
//             self.registration.showNotification(notificationTitle, notificationOptions);
//             // eslint-disable-next-line no-undef
//             // runtime.register().then(registration => {
//             //     registration.showNotification(notificationTitle, notificationOptions);
//             // })
//             // if ("serviceWorker" in navigator) {

//             // }
//             resolve(payload);
//         });
//     });

// onMessageListener();

export { auth, db, messaging };
