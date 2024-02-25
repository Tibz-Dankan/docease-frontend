import React, { useEffect, Fragment, useState } from "react";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
} from "use-file-picker/validators";
import { IconContext } from "react-icons";
import { MdCloudUpload } from "react-icons/md";
import { IoClose } from "react-icons/io5";
// import { DragDrop } from "../../shared/UI/DragDrop";

interface MedicalFilePickerProps {
  onSave: (photo: any) => void;
  isLoading: boolean;
}

type TFile = {
  content: any; //content is ArrayBuffer of a file
  name: string;
  type: string;
};

export const MedicalFilePicker: React.FC<MedicalFilePickerProps> = (props) => {
  const [file, setFile] = useState<TFile>({
    content: null,
    name: "",
    type: "",
  });

  const { openFilePicker, filesContent } = useFilePicker({
    readAs: "ArrayBuffer",
    accept: [".jpeg", ".jpg", ".png", ".webp", ".pdf", ".docx", "doc"],
    multiple: false,

    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(["jpeg", "jpg", "png", "pdf", "docx"]),
      new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
    ],
  });
  useEffect(() => {
    filesContent.map((file: any) => {
      return setFile({
        content: file.content,
        name: file.name,
        type: "",
      });
    });
  }, [filesContent]);

  const saveHandler = () => {
    props.onSave(file);
  };

  // const onDragHandler = (file: any) => {
  //   setFile(file);
  // };

  const onCancelSelectHandler = () => {
    props.onSave("");
    setFile({
      content: null,
      name: "",
      type: "",
    });
  };

  useEffect(() => {
    saveHandler();
  }, [file]);

  return (
    <Fragment>
      <div
        className="flex h-auto w-auto items-center
        justify-center gap-x-2 text-gray-800"
      >
        {!file.content && (
          <div className="grid h-auto w-auto place-items-center gap-y-4">
            {/* <DragDrop onDrag={onDragHandler} /> */}
            <button
              onClick={() => openFilePicker()}
              className="flex w-full items-center justify-center gap-4
               rounded bg-primary p-4 py-3 text-gray-50"
            >
              <span>
                <IconContext.Provider
                  value={{
                    size: "1.2rem",
                    color: "#fff",
                  }}
                >
                  <MdCloudUpload />
                </IconContext.Provider>
              </span>
              <span>Select File</span>
            </button>
          </div>
        )}
        {file.content && (
          <button
            onClick={() => onCancelSelectHandler()}
            className="flex w-full items-center justify-center gap-4
             rounded bg-primary p-4 py-3 text-gray-50 disabled:opacity-60
             md:w-40"
            disabled={props.isLoading && props.isLoading}
          >
            <span>
              <IconContext.Provider
                value={{
                  size: "1.2rem",
                  color: "#fff",
                }}
              >
                <IoClose />
              </IconContext.Provider>
            </span>
            <span>Cancel</span>
          </button>
        )}
      </div>
    </Fragment>
  );
};
