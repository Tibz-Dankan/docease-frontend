import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import "firebase/messaging";
import { useDispatch, useSelector } from "react-redux";
import {
  hideCardNotification,
  showCardNotification,
} from "../store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { TAuthState } from "../types/auth";
import { postDeviceToken } from "../device/API";
// import dotenv from "dotenv";

// dotenv.config();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAcG4U56TO1A1cCOxXWpBr-DQDuyQsXm7A",
  authDomain: "doceasev2.firebaseapp.com",
  projectId: "doceasev2",
  storageBucket: "doceasev2.appspot.com",
  messagingSenderId: "740647548486",
  appId: "1:740647548486:web:8e1aa9297f4d9d049e3c47",
  measurementId: "G-TF2C92VX7R",
};

const firebaseApp = initializeApp(firebaseConfig);

export const useGetDeviceToken = () => {
  const [platform, setPlatform] = useState<string>("");
  const [deviceToken, setDeviceToken] = useState<string>("");

  const dispatch: any = useDispatch();
  //   const messaging = firebase.messaging();
  const auth = useSelector((state: TAuthState) => state.auth);

  //   const { isLoading, mutate } = useMutation({
  const { mutate } = useMutation({
    mutationFn: postDeviceToken,
    onSuccess: (response: any) => {
      console.log("response->", response);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const postDeviceTokenHandler = () => {
    const userId = auth.user?.userId as string;
    const accessToken = auth.accessToken as string;
    if (!userId || !accessToken || !platform || !deviceToken) {
      return;
    }

    mutate({
      userId: userId,
      deviceToken: deviceToken,
      platform: platform,
      accessToken: accessToken,
    });
  };

  const isPermissionGranted = async (): Promise<boolean> => {
    const permission = await Notification.requestPermission();
    console.log("permission->", permission);
    if (permission === "granted") return true;
    return false;
  };

  const getDeviceToken = async () => {
    const userId = auth.user?.userId as string;
    const accessToken = auth.accessToken as string;
    if (!userId || !accessToken) {
      return;
    }

    if (!(await isPermissionGranted())) {
      console.log("Not granted permission");
      return;
    }
    const messaging = getMessaging(firebaseApp);
    getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY })
      .then((token) => {
        if (token) {
          console.log("device Token->", token);
          setDeviceToken(() => token);
          return token;
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      })
      .catch((error: any) => {
        console.error("Error obtaining token:", error);
        dispatch(
          showCardNotification({ type: "error", message: error.message })
        );
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
      });
    return null;
  };

  const parseUserAgent = (userAgent: string): string => {
    if (userAgent.match(/Windows/i)) {
      return "Windows";
    } else if (userAgent.match(/Macintosh|Mac OS X/i)) {
      return "macOS";
    } else if (userAgent.match(/Linux/i)) {
      return "Linux";
    } else if (userAgent.match(/iPad/i)) {
      return "iPad";
    } else if (userAgent.match(/iPhone/i)) {
      return "iPhone";
    } else if (userAgent.match(/Android/i)) {
      return "Android";
    } else {
      return "Unknown";
    }
  };

  useEffect(() => {
    // TODO: logic to check if the user has device for this device
    const userAgent = window.navigator.userAgent;
    const platformString = parseUserAgent(userAgent);
    console.log("platform->", platformString);
    setPlatform(() => platformString);

    const deviceToken = getDeviceToken();

    if (!deviceToken && !platformString) return;
    postDeviceTokenHandler();
  }, []);

  return {};
};
