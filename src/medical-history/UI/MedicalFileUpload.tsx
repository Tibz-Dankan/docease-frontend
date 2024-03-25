import React, { Fragment, useState } from "react";
import { MedicalFilePicker } from "./MedicalFilePicker";
import { Loader } from "../../shared/UI/Loader";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { uploadPatientMedicalFile } from "../API";
import { TAuthState } from "../../types/auth";
// import { Image } from "../../shared/UI/Image";
import { FaFolder, FaFileAlt } from "react-icons/fa";
import { MedicalFilePreviewer } from "./MedicalFilePreviewer";

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
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const dispatch: any = useDispatch();
  const user = useSelector((state: TAuthState) => state.auth.user);
  const accessToken = useSelector(
    (state: TAuthState) => state.auth.accessToken
  );

  const onSelectHandler = (file: any) => {
    setFile(() => file);
  };

  const onCancelHandler = () => {
    setIsCancelled(() => true);
    setFile(() => {
      return {
        content: null,
        name: "",
        type: "",
      };
    });
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: uploadPatientMedicalFile,
    onSuccess: (response) => {
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

  // const imageURLHandler = (imageArrayBuffer: any) => {
  //   if (!imageArrayBuffer) return;
  //   const blob = new Blob([imageArrayBuffer], { type: "image/*" });
  //   return URL.createObjectURL(blob);
  // };

  return (
    <Fragment>
      <div
        className="flex h-full w-full flex-col items-center 
        justify-center gap-4"
      >
        <div
          className="w-full rounded-md border-[2px]
          border-gray-400 h-64 grid place-items-center"
        >
          <div
            className="flex items-center  gap-3 p-4 border-b-[2px]
            border-gray-400 w-full pt-0"
          >
            <span className="">
              <IconContext.Provider
                value={{
                  size: "1.4rem",
                  color: "#495057",
                }}
              >
                <FaFolder />
              </IconContext.Provider>
            </span>
            <span className="text-primary">Files</span>
          </div>
          {!file.content && (
            <div
              className="flex flex-col items-center justify-center
              gap-2"
            >
              <span
                className="grid place-items-center border-[1px]
                 border-gray-400 p-4 rounded"
              >
                <IconContext.Provider
                  value={{
                    size: "4.8rem",
                    color: "#868e96",
                  }}
                >
                  <FaFileAlt />
                </IconContext.Provider>
              </span>
              <MedicalFilePicker
                onSave={onSelectHandler}
                isCancelled={isCancelled}
                isLoading={isLoading}
              />
            </div>
          )}

          {/* File preview */}
          {file.content && <MedicalFilePreviewer file={file} />}
        </div>
        {/* Acceptable file formats*/}
        <div className="w-full text-gray-700">
          <p className="text-start">
            <span className="mr-2">Accepted file types:</span>
            <span>.pdf .docx .jpeg .jpg .png .webp</span>
          </p>
        </div>

        {/* File uploader */}
        <div
          className="flex w-full items-center justify-start gap-4
           md:gap-8"
        >
          {!isLoading && (
            <button
              onClick={() => uploadFileHandler()}
              className="flex w-auto items-center justify-center
            gap-4 rounded-md bg-primary p-4 py-3 text-gray-50
            disabled:opacity-60 disabled:cursor-not-allowed md:w-40"
              disabled={isLoading || !file.content}
            >
              <span>Save changes</span>
            </button>
          )}
          {/* {file.content && isLoading && ( */}
          {isLoading && (
            <button
              className="flex w-auto items-center justify-center
               gap-4 rounded bg-primary p-4 py-3 text-gray-50
               md:w-40"
              disabled={isLoading}
            >
              <Loader className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={() => onCancelHandler()}
            className="flex w-auto items-center justify-center
             gap-4 rounded-md bg-gray-400 p-4 py-3 text-gray-800
             disabled:opacity-60 disabled:cursor-not-allowed md:w-40"
            disabled={isLoading || !file.content}
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};
