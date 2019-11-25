import { UserSession, AppConfig } from "blockstack";
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

const transitPrivateKey = userSession.generateAndStoreTransitKey();
const redirectURI = `${process.env.REACT_APP_PUBLIC_URL}/auth`;
const manifestURI = `${process.env.REACT_APP_PUBLIC_URL}/manifest.json`;
const scopes = ["scope_write", "publish_data"];
const appDomain = process.env.REACT_APP_PUBLIC_URL;

const authRequest = userSession.makeAuthRequest(
  transitPrivateKey,
  redirectURI,
  manifestURI,
  scopes,
  appDomain
);

export function login() {
  userSession.redirectToSignInWithAuthRequest(authRequest);
}

export function displayUsername(obj, fallback = 'anonymous') {
  return obj.username ? `@${obj.username.split(".")[0]}` : fallback;
}