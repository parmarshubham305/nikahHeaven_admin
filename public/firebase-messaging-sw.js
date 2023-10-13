/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

//the Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyBq2vzV2AZnVqwbZa9_iRHQNrKkS4R2WVQ",
    authDomain: "nikahhevan.firebaseapp.com",
    databaseURL: "https://nikahhevan-default-rtdb.firebaseio.com",
    projectId: "nikahhevan",
    storageBucket: "nikahhevan.appspot.com",
    messagingSenderId: "1084152193627",
    appId: "1:1084152193627:web:010ad836bb0cadb66cd57e",
    measurementId: "G-BKW7M361RH",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/favicon.png",
        // actions: [
        //     {
        //         action: "meeting",
        //         type: "button",
        //         title: "Show",
        //     },
        // ],
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener('push', () => {
//     const title = "Halodoc Beli Obat, Tanya Dokter, Cek Lab Terpercaya";
//     const options={
//     body: "Anda sudah terhubung dengan Dr. Handoko Tejo Utomo",
//     icon: "/assets/icons/halodoc-icon-square.png",
//     image: "/assets/images/dr-handoko-tejo-utomo.jpg",
//     actions: [
//         {
//             action: 'consult-doctor',
//             type: 'button',
//             title: 'Konsultasi'
//         },
//         {
//             action: 'end-consultation',
//             type: 'button',
//             title: 'Akhiri'
//         }
//         ]
//     };

//     self.registration.showNotification(title, options)
// });

// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//         .register("../firebase-messaging-sw.js")
//         .then(function (registration) {
//             console.log("Registration successful, scope is:", registration.scope);
//         })
//         .catch(function (err) {
//             console.log("Service worker registration failed, error:", err);
//         });
// }
