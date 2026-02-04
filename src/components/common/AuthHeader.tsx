interface AuthHeaderProps {
  logoSrc?: string;
  title: string;
  subtitle: string;
  className?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  logoSrc = "./flogo1.png",
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`auth-header ${className}`}>
      <img src={logoSrc} alt="Logo" className="auth-logo" />
      <div className="auth-texts">
        <h2 className="auth-title">{title}</h2>
        <p className="auth-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthHeader;
