import React, { Fragment } from "react";

interface FileItemProps {
  filename: string;
  createdAt: string;
}

export const FileItem: React.FC<FileItemProps> = (props) => {
  return (
    <Fragment>
      <div
        className="flex items-center gap-4 justify-between 
         p-4 rounded shadow text-gray-800"
      >
        <span>{props.filename}</span>
        <span>{props.createdAt}</span>
      </div>
    </Fragment>
  );
};
