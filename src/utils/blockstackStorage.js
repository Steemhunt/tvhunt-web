import { UserSession, AppConfig } from "blockstack";
import _ from "lodash";
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

export function putFile(path, data, options = {}, cb = () => {}) {
  userSession.putFile(path, JSON.stringify(data), options).then(cb);
}

export async function appendToFile(path, data, options = {}, cb = () => {}) {
  let list = await readFile(path, options);
  if (!list) list = [];
  userSession
    .putFile(path, JSON.stringify(list.concat(data)), options)
    .then(cb);
}

export async function removeFromFile(path, value, options = {}, cb = () => {}) {
  let list = await readFile(path, options);
  if (list) {
    userSession
      .putFile(path, JSON.stringify(_.pull(list, value)), options)
      .then(cb);
  }
}

export async function readFile(path, options = {}) {
  const file = await userSession.getFile(path, options);
  return JSON.parse(file);
}

export function deleteFile(path, options = {}, cb = () => {}) {
  userSession.deleteFile(path).then(cb);
}
