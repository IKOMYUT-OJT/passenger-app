import { useState } from "react";
import { IonItem, IonInput, IonIcon } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";

interface FloatingLabelInputProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "password";
  icon?: string;
  maxlength?: number;
  readonly?: boolean;
  inputMode?: "text" | "numeric" | "email" | "tel";
  className?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onValueChange,
  type = "text",
  icon,
  maxlength,
  readonly = false,
  inputMode = "text",
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const hasValue = isFocused || value;

  const handleChange = (e: CustomEvent) => {
    let newValue = e.detail.value || "";
    
    // Handle numeric input for tel type
    if (type === "tel" && inputMode === "numeric") {
      newValue = newValue.replace(/[^0-9]/g, "");
    }
    
    onValueChange(newValue);
  };

  const handleKeyPress = (e: any) => {
    if (type === "tel" && inputMode === "numeric") {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  return (
    <IonItem 
      className={`floating-input-item ${hasValue ? 'has-value' : ''} ${isPassword ? 'password-item' : ''} ${className}`}
      lines="none"
    >
      {icon && (
        <IonIcon slot="start" icon={icon} className="floating-input-icon" />
      )}
      <span className="floating-label">{label}</span>
      <IonInput
        type={isPassword && !showPassword ? "password" : "text"}
        inputMode={inputMode}
        value={value}
        onIonFocus={() => setIsFocused(true)}
        onIonBlur={() => setIsFocused(false)}
        onIonChange={handleChange}
        onKeyPress={handleKeyPress}
        maxlength={maxlength}
        readonly={readonly}
      />
      {isPassword && (
        <IonIcon
          slot="end"
          icon={showPassword ? eyeOff : eye}
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle-icon"
        />
      )}
    </IonItem>
  );
};

export default FloatingLabelInput;
