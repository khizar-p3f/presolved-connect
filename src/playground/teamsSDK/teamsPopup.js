import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { Router } from "@gatsbyjs/reach-router";
import AuthTest from "./authTest";

function WelcomeUser() {
  const { accounts } = useMsal();
  const username = accounts[0].username;

  return <p>Welcome, {username}</p>;
}

// Remember that MsalProvider must be rendered somewhere higher up in the component tree
function App() {
  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Popup}>
      <p>This will only render if a user is signed-in.</p>
      <WelcomeUser path="/" />
      <AuthTest path="/authTest" />
    </MsalAuthenticationTemplate>
  );
}

export default App;
