import React, { Fragment } from "react";
import { FileItem } from "./FileItem";
import records from "../data/records.json";
import { useDispatch, useSelector } from "react-redux";
import { getMedicalFilesByUser } from "../API";
import { TAuthState } from "../../types/auth";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "../../store/actions/notification";
import { Loader } from "../../shared/UI/Loader";
import { TMedicalFile } from "../../types/medication";

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
    return (
      <div className="flex items-center justify-center w-full">
        <Loader className="w-10 h-10 sm:w-16 sm:h-16 stroke-gray-600" />
      </div>
    );
  }

  if (!data) return;

  console.log("data from api<medical records>");

  const medication = data?.data?.medicalRecords as TMedicalFile[];

  console.log("records->", records);
  return (
    <Fragment>
      <div className="w-full space-y-4">
        <div
          className=" w-full text-gray-800s text-center
          bg-gray-300 rounded-md p-4 text-primary"
        >
          <p>Uploaded Files</p>
        </div>
        {medication.map((record, index: number) => (
          <div key={index}>
            <FileItem filename={record.name} createdAt={record.createdAt} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
