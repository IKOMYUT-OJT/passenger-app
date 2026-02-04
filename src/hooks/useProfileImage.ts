import { useState, useEffect } from "react";

export const useProfileImage = (defaultImage: string = "man.png") => {
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || defaultImage;
  });

  useEffect(() => {
    const handleProfileImageUpdate = () => {
      const updatedImage = localStorage.getItem("profileImage") || defaultImage;
      setProfileImage(updatedImage);
    };

    window.addEventListener("profileImageUpdated", handleProfileImageUpdate);
    return () => {
      window.removeEventListener("profileImageUpdated", handleProfileImageUpdate);
    };
  }, [defaultImage]);

  const updateProfileImage = (imageData: string) => {
    setProfileImage(imageData);
    localStorage.setItem("profileImage", imageData);
    window.dispatchEvent(new Event("profileImageUpdated"));
  };

  return { profileImage, updateProfileImage };
};
