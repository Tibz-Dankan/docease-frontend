import React, { Fragment } from "react";
import { FileItem } from "./FileItem";
import records from "../data/records.json";

export const MedicalFileList: React.FC = () => {
  // TODO: make an api call here

  console.log("records->", records);
  return (
    <Fragment>
      <div className="w-full space-y-4">
        {records.map((record, index: number) => (
          <div key={index}>
            <FileItem filename={record.name} createdAt={record.createdAt} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};
