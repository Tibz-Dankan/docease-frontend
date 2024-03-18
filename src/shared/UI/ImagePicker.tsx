import React, { useEffect, Fragment, useState } from "react";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
} from "use-file-picker/validators";
import { IconContext } from "react-icons";
import { IoIosCamera } from "react-icons/io";
import { useSelector } from "react-redux";
import { TAuthState } from "../../types/auth";

interface ImagePickerProps {
  title: string;
  onSave: (photo: any) => void;
}

export const ImagePicker: React.FC<ImagePickerProps> = (props) => {
  const [photo, setPhoto] = useState<any>(null);
  const user = useSelector((state: TAuthState) => state.auth.user);

  const { openFilePicker, filesContent } = useFilePicker({
    readAs: "ArrayBuffer",
    accept: "image/*",
    multiple: false,

    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(["jpeg", "jpg", "png"]),
      new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
    ],
  });
  useEffect(() => {
    filesContent.map((file: any) => {
      return setPhoto(file.content);
    });
  }, [filesContent]);

  const saveHandler = () => {
    props.onSave(photo);
  };
  useEffect(() => {
    saveHandler();
  }, [photo]);

  return (
    <Fragment>
      <div className="flex items-center justify-center gap-x-2">
        {!photo && (
          <button
            onClick={() => openFilePicker()}
            className={`bg-primary p-1 rounded-[50%] text-gray-50
             absolute -top-20 ${
               user?.imageUrl ? "-right-24 sm:-right-28" : "-right-16"
             }`}
          >
            <IconContext.Provider
              value={{
                size: "1.2rem",
                color: "#fff",
              }}
            >
              <IoIosCamera />
            </IconContext.Provider>
          </button>
        )}
        {photo && (
          <button
            onClick={() => setPhoto(null)}
            className="bg-primary px-4 py-1 rounded text-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </Fragment>
  );
};
