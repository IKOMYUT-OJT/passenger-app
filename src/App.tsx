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
import { LoadingProvider } from "./contexts/LoadingContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { AuthContext } from "./contexts/AuthContext";
import { getPlatformClasses } from "./utils/platform";
import { ROUTES } from "./constants";

import {
  HomePage,
  ProfilePage,
  EditProfilePage,
  SettingsPage,
  LoginPage,
  WalletPage,
  ChangePasswordPage,
  DiscountPage,
  WelcomePage,
  SignupPage,
  NotificationPage,
  ForgotPasswordPage,
  AddressPage,
  PrivacyPolicyPage,
  SecurityPage,
  HelpPage,
  AccountDeletionPage,
  AboutPage,
} from "./pages";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/palettes/dark.class.css";
import "./theme/variables.css";
import "./styles/common.css";
import "./styles/base.css";
import "./styles/responsive.css";
import "./styles/platform.css";
import "./theme/tabs.css";
import "./theme/qr-scanner.css";

setupIonicReact({
  mode: 'ios',
  swipeBackEnabled: true,
});

const openNearbyEvent = () => window.dispatchEvent(new Event("open-nearby"));
const TabsLayout: React.FC<{
  isLoggedIn: boolean;
  setOpenQRSheet: (v: boolean) => void;
}> = ({ isLoggedIn, setOpenQRSheet }) => {
  const location = useLocation();
  const hideBottomBar = false;
  if (!isLoggedIn) return <Redirect to={ROUTES.ROOT} />;

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path={ROUTES.TABS_HOME} component={HomePage} />
        <Route exact path={ROUTES.TABS_PROFILE} component={ProfilePage} />
        <Redirect exact from={ROUTES.TABS} to={ROUTES.TABS_HOME} />
      </IonRouterOutlet>

      {!hideBottomBar && (
        <div className="tabbar-wrapper">
          <IonTabBar slot="bottom" className="main-tabbar">
            <IonTabButton tab="home" href={ROUTES.TABS_HOME}>
              <IonIcon icon={homeSharp} />
            </IonTabButton>

            <IonTabButton className="tab-spacer" />

            <IonTabButton tab="profile" href={ROUTES.TABS_PROFILE}>
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
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setShowWelcome(true);

    
    const platformClasses = getPlatformClasses();
    document.body.className = platformClasses;

    
    const handleOrientationChange = () => {
      const newClasses = getPlatformClasses();
      document.body.className = newClasses;
    };

    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);
  useEffect(() => {
    const handler = () => {
      console.log('Received open-nearby event, opening sheet');
      setOpenNearbySheet(true);
    };
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
    const result = await BarcodeScanner.scan({});

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
          <LoadingProvider>
            <IonRouterOutlet>
            <Route
              exact
              path={ROUTES.ROOT}
              render={() => {
                
                if (showWelcome) return <WelcomePage />;
                if (isLoggedIn) return <Redirect to={ROUTES.TABS_HOME} />;
                return <Redirect to={ROUTES.LOGIN} />;
              }}
            />

            <Route exact path={ROUTES.WELCOME} component={WelcomePage} />

            <Route
              exact
              path={ROUTES.LOGIN}
              component={LoginPage}
            />

            <Route
              exact
              path={ROUTES.SIGNUP}
              render={() =>
                isLoggedIn ? (
                  <Redirect to={ROUTES.TABS_HOME} />
                ) : (
                  <SignupPage />
                )
              }
            />

            <Route
              exact
              path={ROUTES.EDIT_PROFILE}
              render={() => (isLoggedIn ? <DarkModeProvider><EditProfilePage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />)}
            />
            <Route
              exact
              path={ROUTES.SETTINGS}
              render={() => (isLoggedIn ? <DarkModeProvider><SettingsPage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />)}
            />
            <Route
              exact
              path={ROUTES.WALLET}
              render={() => (isLoggedIn ? <DarkModeProvider><WalletPage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />)}
            />
            <Route
              exact
              path={ROUTES.DISCOUNT}
              render={() => (isLoggedIn ? <DarkModeProvider><DiscountPage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />)}
            />
            <Route
              exact
              path={ROUTES.CHANGE_PASSWORD}
              render={() =>
                isLoggedIn ? <DarkModeProvider><ChangePasswordPage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />
              }
            />
            <Route
              exact
              path={ROUTES.NOTIFICATIONS}
              render={() =>
                isLoggedIn ? <DarkModeProvider><NotificationPage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />
              }
            />
            <Route
              exact
              path={ROUTES.ADDRESS}
              render={() =>
                isLoggedIn ? <DarkModeProvider><AddressPage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />
              }
            />
            <Route
              exact
              path={ROUTES.PRIVACY_POLICY}
              render={() =>
                isLoggedIn ? <DarkModeProvider><PrivacyPolicyPage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />
              }
            />
            <Route
              exact
              path={ROUTES.SECURITY}
              render={() =>
                isLoggedIn ? <DarkModeProvider><SecurityPage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />
              }
            />
            <Route
              exact
              path={ROUTES.HELP}
              render={() =>
                isLoggedIn ? <DarkModeProvider><HelpPage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />
              }
            />
            <Route
              exact
              path={ROUTES.ACCOUNT_DELETION}
              render={() =>
                isLoggedIn ? <DarkModeProvider><AccountDeletionPage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />
              }
            />
            <Route
              exact
              path={ROUTES.ABOUT}
              render={() =>
                isLoggedIn ? <DarkModeProvider><AboutPage /></DarkModeProvider> : <Redirect to={ROUTES.ROOT} />
              }
            />
            <Route exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordPage} />

            <Route
              path={ROUTES.TABS}
              render={() => (
                <DarkModeProvider>
                  <TabsLayout
                    isLoggedIn={isLoggedIn}
                    setOpenQRSheet={setOpenQRSheet}
                  />
                </DarkModeProvider>
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
            initialBreakpoint={0.45}
            breakpoints={[0, 0.45, 0.75, 1]}
            className="nearby-sheet"
          >
            <IonContent className="nearby-content" scrollY={false}>
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
                      <div className="nearby-route">Earth - Venus</div>
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
                      <div className="nearby-route">Uranus - Mercury</div>
                    </div>
                  </div>

                  <div className="nearby-eta">10mins</div>
                </div>
              </div>
            </IonContent>
          </IonModal>
          </LoadingProvider>
        </IonReactRouter>
      </IonApp>
    </AuthContext.Provider>
  );
};

export default App;
export { openNearbyEvent };
