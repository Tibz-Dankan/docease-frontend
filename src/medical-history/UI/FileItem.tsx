import React, { Fragment } from "react";
import { AppDate } from "../../utils/appDate";
import { TMedicalFile } from "../../types/medication";
import { DocumentViewerLayout } from "../layout/DocumentViewerLayout";
import { DeleteMedicalFile } from "./DeleteMedicalFile";
import { DownloadMedicalFile } from "./DownloadMedicalFile";

interface FileItemProps {
  medicalFile: TMedicalFile;
}

export const FileItem: React.FC<FileItemProps> = (props) => {
  const createdAt = new AppDate(props.medicalFile.createdAt).dayMonthYear();
  const filename = props.medicalFile.name;

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
          <DeleteMedicalFile medicalFileId={props.medicalFile.medicalFileId} />
          <span className="ml-2">{createdAt}</span>
        </div>
      </div>
    </Fragment>
  );
};
