import { Itoken, Iperson } from "./types";
import * as peopleAPI from "./peopleAPI";
import * as fs from "fs";
import * as auth from "./auth";
/* -------------------------------- Consts ---------------------------------- */
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

(async () => {
  try {
    await auth.authorizeAccess();
    const accInfo: Itoken = JSON.parse(await readFile(auth.ACC_TOKEN_LOCATION));
    const peopleContacts: Iperson[] = await peopleAPI.retriveContacts(accInfo);
    console.log(JSON.stringify(peopleContacts));
  } catch (err) {
    console.log("error occured\nerror message: ", err);
  }
})();
