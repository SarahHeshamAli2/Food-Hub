import { useRef, useState } from "react";

export function useImageUpload() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result); // base64
      reader.readAsDataURL(file);
    }
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const handleDelete = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // ✅ New: Set image from existing value (CDN or base64)
const setImageFromExistingValue = async (value) => {
  if (!value) return;

  if (value.startsWith("data:image/")) {
    setImage(value); // already base64
  } else if (value.startsWith("http")) {
    try {
      const response = await fetch(value);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result); // base64 string
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Failed to fetch and convert image:", error);
    }
  }
};


  return {
    image,
    fileInputRef,
    handleImageChange,
    openFilePicker,
    handleDelete,
    setImageFromExistingValue, // ✅ Exported
  };
}
