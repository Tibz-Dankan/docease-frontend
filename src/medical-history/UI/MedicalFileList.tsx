import React, { Fragment } from "react";
import { FileItem } from "./FileItem";
import records from "../data/records.json";

export const MedicalFileList: React.FC = () => {
  // TODO: make an api call here

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
        {records.map((record, index: number) => (
          <div key={index}>
            <FileItem filename={record.name} createdAt={record.createdAt} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
