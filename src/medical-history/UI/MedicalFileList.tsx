import React, { Fragment } from "react";
import { FileItem } from "./FileItem";
import { useDispatch, useSelector } from "react-redux";
import { getMedicalFilesByUser } from "../API";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { TMedicalFile } from "../../types/medication";
import { FileLoader } from "./FileLoader";

export const MedicalFileList: React.FC = () => {
  const userId = useSelector(
    (state: TAuthState) => state.auth?.user?.userId
  ) as string;

  const accessToken = useSelector(
    (state: TAuthState) => state.auth?.accessToken
  ) as string;

  const dispatch: any = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: [`patient-medical-files-${userId}`],
    queryFn: () =>
      getMedicalFilesByUser({ userId: userId, accessToken: accessToken }),
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  if (isLoading) {
    return <FileLoader />;
  }

  if (!data) return;

  const medication = data?.data?.medicalRecords as TMedicalFile[];

  return (
    <Fragment>
      <div className="w-full mt-8 sm:mt-0 space-y-4">
        <div
          className="w-full text-gray-800s text-center
          bg-gray-300s rounded-md p-4 text-primary
          border-2 border-gray-400"
        >
          <p>Uploaded Files</p>
        </div>
        <div
          className="sm:max-h-[55vh] overflow-x-hidden sm:pt-4 pb-8 px-4
          grid grid-cols-1 lg:grid-cols-2 gap-2 sm:bg-gray-100 
          rounded-md"
        >
          {medication.map((record, index: number) => (
            <div key={index}>
              <FileItem medicalFile={record} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
