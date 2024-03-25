import React, { Fragment } from "react";
import { getFileExtension } from "../../utils/getFileExtension";
// import { DocumentWordViewer } from "../UI/DocumentWordViewer";
// import { DocumentPDFViewer } from "../UI/DocumentPDFViewer";
import { DocumentImageViewer } from "../UI/DocumentImageViewer";
import { Modal } from "../../shared/UI/Modal";
import { IconContext } from "react-icons";
// import { IoEyeOutline } from "react-icons/io5";
import { FaRegFileWord } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import { Image } from "../../shared/UI/Image";
import { truncateString } from "../../utils/truncateString";

interface DocumentViewerLayoutProps {
  documentName: string;
  documentUrl: string;
}

export const DocumentViewerLayout: React.FC<DocumentViewerLayoutProps> = (
  props
) => {
  const fileExtension = getFileExtension(props.documentName);

  const isWordDocument = fileExtension === "docx";
  const isPDFDocument = fileExtension === "pdf";
  const isImageDocument =
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "webp";

  return (
    <Fragment>
      <Modal
        openModalElement={
          <div
            className="min-w-32 flex flex-col justify-center gap-2
             cursor-pointer"
          >
            {isWordDocument && (
              <span
                className="grid place-items-center border-[1px]
                border-gray-400 p-4 rounded"
              >
                <IconContext.Provider
                  value={{
                    size: "4.8rem",
                    color: "#868e96",
                  }}
                >
                  <FaRegFileWord />
                </IconContext.Provider>
              </span>
            )}
            {isPDFDocument && (
              <span
                className="grid place-items-center border-[1px]
             border-gray-400 p-4 rounded"
              >
                <IconContext.Provider
                  value={{
                    size: "4.8rem",
                    color: "#868e96",
                  }}
                >
                  <GrDocumentPdf />
                </IconContext.Provider>
              </span>
            )}
            {isImageDocument && (
              <Image
                src={props.documentUrl}
                alt={truncateString(props.documentName)}
                className="h-28 w-auto rounded-md 
                 border-[1px] border-gray-400"
              />
            )}
            <span className="">{truncateString(props.documentName, 14)}</span>
          </div>
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
