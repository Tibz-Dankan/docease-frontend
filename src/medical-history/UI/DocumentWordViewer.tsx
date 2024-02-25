// // DOCXViewer.tsx
// import React, { Fragment, useEffect, useState } from "react";
// import mammoth from "mammoth";

// interface DocumentWordViewerProps {
//   documentUrl: string;
//   documentName: string;
// }

// export const DocumentWordViewer: React.FC<DocumentWordViewerProps> = (
//   props
// ) => {
//   const [content, setContent] = useState<string>("");

//   useEffect(() => {
//     fetch(props.documentUrl)
//       .then((response) => response.arrayBuffer())
//       .then((buffer) => {
//         return mammoth.convertToHtml({ arrayBuffer: buffer });
//       })
//       .then((result) => {
//         setContent(result.value);
//       });
//   }, [props.documentUrl]);

//   return (
//     <Fragment>
//       <div>
//         <div dangerouslySetInnerHTML={{ __html: content }} />
//       </div>
//     </Fragment>
//   );
// };
