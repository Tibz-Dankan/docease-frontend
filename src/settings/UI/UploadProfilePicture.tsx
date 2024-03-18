import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { IoPersonCircleSharp } from "react-icons/io5";
import { updateProfileImage } from "../API";
import { TAuthState } from "../../types/auth";
import { ImagePicker } from "../../shared/UI/ImagePicker";
import { Loader } from "../../shared/UI/Loader";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { Image } from "../../shared/UI/Image";

export const UploadProfilePicture: React.FC = () => {
  const user = useSelector((state: TAuthState) => state.auth.user);
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  ) as string;

  const [selectedPhoto, setSelectedPhoto] = useState("");

  const dispatch: any = useDispatch();

  const onSelectHandler = (photo: any) => {
    setSelectedPhoto(() => photo);
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: updateProfileImage,
    onSuccess: (response: any) => {
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const uploadImageHandler = async () => {
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([selectedPhoto], { type: "image/*" }),
      `${user?.firstName}-${user?.lastName}.png`
    );

    const userId = user?.userId as string;

    mutate({
      userId: userId,
      formData: formData,
      token: accessToken,
    });
  };

  const imageURLHandler = (imageArrayBuffer: any) => {
    if (!imageArrayBuffer) return;
    const blob = new Blob([imageArrayBuffer], { type: "image/*" });
    return URL.createObjectURL(blob);
  };

  return (
    <Fragment>
      <div
        className="flex flex-col justify-center items-center 
        p-4 space-y-4 bg-white rounded-lg w-full shadow-md"
      >
        {!selectedPhoto && (
          <div className="sm:min-w-64 flex items-center justify-center">
            {user?.imageUrl && (
              <Image
                src={user.imageUrl}
                alt={user.firstName}
                className="w-52 h-52 sm:w-64 sm:h-64 rounded-[50%]"
              />
            )}
            {!user?.imageUrl && (
              <IconContext.Provider
                value={{
                  size: "200px",
                  color: "#495057",
                }}
              >
                <IoPersonCircleSharp />
              </IconContext.Provider>
            )}
          </div>
        )}
        {selectedPhoto && (
          <div className="flex items-center justify-center">
            <Image
              src={imageURLHandler(selectedPhoto)!}
              alt="selected-photo"
              className="w-52 h-52 sm:w-64 sm:h-64 rounded-[50%]"
            />
          </div>
        )}
        <div className="flex items-center justify-center gap-4 relative p-2">
          <ImagePicker
            title={user?.imageUrl ? "Change Photo" : "Add Photo"}
            onSave={onSelectHandler}
          />
          {selectedPhoto && (
            <div>
              <button
                className="px-4 py-1 bg-primary text-gray-50 rounded"
                onClick={() => uploadImageHandler()}
                disabled={isLoading}
              >
                {isLoading && <Loader />}
                {!isLoading && "Upload"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
