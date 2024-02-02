import React, { useState, useEffect, Fragment } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
} from "../../store/actions/notification";
import { inputFileToArrayBuffer } from "../../utils/inputFileToArrayBuffer";

const DropZoneArea = ({ hasFile }: { hasFile: boolean }) => {
  return (
    <Fragment>
      <div
        className={`flex h-52 sm:h-72 w-[80vw]s
        items-center justify-center rounded-md border-[2px] 
        border-dashed border-gray-600 text-gray-700 w-fulls md:min-w-72
        ${!hasFile && "animate-pulse"}
        `}
      >
        <span className="text-center text-xl font-bold">Drag & Drop Here</span>
      </div>
    </Fragment>
  );
};

const fileTypes = ["JPG", "PNG", "JPEG", "PDF"];

interface DragDropProps {
  onDrag: (file: any) => void;
}

export const DragDrop: React.FC<DragDropProps> = (props) => {
  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);
  };

  const dispatch: any = useDispatch();

  const validateFileSize = (file: any) => {
    if (!file) return;
    const validFileSize = 5242880; // 5mb
    const errorMessage = "Dragged file exceeds limit 5mb";
    if (file.size > validFileSize) {
      dispatch(showCardNotification({ type: "error", message: errorMessage }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      throw new Error(errorMessage);
    }
  };

  const dragHandler = async () => {
    validateFileSize(file);
    const fileArrayBuffer = await inputFileToArrayBuffer(file);
    props.onDrag(fileArrayBuffer);
  };

  useEffect(() => {
    dragHandler();
  }, [file]);

  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={fileTypes}
      children={<DropZoneArea hasFile={!!file} />}
    />
  );
};
