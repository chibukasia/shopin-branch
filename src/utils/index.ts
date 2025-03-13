/* eslint-disable @typescript-eslint/no-explicit-any */
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const uploadFile = async (selectedFile: File, branchName: string) => {
  const fileRef = ref(storage, `images/shopinn/${branchName}/${new Date().getTime()+selectedFile.name}`);
  try {
    await uploadBytes(fileRef, selectedFile, {
      contentType: selectedFile.type ?? "image/jpeg",
    });
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error: any) {
    console.log(error);
    getStorageErrorMessage(error.code);
  }
};

export default uploadFile;

function getStorageErrorMessage(errorCode: string) {
  switch (errorCode) {
    case "storage/unknown":
      return { error: "Unknown error occurred." };
      break;
    case "storage/object-not-found":
      return { error: "Object not found." };
      break;
    case "storage/unauthenticated":
      return { error: "User unauthenticated. Please log in." };
      break;
    case "storage/unauthorized":
      return { error: "User unauthorized. Check security rules." };
      break;
    case "storage/retry-limit-exceeded":
      return { error: "Retry limit exceeded. Try again." };
      break;
    case "storage/invalid-checksum":
      return { error: "Checksum mismatch. Try again." };
      break;
    case "storage/invalid-url":
      return { error: "Invalid URL format." };
      break;
    case "storage/cannot-slice-blob":
      return { error: "File changed. Verify and try again." };
      break;
    case "storage/server-file-wrong-size":
      return { error: "Server file size mismatch." };
      break;
    default:
      return { error: "Unknown error occurred." };
  }
}