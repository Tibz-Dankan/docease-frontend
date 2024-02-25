import React, { Fragment } from "react";
import { getFileExtension } from "../../utils/getFileExtension";
// import { DocumentWordViewer } from "../UI/DocumentWordViewer";
// import { DocumentPDFViewer } from "../UI/DocumentPDFViewer";
import { DocumentImageViewer } from "../UI/DocumentImageViewer";
import { Modal } from "../../shared/UI/Modal";
import { IconContext } from "react-icons";
import { IoEyeOutline } from "react-icons/io5";

interface DocumentViewerLayoutProps {
  documentName: string;
  documentUrl: string;
}

export const DocumentViewerLayout: React.FC<DocumentViewerLayoutProps> = (
  props
) => {
  const fileExtension = getFileExtension(props.documentName);

  //   const isWordDocument = fileExtension === "docx";
  //   const isPDFDocument = fileExtension === "pdf";
  const isImageDocument =
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "webp";

  console.log("fileExtension: ", fileExtension);

  return (
    <Fragment>
      <Modal
        openModalElement={
          <span className="cursor-pointer">
            <IconContext.Provider
              value={{
                size: "1.4rem",
                color: "#495057",
              }}
            >
              <IoEyeOutline />
            </IconContext.Provider>
          </span>
        }
        className=""
      >
        <div
          className="w-full sm:max-w-[600px] sm:max-h-[70vh]
          lg:max-w-[800px]
           bg-gray-50 overflow-x-hidden rounded-md"
        >
          {/* {isWordDocument && (
            <DocumentWordViewer
              documentName={props.documentName}
              documentUrl={props.documentUrl}
            />
          )} */}
          {/* {isPDFDocument && (
            <DocumentPDFViewer
              documentName={props.documentName}
              documentUrl={props.documentUrl}
            />
          )} */}
          {isImageDocument && (
            <DocumentImageViewer
              documentName={props.documentName}
              documentUrl={props.documentUrl}
            />
          )}
        </div>
      </Modal>
    </Fragment>
  );
};
