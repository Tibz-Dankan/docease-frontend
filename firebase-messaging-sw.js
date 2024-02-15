importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAcG4U56TO1A1cCOxXWpBr-DQDuyQsXm7A",
  authDomain: "doceasev2.firebaseapp.com",
  projectId: "doceasev2",
  storageBucket: "doceasev2.appspot.com",
  messagingSenderId: "740647548486",
  appId: "1:740647548486:web:8e1aa9297f4d9d049e3c47",
  measurementId: "G-TF2C92VX7R",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
