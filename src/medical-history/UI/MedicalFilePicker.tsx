import React, { useEffect, Fragment, useState } from "react";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
} from "use-file-picker/validators";
import { IconContext } from "react-icons";
import { MdCloudUpload } from "react-icons/md";
// import { IoClose } from "react-icons/io5";
// import { DragDrop } from "../../shared/UI/DragDrop";

interface MedicalFilePickerProps {
  onSave: (photo: any) => void;
  isLoading: boolean;
  isCancelled: boolean;
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
    accept: [".jpeg", ".jpg", ".png", ".webp", ".pdf", ".docx", ".doc"],
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
    if (!props.isCancelled) return;

    props.onSave("");
    setFile(() => {
      return {
        content: null,
        name: "",
        type: "",
      };
    });
  };

  useEffect(() => {
    saveHandler();
  }, [file]);

  useEffect(() => {
    onCancelSelectHandler();
  }, [props.isCancelled]);

  return (
    <Fragment>
      <div className="w-auto">
        {!file.content && (
          <div className="grid h-auto w-auto place-items-center gap-y-4">
            {/* <DragDrop onDrag={onDragHandler} /> */}
            <button
              onClick={() => openFilePicker()}
              className="flex w-auto items-center justify-center gap-4
               rounded p-4 py-3 text-gray-700 hover:text-primary
               hover:underline"
            >
              <span>
                <IconContext.Provider
                  value={{
                    size: "1.2rem",
                    color: "#495057",
                  }}
                >
                  <MdCloudUpload />
                </IconContext.Provider>
              </span>
              <span>Select File</span>
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};
