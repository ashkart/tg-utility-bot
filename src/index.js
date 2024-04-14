const tdl = require('tdl')

const {getUserAndGroupIdsByChatListUseCase} = require('./getUserAndGroupIdsByChatListUseCase')
const {getUserNamesByIdsUseCase} = require("./getUserNamesByIdsUseCase");
const {getGroupNamesByIdsUseCase, getSuperGroupNamesByIdsUseCase} = require("./getGroupNamesByIdsUseCase");
const {answerIfNotWhitelistedUseCase} = require("./answerIfNotWhitelistedUseCase");
const {readWhiteList} = require("./readWhiteList");

const APP_ID = process.env.APP_ID;
const APP_HASH = process.env.APP_HASH;
const DEV_MODE = process.env.DEV_MODE || false;

tdl.configure({
  libdir: `${__dirname}/../lib`
});

(async function main() {
  const client = tdl.createClient({
    apiId: APP_ID,
    apiHash: APP_HASH,
    databaseDirectory: `${__dirname}/../data/_td_database`,
    filesDirectory: `${__dirname}/../data/_td_files`,
    use_test_dc: DEV_MODE
  });

  await client.login();

  client.on('error', console.error);

  const listenToUpdates = ['updateNewMessage'];

  const usersListContext = {usersIdToNameMap: {}};

  const me = await client.invoke({ _: 'getMe' });

  // const userWhiteList = [
  //   'k_darri'
  // ];

  const userWhiteList = await readWhiteList(`${__dirname}/../whitelist`);

  client.on('update', async update => {
    if (!listenToUpdates.includes(update._)) {
      return;
    }

    if (update._ === 'updateNewMessage') {
      await answerIfNotWhitelistedUseCase(client, me, update.message, userWhiteList, usersListContext);
    }
  });
}().catch(console.error));
