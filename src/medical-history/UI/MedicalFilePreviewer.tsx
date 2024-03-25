import React, { Fragment } from "react";
import { getFileExtension } from "../../utils/getFileExtension";
import { IconContext } from "react-icons";
import { GrDocumentPdf } from "react-icons/gr";
import { FaRegFileWord } from "react-icons/fa";
import { truncateString } from "../../utils/truncateString";
import { Image } from "../../shared/UI/Image";

type TFile = {
  content: any; //content is ArrayBuffer of a file
  name: string;
  type: string;
};

interface MedicalFilePreviewerProps {
  file: TFile;
}

export const MedicalFilePreviewer: React.FC<MedicalFilePreviewerProps> = (
  props
) => {
  const fileExtension = getFileExtension(props.file.name);

  const isWordDocument = fileExtension === "docx";
  const isPDFDocument = fileExtension === "pdf";
  const isImageDocument =
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "webp";

  const imageURLHandler = (imageArrayBuffer: any) => {
    if (!imageArrayBuffer) return;
    const blob = new Blob([imageArrayBuffer], { type: "image/*" });
    return URL.createObjectURL(blob);
  };

  return (
    <Fragment>
      <div className="w-auto flex flex-col items-center justify-center gap-4">
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
            src={imageURLHandler(props.file.content)!}
            alt={"medical-file"}
            className="h-28 w-auto rounded-md"
          />
        )}
        <span className="text-gray-800">
          {truncateString(props.file.name, 18)}
        </span>
      </div>
    </Fragment>
  );
};
