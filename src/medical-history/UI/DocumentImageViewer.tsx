import React, { Fragment } from "react";
// import { Image } from "../../shared/UI/Image";

interface DocumentImageViewerProps {
  documentUrl: string;
  documentName: string;
}

export const DocumentImageViewer: React.FC<DocumentImageViewerProps> = (
  props
) => {
  return (
    <Fragment>
      <div className="w-full h-full bg-green-500s p-4 pt-12 rounded-md bg-whites space-y-2">
        <p className="text-xl text-gray-800">{props.documentName}</p>
        <img
          src={props.documentUrl}
          alt={props.documentName}
          className="w-full h-full"
        />
        {/* <Image src={props.documentUrl} className="w-full h-full" /> */}
      </div>
    </Fragment>
  );
};
