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
  placeholder?: string;
  autocomplete?: string;
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
  placeholder,
  autocomplete,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const [inputVal, setInputVal] = useState<string>(value || "");

  if (value !== inputVal) setInputVal(value || "");

  const showIcon = !isFocused && !inputVal;

  const showPlaceholder = isFocused && !inputVal;

  const handleChange = (e: any) => {
    let newValue = (e?.detail?.value as string) || "";
    
    if (type === "tel" && inputMode === "numeric") {
      newValue = newValue.replace(/[^0-9]/g, "");
    }
    
    setInputVal(newValue);
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
      className={`floating-input-item ${(!showIcon) ? 'has-value' : ''} ${isPassword ? 'password-item' : ''} ${className}`}
      lines="none"
    >
      {icon && showIcon && (
        <IonIcon slot="start" icon={icon} className="floating-input-icon" />
      )}
      <span className="floating-label">{label}</span>
      <IonInput
        type={isPassword && !showPassword ? "password" : "text"}
        inputMode={inputMode}
        value={inputVal}
        onIonFocus={() => setIsFocused(true)}
        onIonBlur={() => setIsFocused(false)}
        onIonInput={handleChange}
        onKeyPress={handleKeyPress}
        maxlength={maxlength}
        readonly={readonly}
        placeholder={showPlaceholder ? placeholder : ""}
        autocomplete={autocomplete as any}
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
