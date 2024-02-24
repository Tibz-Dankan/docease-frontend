import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { TbDownload } from "react-icons/tb";

interface DownloadMedicalFileProps {
  fileUrl: string;
}

export const DownloadMedicalFile: React.FC<DownloadMedicalFileProps> = (
  props
) => {
  return (
    <Fragment>
      <div>
        <a href={props.fileUrl} className="grid place-items-center">
          <span className="cursor-pointer">
            <IconContext.Provider
              value={{
                size: "1.3rem",
                color: "#495057",
              }}
            >
              <TbDownload />
            </IconContext.Provider>
          </span>
        </a>
      </div>
    </Fragment>
  );
};
