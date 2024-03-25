import React, { Fragment } from "react";
import { AppDate } from "../../utils/appDate";
import { TMedicalFile } from "../../types/medication";
import { DocumentViewerLayout } from "../layout/DocumentViewerLayout";
import { DeleteMedicalFile } from "./DeleteMedicalFile";
import { DownloadMedicalFile } from "./DownloadMedicalFile";
import { useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";

interface FileItemProps {
  medicalFile: TMedicalFile;
}

export const FileItem: React.FC<FileItemProps> = (props) => {
  const createdAtDate = new AppDate(props.medicalFile.createdAt).dayMonthYear();
  const createdAtTime = new AppDate(props.medicalFile.createdAt).time();

  const user = useSelector((state: TAuthState) => state.auth.user!);

  const isPatient = user.role === "patient";

  return (
    <Fragment>
      <div className="w-auto  items-center p-2">
        <div
          className="flex flex-col items-center justify-center gap-2
          p-4 rounded-md border-2 border-gray-400 shadow bg-white"
        >
          <p className="space-x-2 text-sm text-gray-700">
            <span>{createdAtDate},</span>
            <span>{createdAtTime}</span>
          </p>
          <DocumentViewerLayout
            documentName={props.medicalFile.name}
            documentUrl={props.medicalFile.url}
          />
          <div className="flex items-center justify-center gap-2">
            <DownloadMedicalFile fileUrl={props.medicalFile.url} />
            {isPatient && (
              <DeleteMedicalFile
                medicalFileId={props.medicalFile.medicalFileId}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
