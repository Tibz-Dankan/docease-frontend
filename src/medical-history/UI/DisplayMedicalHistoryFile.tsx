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
import { Loader } from "../../shared/UI/Loader";
import { TMedicalFile } from "../../types/medication";
// import { DocumentViewerLayout } from "../layout/DocumentViewerLayout";
interface DisplayMedicalHistoryFileProps {
  patientId: string;
}

export const DisplayMedicalHistoryFile: React.FC<
  DisplayMedicalHistoryFileProps
> = (props) => {
  const accessToken = useSelector(
    (state: TAuthState) => state.auth?.accessToken
  ) as string;

  const dispatch: any = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: [`d-patient-medical-files-${props.patientId}`],
    queryFn: () =>
      getMedicalFilesByUser({
        userId: props.patientId,
        accessToken: accessToken,
      }),
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

  const medication = data?.data?.medicalRecords as TMedicalFile[];

  return (
    <Fragment>
      <div className="w-full">
        <div
          className=" w-full text-gray-800s text-center
          bg-gray-300 rounded-md p-4 text-primary"
        >
          <p>Medical Files</p>
        </div>
        <div className=" overflow-x-hidden pb-8 px-4 mt-8">
          {medication.map((record, index: number) => (
            <div key={index}>
              {/* <DocumentViewerLayout
                openModalElement={
                  <div className="cursor-pointer">
                    <FileItem medicalFile={record} />
                  </div>
                }
                documentName={record.name}
                documentUrl={record.url}
              /> */}
              <FileItem medicalFile={record} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
