export const inputFileToArrayBuffer = async (file:any) => {
  if (!file) return;

  try {
    const blob = new Blob([file]);
    const fileArrayBuffer = await blob.arrayBuffer();
    return fileArrayBuffer;
  } catch (error) {
    console.error("Error converting file to ArrayBuffer:", error);
  }
};
