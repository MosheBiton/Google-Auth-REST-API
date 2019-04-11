import axios from "axios"; // https://github.com/axios/axios
import * as fs from "fs";
import { Icredentials, Itoken, IrefreshToken } from "./types";
const open = require("open"); // https://github.com/sindresorhus/open
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readline = require("readline");
/* -------------------------------- Consts ---------------------------------- */
const SCOPE = "https://www.googleapis.com/auth/contacts";
const CREDS_LOCATION = "./creds.json";
export const ACC_TOKEN_LOCATION = "./token.json";

// https://developers.google.com/identity/protocols/OAuth2WebServer
// https://www.daimto.com/google-authentication-with-curl/
export async function authorizeAccess() {
  const Icredentials: Icredentials = JSON.parse(await readFile(CREDS_LOCATION));

  if (fs.existsSync(ACC_TOKEN_LOCATION)) {
    const accInfo: Itoken = JSON.parse(await readFile(ACC_TOKEN_LOCATION));
    /* check if refresh token is needed */
    if (accInfo.expire_date_time == NaN || accInfo.expire_date_time - new Date().getTime() < 0) {
      console.log("Refreshing access token");
      let res: IrefreshToken = await refreshAccessToken(Icredentials, accInfo);
      accInfo.access_token = res.access_token;
      accInfo.expires_in = res.expires_in;
      accInfo.expire_date_time = new Date().getTime() + res.expires_in * 1000; // because the getTime returns the time in ms
      await writeFile("./token.json", JSON.stringify(accInfo));
    }
    return;
  }
  /* get a new access token */
  const authCode = await getAuthCode(Icredentials);
  const accParams = await exchangeAuthCodeForAccToken(authCode, Icredentials.installed.token_uri, Icredentials.installed.client_id, Icredentials.installed.client_secret, Icredentials.installed.redirect_uris[0]);
  accParams["expire_date_time"] = new Date().getTime() + accParams.expires_in * 1000;
  await writeFile("./token.json", JSON.stringify(accParams));
}

export async function getAuthCode(Icredentials: Icredentials) {
  const res = await axios({
    method: "get",
    url: Icredentials.installed.auth_uri,
    params: {
      client_id: Icredentials.installed.client_id,
      redirect_uri: Icredentials.installed.redirect_uris[0],
      access_type: "offline",
      include_granted_scopes: true,
      state: "state_parameter_passthrough_value",
      scope: SCOPE,
      response_type: "code"
    }
  });
  await writeFile("./tokenPage.html", res.data);
  await open("./tokenPage.html", { wait: false });
  return await askQuestion("Enter the code from that page here: ");
}

/* Exchange auth code for access token and refresh token */
// https://developers.google.com/identity/protocols/OAuth2WebServer
export async function exchangeAuthCodeForAccToken(authCode: {}, uri: string, cliendId: string, clientSecret: string, redirectUri: string) {
  const res = await axios({
    method: "post",
    url: uri,
    params: {
      code: authCode,
      client_id: cliendId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    }
  });
  return <Itoken>res.data;
}

// using the IrefreshToken to obtain new access token
export async function refreshAccessToken(Icredentials: Icredentials, accInfo: Itoken) {
  const res = await axios({
    method: "post",
    url: Icredentials.installed.token_uri,
    params: {
      refresh_token: accInfo.refresh_token,
      client_id: Icredentials.installed.client_id,
      client_secret: Icredentials.installed.client_secret,
      grant_type: "refresh_token"
    }
  });
  return <IrefreshToken>res.data;
}

function askQuestion(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve =>
    rl.question(query, (ans: {} | PromiseLike<{}>) => {
      rl.close();
      resolve(ans);
    })
  );
}
