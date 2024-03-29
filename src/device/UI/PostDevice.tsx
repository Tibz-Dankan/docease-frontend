import { Fragment, useState } from "react";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import "firebase/messaging";
import { useDispatch, useSelector } from "react-redux";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { TAuthState } from "../../types/auth";
import { postDevice } from "../API";
import { Button } from "../../shared/UI/Button";
import { Loader } from "../../shared/UI/Loader";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const PostDevice = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const auth = useSelector((state: TAuthState) => state.auth);

  const { mutate } = useMutation({
    mutationFn: postDevice,
    onSuccess: (response: any) => {
      setIsLoading(() => false);
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      setIsLoading(() => false);
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const isPermissionGranted = async (): Promise<boolean> => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") return true;
    return false;
  };

  const getDeviceToken = async (): Promise<string | null> => {
    const userId = auth.user?.userId as string;
    const accessToken = auth.accessToken as string;
    if (!userId || !accessToken) {
      return null;
    }

    if (!(await isPermissionGranted())) {
      console.log("Not granted permission");
      return null;
    }

    try {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      console.log("device token", token);
      return token;
    } catch (error: any) {
      setIsLoading(() => false);
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    }
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

  const postDeviceTokenHandler = async () => {
    setIsLoading(() => true);
    const userAgent = window.navigator.userAgent;
    const platform = parseUserAgent(userAgent);

    const token = await getDeviceToken();
    const userId = auth.user?.userId as string;
    const accessToken = auth.accessToken as string;

    if (!userId || !accessToken || !platform || !token) {
      return;
    }

    mutate({
      userId: userId,
      deviceToken: token,
      devicePlatform: platform,
      accessToken: accessToken,
    });
    setIsLoading(() => false);
  };

  return (
    <Fragment>
      <div
        className="full border-[1px] border-gray-300 rounded-md 
         p-4 relative h-28 text-gray-800"
      >
        <p>Turn on push notifications for this device</p>
        {!isLoading && (
          <Button
            type="button"
            label="Turn on"
            onClick={() => postDeviceTokenHandler()}
            className="absolute bottom-2 right-2 w-24"
          />
        )}
        {isLoading && (
          <div
            className="bg-primary text-gray-50 flex items-center
             justify-center rounded absolute bottom-2 right-2 w-24 
             py-1 px-2"
          >
            <Loader className="w-8 h-8" />
          </div>
        )}
      </div>
    </Fragment>
  );
};
