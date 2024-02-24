import React, { Fragment } from "react";
import { Button } from "../../shared/UI/Button";

import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "../../shared/UI/Loader";
import { deleteMedicalFile } from "../API";
import { TAuthState } from "../../types/auth";
import { Modal } from "../../shared/UI/Modal";
import { IconContext } from "react-icons";
import { RiDeleteBin6Line } from "react-icons/ri";

interface DeleteMedicalFileProps {
  medicalFileId: string;
}

export const DeleteMedicalFile: React.FC<DeleteMedicalFileProps> = (props) => {
  const auth = useSelector((state: TAuthState) => state.auth);
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: deleteMedicalFile,
    onSuccess: (response: any) => {
      console.log("response--->", response);
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

  const deleteMedicalFileHandler = () => {
    const medicalFileId = props.medicalFileId;
    const accessToken = auth.accessToken!;

    if (!medicalFileId) {
      dispatch(
        showCardNotification({
          type: "error",
          message: "Please provide medicalFileId!",
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    }

    mutate({
      medicalFileId: medicalFileId,
      accessToken: accessToken,
    });
  };

  return (
    <Fragment>
      <Modal
        openModalElement={
          <span className="cursor-pointer">
            <IconContext.Provider
              value={{
                size: "1.2rem",
                color: "#495057",
              }}
            >
              <RiDeleteBin6Line />
            </IconContext.Provider>
          </span>
        }
        className=""
      >
        <div
          className="p-8  w-[90%] sm:w-[400px] h-[90vh]
         md:h-auto flex-col gap-4 text-gray-800 
         space-y-4"
        >
          <div className="flex flex-col gap-4">
            <p
              className="space-x-2 border-b-[1px] border-gray-300
              pb-4 text-lg"
            >
              <span>Are you sure that you want to delete this file?</span>
            </p>
            <div className="flex items-center justify-between gap-4 mt-2">
              {!isLoading && (
                <Button
                  label="Delete"
                  type="button"
                  onClick={() => deleteMedicalFileHandler()}
                  className="bg-red-500 text-gray-50"
                />
              )}
              {isLoading && (
                <div
                  className="flex items-center justify-center
                  bg-red-500 text-gray-800 py-1 w-full rounded"
                >
                  <Loader className="w-8 h-8" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
