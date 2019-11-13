import { UserSession, AppConfig } from "blockstack";
import _ from "lodash";
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

function userSignedIn() {
  return userSession.isUserSignedIn();
}

export function putFile(path, data, options = {}, cb = () => {}) {
  if (!userSignedIn()) return false;
  userSession.putFile(path, JSON.stringify(data), options).then(cb);
}

export async function appendToFile(path, data, options = {}, cb = () => {}) {
  let list = await readFile(path, options);
  if (!list) list = [];
  userSignedIn() &&
    userSession
      .putFile(path, JSON.stringify(list.concat(data)), options)
      .then(cb);
}

export async function removeFromFile(path, value, options = {}, cb = () => {}) {
  let list = await readFile(path, options);
  if (userSignedIn() && list) {
    userSession
      .putFile(
        path,
        JSON.stringify(_.pullAllWith(list, [value], _.isEqual)),
        options
      )
      .then(cb);
  }
}

export async function readFile(path, options = {}) {
  if (!userSignedIn()) return false;
  const file = await userSession.getFile(path, options);
  return JSON.parse(file);
}

export function deleteFile(path, options = {}, cb = () => {}) {
  userSignedIn() && userSession.deleteFile(path).then(cb);
}
