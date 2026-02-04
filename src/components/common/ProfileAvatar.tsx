import { useRef } from "react";
import { IonAvatar, IonIcon } from "@ionic/react";
import { cameraOutline } from "ionicons/icons";

interface ProfileAvatarProps {
  imageSource: string;
  onImageChange?: (imageData: string) => void;
  size?: "small" | "medium" | "large";
  showCamera?: boolean;
  className?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  imageSource,
  onImageChange,
  size = "medium",
  showCamera = false,
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        onImageChange(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const sizeClass = `avatar-${size}`;

  return (
    <div className={`profile-avatar-wrapper ${sizeClass} ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <IonAvatar className={`profile-avatar ${sizeClass}`}>
        <img src={imageSource} alt="Profile" />
      </IonAvatar>
      {showCamera && (
        <button
          className="avatar-camera-button"
          type="button"
          aria-label="Change photo"
          onClick={handleCameraClick}
        >
          <IonIcon icon={cameraOutline} />
        </button>
      )}
    </div>
  );
};

export default ProfileAvatar;
