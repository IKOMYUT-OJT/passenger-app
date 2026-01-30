import { useState, useEffect, createContext } from "react";
import {
  IonApp,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonRouterOutlet,
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, useLocation } from "react-router-dom";
import {
  scanOutline,
  homeSharp,
  personSharp,
  closeOutline,
  chevronDownOutline,
  busOutline,
} from "ionicons/icons";
import { BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { Capacitor } from "@capacitor/core";

import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";
import EditProfile from "./pages/EditProfile";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WalletPage from "./pages/WalletPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import DiscountPage from "./pages/DiscountPage";
import WelcomePage from "./pages/WelcomePage";
import MobileSignupPage from "./pages/MobileSignupPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import NotificationPage from "./pages/NotificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CreatePasswordPage from "./pages/CreatePasswordPage";
import VerifyResetOtpPage from "./pages/VerifyResetOtpPage";




import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import "./theme/tabs.css";
import "./theme/sheet.css";
import "./theme/qr-scanner.css";

setupIonicReact();

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (_: boolean) => {},
});

const openNearbyEvent = () => window.dispatchEvent(new Event("open-nearby"));
const TabsLayout: React.FC<{
  isLoggedIn: boolean;
  setOpenQRSheet: (v: boolean) => void;
}> = ({ isLoggedIn, setOpenQRSheet }) => {
  const location = useLocation();
  const hideBottomBar = false;
  if (!isLoggedIn) return <Redirect to="/" />;

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/homepage" component={Homepage} />
        <Route exact path="/tabs/profilepage" component={Profilepage} />
        <Redirect exact from="/tabs" to="/tabs/homepage" />
      </IonRouterOutlet>

      {!hideBottomBar && (
        <div className="tabbar-wrapper">
          <IonTabBar slot="bottom" className="main-tabbar">
            <IonTabButton tab="home" href="/tabs/homepage">
              <IonIcon icon={homeSharp} />
            </IonTabButton>

            <IonTabButton className="tab-spacer" />

            <IonTabButton tab="profile" href="/tabs/profilepage">
              <IonIcon icon={personSharp} />
            </IonTabButton>
          </IonTabBar>

          <button className="qr-button" onClick={() => setOpenQRSheet(true)}>
            <IonIcon icon={scanOutline} />
          </button>
        </div>
      )}
    </IonTabs>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openNearbySheet, setOpenNearbySheet] = useState(false);
  const [openQRSheet, setOpenQRSheet] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => {
    // Show welcome page only on fresh browser load
    return !sessionStorage.getItem("appInitialized");
  });

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    // Mark app as initialized after first render
    sessionStorage.setItem("appInitialized", "true");
  }, []);
  useEffect(() => {
    const handler = () => setOpenNearbySheet(true);
    window.addEventListener("open-nearby", handler);
    return () => window.removeEventListener("open-nearby", handler);
  }, []);

  const startQrScan = async () => {
    if (!Capacitor.isNativePlatform()) {
      alert("QR scanning works only on a real device");
      return;
    }

    const permission = await BarcodeScanner.requestPermissions();
    if (permission.camera !== "granted") {
      alert("Camera permission denied");
      return;
    }

    document.body.classList.add("scanner-active");

    const result = await BarcodeScanner.scan({
      formats: ["QR_CODE"],
    });

    if (result.barcodes.length > 0) {
      const value = result.barcodes[0].rawValue;

      stopQrScan();
      setOpenQRSheet(false);

      alert(`Scanned QR:\n${value}`);
    }
  };

  const stopQrScan = async () => {
    await BarcodeScanner.stopScan();
    document.body.classList.remove("scanner-active");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route
              exact
              path="/"
              render={() => {
                if (isLoggedIn) return <Redirect to="/tabs/homepage" />;
                if (showWelcome) return <WelcomePage />;
                return <Redirect to="/login" />;
              }}
            />

            <Route exact path="/welcome" component={WelcomePage} />

            <Route
              exact
              path="/login"
              component={LoginPage}
            />

            <Route
              exact
              path="/signup"
              render={() =>
                isLoggedIn ? (
                  <Redirect to="/tabs/homepage" />
                ) : (
                  <MobileSignupPage />
                )
              }
            />
            <Route
              exact
              path="/signup/verify"
              render={() =>
                isLoggedIn ? <Redirect to="/tabs/homepage" /> : <VerifyOtpPage />
              }
            />
            <Route
              exact
              path="/signup/details"
              render={() =>
                isLoggedIn ? <Redirect to="/tabs/homepage" /> : <SignUpPage />
              }
            />

            <Route
              exact
              path="/edit-profile"
              render={() => (isLoggedIn ? <EditProfile /> : <Redirect to="/" />)}
            />
            <Route
              exact
              path="/settings"
              render={() => (isLoggedIn ? <SettingsPage /> : <Redirect to="/" />)}
            />
            <Route
              exact
              path="/wallet"
              render={() => (isLoggedIn ? <WalletPage /> : <Redirect to="/" />)}
            />
            <Route
              exact
              path="/discount"
              render={() => (isLoggedIn ? <DiscountPage /> : <Redirect to="/" />)}
            />
            <Route
              exact
              path="/change-password"
              render={() =>
                isLoggedIn ? <ChangePasswordPage /> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/notifications"
              render={() =>
                isLoggedIn ? <NotificationPage /> : <Redirect to="/" />
              }
            />
            <Route exact path="/forgot-password" component={ForgotPasswordPage} />
            <Route exact path="/verify-reset-otp" component={VerifyResetOtpPage} />
            <Route exact path="/create-password" component={CreatePasswordPage} />

            <Route
              path="/tabs"
              render={() => (
                <TabsLayout
                  isLoggedIn={isLoggedIn}
                  setOpenQRSheet={setOpenQRSheet}
                />
              )}
            />
          </IonRouterOutlet>

          <IonModal
            isOpen={openQRSheet}
            onDidDismiss={() => {
              stopQrScan();
              setOpenQRSheet(false);
            }}
            className="qr-scanner-modal"
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>Scan QR Code</IonTitle>
                <IonButton
                  fill="clear"
                  slot="end"
                  onClick={() => {
                    stopQrScan();
                    setOpenQRSheet(false);
                  }}
                >
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="qr-scanner-content">
              <div className="scanner-stage">
                <div className="scanner-hint">Point camera at QR code</div>

                <div className="scanner-frame">
                  <div className="scan-line" />
                  <span className="corner tl" />
                  <span className="corner tr" />
                  <span className="corner bl" />
                  <span className="corner br" />
                </div>

                <IonButton
                  expand="block"
                  className="scanner-action"
                  onClick={startQrScan}
                >
                  Start Scanning
                </IonButton>
              </div>
            </IonContent>
          </IonModal>

          <IonModal
            isOpen={openNearbySheet}
            onDidDismiss={() => setOpenNearbySheet(false)}
            initialBreakpoint={0.35}
            breakpoints={[0, 0.35, 0.6, 0.9]}
            handleBehavior="cycle"
            className="nearby-sheet"
          >
            <IonContent className="nearby-content">
              <div className="nearby-header">
                <div className="nearby-title">Nearby Buses</div>

                <button
                  className="nearby-close"
                  onClick={() => setOpenNearbySheet(false)}
                  type="button"
                  aria-label="Close"
                >
                  <IonIcon icon={chevronDownOutline} />
                </button>
              </div>

              <div className="nearby-list">
                <div className="nearby-row">
                  <div className="nearby-left">
                    <div className="nearby-icon">
                      <IonIcon icon={busOutline} />
                    </div>

                    <div className="nearby-info">
                      <div className="nearby-busname">Bus123</div>
                      <div className="nearby-route">san rafael - sm sanmateo</div>
                    </div>
                  </div>

                  <div className="nearby-eta">2mins</div>
                </div>

                <div className="nearby-row">
                  <div className="nearby-left">
                    <div className="nearby-icon">
                      <IonIcon icon={busOutline} />
                    </div>

                    <div className="nearby-info">
                      <div className="nearby-busname">Bus789</div>
                      <div className="nearby-route">montalban - kasiglahan</div>
                    </div>
                  </div>

                  <div className="nearby-eta">10mins</div>
                </div>
              </div>
            </IonContent>
          </IonModal>
        </IonReactRouter>
      </IonApp>
    </AuthContext.Provider>
  );
};

export default App;
export { openNearbyEvent };
