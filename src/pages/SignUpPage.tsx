import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonIcon,
  IonText,
  IonAlert,
  IonItem,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { person, mail, callOutline, home, lockClosed, eye, eyeOff } from 'ionicons/icons';
import { useState } from 'react';
import { useIonRouter } from '@ionic/react';
import '../styles/SignUpPage.css';

const SignUpPage: React.FC = () => {
  const ionRouter = useIonRouter(); // <-- Use Ionic router

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [suggestedUsername, setSuggestedUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Generate a suggested username
  const generateUsername = (name: string) => {
    if (!name.trim()) {
      setSuggestedUsername('');
      return;
    }
    const parts = name.toLowerCase().trim().split(/\s+/);
    const firstName = parts[0];
    const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : '';
    const random = Math.floor(10 + Math.random() * 90);
    setSuggestedUsername(`${firstName}${lastInitial}${random}`);
  };

  const handleSignUp = () => {
    if (!fullName || !email || !mobileNumber || !address || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (!email.endsWith('@gmail.com')) {
      setError('Email must end with @gmail.com');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('You must agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setError('');
    setShowAlert(true);
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
    ionRouter.push('/'); // <-- Navigate using Ionic router
  };

  const openTerms = () => window.open('/terms', '_blank');
  const openPrivacy = () => window.open('/privacy', '_blank');

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding signup-content">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol sizeXs="12" sizeSm="8" sizeMd="6">
              <div className="signup-logo">
                <img src="/logo1.png" alt="Logo" />
              </div>

              <h2 className="signup-title">Create Account</h2>
              <p className="signup-subtitle">Fill out the form to create your account</p>

              <form className="signup-form">
                {/* Full Name */}
                <IonItem lines="none" className="signup-item">
                  <IonIcon icon={person} slot="start" />
                  <IonInput
                    placeholder="Full Name"
                    value={fullName}
                    onIonChange={(e) => {
                      setFullName(e.detail.value!);
                      generateUsername(e.detail.value!);
                    }}
                  />
                </IonItem>

                {/* Username suggestion */}
                {suggestedUsername && (
                  <IonText color="medium" className="username-suggestion">
                    Username suggestion: <strong>@{suggestedUsername}</strong>
                  </IonText>
                )}

                {/* Mobile Number */}
                <IonItem lines="none" className="signup-item">
                  <IonIcon icon={callOutline} slot="start" />
                  <IonInput
                    placeholder="Mobile Number"
                    type="tel"
                    value={mobileNumber}
                    onIonChange={(e) => setMobileNumber(e.detail.value!)}
                  />
                </IonItem>

                {/* Email */}
                <IonItem lines="none" className="signup-item">
                  <IonIcon icon={mail} slot="start" />
                  <IonInput
                    placeholder="Email"
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                  />
                </IonItem>

                {/* Address */}
                <IonItem lines="none" className="signup-item">
                  <IonIcon icon={home} slot="start" />
                  <IonInput
                    placeholder="Address"
                    value={address}
                    onIonChange={(e) => setAddress(e.detail.value!)}
                  />
                </IonItem>

                {/* Password */}
                <IonItem lines="none" className="signup-item password-box">
                  <IonIcon icon={lockClosed} slot="start" />
                  <IonInput
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  />
                  <IonIcon
                    icon={showPassword ? eyeOff : eye}
                    slot="end"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: 'pointer' }}
                  />
                </IonItem>

                {/* Confirm Password */}
                <IonItem lines="none" className="signup-item password-box">
                  <IonIcon icon={lockClosed} slot="start" />
                  <IonInput
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                  />
                  <IonIcon
                    icon={showConfirmPassword ? eyeOff : eye}
                    slot="end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ cursor: 'pointer' }}
                  />
                </IonItem>

                {/* Terms */}
                <div className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="terms">
                    <span className="link-text" onClick={openTerms}>
                      I agree to the Terms of Service & Privacy Policy
                    </span>
                  </label>
                </div>

                {/* Error */}
                {error && <IonText color="danger" className="signup-error">{error}</IonText>}

                {/* Sign Up Button */}
                <IonButton expand="block" className="signup-button" onClick={handleSignUp}>
                  Sign Up
                </IonButton>
              </form>

              <div className="signin-text">
                Already have an account?
                <span className="signin-link" onClick={() => ionRouter.push('/')}>
                  {' '}SIGN IN
                </span>
              </div>

              <IonAlert
                isOpen={showAlert}
                onDidDismiss={handleAlertDismiss}
                header="Success!"
                message="Registered Successfully!"
                buttons={['OK']}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
