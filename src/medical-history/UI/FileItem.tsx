import React, { Fragment } from "react";
import { AppDate } from "../../utils/appDate";

interface FileItemProps {
  filename: string;
  createdAt: string;
}

export const FileItem: React.FC<FileItemProps> = (props) => {
  const createdAt = new AppDate(props.createdAt).dayMonthYear();

  return (
    <Fragment>
      <div
        className="flex items-center gap-4 justify-between 
         p-4 rounded shadow text-gray-800"
      >
        <span>{props.filename}</span>
        <span>{createdAt}</span>
      </div>
    </Fragment>
  );
};
