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
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import { scanOutline, homeSharp, personSharp } from "ionicons/icons";

/* Pages */
import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";
import EditProfile from "./pages/EditProfile";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

/* Ionic CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";

setupIonicReact();

/* ===============================
   AUTH CONTEXT
================================ */
export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (val: boolean) => {},
});

const App: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Load login state */
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>

            {/* ================= LOGIN ================= */}
            <Route
              exact
              path="/"
              render={() =>
                isLoggedIn ? <Redirect to="/tabs/homepage" /> : <LoginPage />
              }
            />

            {/* ================= SIGN UP ================= */}
            <Route
              exact
              path="/signup"
              render={() =>
                isLoggedIn ? <Redirect to="/tabs/homepage" /> : <SignUpPage />
              }
            />

            {/* ================= EDIT PROFILE ================= */}
            <Route
              exact
              path="/edit-profile"
              render={() =>
                isLoggedIn ? <EditProfile /> : <Redirect to="/" />
              }
            />

            {/* ================= SETTINGS PAGE ================= */}
            <Route
              exact
              path="/settings"
              render={() =>
                isLoggedIn ? <SettingsPage /> : <Redirect to="/" />
              }
            />

            {/* ================= TABS (PROTECTED) ================= */}
            <Route
              path="/tabs"
              render={() =>
                isLoggedIn ? (
                  <IonTabs>
                    <IonRouterOutlet>
                      <Route exact path="/tabs/homepage" component={Homepage} />
                      <Route
                        exact
                        path="/tabs/profilepage"
                        component={Profilepage}
                      />
                      <Redirect exact from="/tabs" to="/tabs/homepage" />
                    </IonRouterOutlet>

                    {/* Bottom Navigation */}
                    <IonTabBar slot="bottom">
                      <IonTabButton tab="home" href="/tabs/homepage">
                        <IonIcon icon={homeSharp} />
                      </IonTabButton>

                      <IonTabButton tab="qr" onClick={() => setShowQR(true)}>
                        <IonIcon icon={scanOutline} />
                      </IonTabButton>

                      <IonTabButton tab="profile" href="/tabs/profilepage">
                        <IonIcon icon={personSharp} />
                      </IonTabButton>
                    </IonTabBar>
                  </IonTabs>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </IonRouterOutlet>

          {/* ================= QR MODAL ================= */}
          <IonModal isOpen={showQR} onDidDismiss={() => setShowQR(false)}>
            <div style={{ padding: 20, textAlign: "center" }}>
              <h2>Scan QR Code</h2>
              <IonButton expand="block" onClick={() => setShowQR(false)}>
                Close
              </IonButton>
            </div>
          </IonModal>
        </IonReactRouter>
      </IonApp>
    </AuthContext.Provider>
  );
};

export default App;
