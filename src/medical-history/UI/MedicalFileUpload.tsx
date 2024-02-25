import React, { Fragment, useState } from "react";
import { MedicalFilePicker } from "./MedicalFilePicker";
import { Loader } from "../../shared/UI/Loader";
import { MdCloudUpload } from "react-icons/md";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { uploadPatientMedicalFile } from "../API";
import { TAuthState } from "../../types/auth";

interface UploadMedicalFileProps {}

type TFile = {
  content: any; //content is ArrayBuffer of a file
  name: string;
  type: string;
};

export const MedicalFileUpload: React.FC<UploadMedicalFileProps> = () => {
  const [file, setFile] = useState<TFile>({
    content: null,
    name: "",
    type: "",
  });

  const dispatch: any = useDispatch();
  const user = useSelector((state: TAuthState) => state.auth.user);
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  );

  const onSelectHandler = (file: any) => {
    setFile(() => file);
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: uploadPatientMedicalFile,
    onSuccess: (response) => {
      console.log("response", response);
      setFile(() => {
        return {
          content: null,
          name: "",
          type: "",
        };
      });
      dispatch(
        showCardNotification({
          type: "success",
          message: response.message,
        })
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

  const uploadFileHandler = () => {
    const userId = user?.userId as string;
    const token = accessToken as string;
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([file.content], { type: "image/*" }),
      file.name
    );

    formData.append("userId", userId);

    mutate({
      formData: formData,
      token: token,
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
        className="flex h-full w-full flex-col items-center 
        justify-center gap-4 py-8 rounded-md"
      >
        <div
          className="-mt-8 mb-4 w-full text-gray-800s text-center
          bg-gray-300 rounded-md p-4 text-primary"
        >
          <p>Upload Medical File</p>
        </div>
        {/* Preview image */}
        {file.content && (
          <div>
            <img
              src={imageURLHandler(file.content)}
              alt={"medical-file"}
              className="h-80 w-auto rounded-md"
            />
          </div>
        )}
        {/* File uploader */}
        <div
          className="flex w-full items-center justify-center gap-4
           md:gap-8 -mt-4s sm:py-8 sm:bg-gray-300 rounded-md mt-2"
        >
          <MedicalFilePicker onSave={onSelectHandler} isLoading={isLoading} />
          {file.content && !isLoading && (
            <button
              onClick={() => uploadFileHandler()}
              className="flex w-auto items-center justify-center
               gap-4 rounded bg-primary p-4 py-3 text-gray-50
               disabled:opacity-60 md:w-40"
              disabled={isLoading}
            >
              <span>
                <IconContext.Provider
                  value={{
                    size: "1.2rem",
                    color: "#fff",
                  }}
                >
                  <MdCloudUpload />
                </IconContext.Provider>
              </span>
              <span>Upload</span>
            </button>
          )}
          {file.content && isLoading && (
            <button
              className="flex w-auto items-center justify-center
               gap-4 rounded bg-primary p-4 py-3 text-gray-50
               disabled:opacity-60 md:w-40"
              disabled={isLoading}
            >
              <Loader className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};
