import { useRef, useState } from "react";

export function useImageUpload() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const openFilePicker = () => fileInputRef.current?.click();
  const handleDelete = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return { image, fileInputRef, handleImageChange, openFilePicker, handleDelete };
}
