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
  const createdAt = new AppDate(props.medicalFile.createdAt).dayMonthYear();
  const filename = props.medicalFile.name;
  const user = useSelector((state: TAuthState) => state.auth.user!);

  const isPatient = user.role === "patient";

  return (
    <Fragment>
      <div
        className="flex items-center gap-4 justify-between 
         p-4 rounded shadow text-gray-800"
      >
        <span>{filename}</span>
        <div className="flex items-center justify-center gap-2">
          <DocumentViewerLayout
            documentName={props.medicalFile.name}
            documentUrl={props.medicalFile.url}
          />
          <DownloadMedicalFile fileUrl={props.medicalFile.url} />
          {isPatient && (
            <DeleteMedicalFile
              medicalFileId={props.medicalFile.medicalFileId}
            />
          )}
          <span className="ml-2">{createdAt}</span>
        </div>
      </div>
    </Fragment>
  );
};
