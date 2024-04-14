import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import readline from "readline";
import {readAnswer, readWhiteList} from "./readWhiteList.js";
import {answerIfNotWhitelistedUseCase} from "./answerIfNotWhitelistedUseCase.js";
import {NewMessage} from "telegram/events/index.js";

const APP_ID = +process.env.APP_ID;
const APP_HASH = process.env.APP_HASH;
const APP_SESSION = process.env.APP_SESSION;

const stringSession = new StringSession(APP_SESSION); // fill this later with the value from session.save()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, APP_ID, APP_HASH, {
    connectionRetries: 5
  });

  await client.start({
    phoneNumber: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your number: ", resolve)
      ),
    password: async () =>
      new Promise((resolve) =>
        rl.question("Please enter your password: ", resolve)
      ),
    phoneCode: async () =>
      new Promise((resolve) =>
        rl.question("Please enter the code you received: ", resolve)
      ),
    onError: (err) => console.log(err)
  });

  console.log("You should now be connected.");
  console.log(client.session.save());

  const usersListContext = {usersIdToNameMap: {}};

  const me = await client.getMe();

  const userWhiteList = await readWhiteList(`./whitelist`);
  const answerText = await readAnswer(`./answer`);

  client.addEventHandler(
    (event) => {
      answerIfNotWhitelistedUseCase(client, me, event, userWhiteList, answerText);
    },
    new NewMessage({
      // forwards: true,
      // incoming: true,
      outgoing: false,
      // blacklistChats: false
    }));
})();