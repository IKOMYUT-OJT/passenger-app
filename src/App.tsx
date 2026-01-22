import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonModal,
  IonButton,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { scanOutline, homeSharp, personSharp } from "ionicons/icons";
import { useState } from "react";

import Tab1 from "./pages/Homepage";
import Tab3 from "./pages/Profilepage";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import Homepage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";

setupIonicReact();

const App: React.FC = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/homepage" component={Homepage} />
            <Route exact path="/profilepage" component={Profilepage} />
            <Route exact path="/">
              <Redirect to="/homepage" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" className="custom-tab-bar">
            <IonTabButton tab="homepage" href="/homepage">
              <IonIcon icon={homeSharp} size="large" />
            </IonTabButton>

            {/* CENTER QR BUTTON */}
            <IonTabButton
              tab="qr"
              className="qr-tab"
              onClick={() => setShowQR(true)}
            >
              <div className="qr-hit-area">
                <div className="qr-tab-button pulse">
                  <IonIcon icon={scanOutline} />
                </div>
              </div>
            </IonTabButton>

            <IonTabButton tab="profilepage" href="/profilepage">
              <IonIcon icon={personSharp} className="custom-tab-bar" />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>

        {/* QR Modal */}
        <IonModal isOpen={showQR} onDidDismiss={() => setShowQR(false)}>
          <div className="qr-modal">
            <h2>Scan QR Code</h2>
            <IonButton onClick={() => setShowQR(false)} color="medium">
              Close
            </IonButton>
          </div>
        </IonModal>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
