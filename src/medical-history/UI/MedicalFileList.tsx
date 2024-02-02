import React, { Fragment } from "react";
import { FileItem } from "./FileItem";

export const MedicalFileList: React.FC = () => {
  const files = [1, 2, 3, 4, 5, 6];
  return (
    <Fragment>
      <div className="w-full space-y-4">
        {files.map((_, index: any) => (
          <div key={index}>
            <FileItem filename="Document1.docx" createdAt="2 Jan 2024" />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
