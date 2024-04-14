const {getUserAndGroupIdsByChatListUseCase} = require("./getUserAndGroupIdsByChatListUseCase");
const {getUserNamesByIdsUseCase} = require("./getUserNamesByIdsUseCase");

async function answerIfNotWhitelistedUseCase(client, me, message, whitelist, usersListContext) {
  const senderId = message.sender_id.user_id;

  if (senderId === me.id) {
    return;
  }

  if (!usersListContext.usersIdToNameMap[senderId]) {
    usersListContext.usersIdToNameMap = await getUserMapIdName(client);
  }

  if (!usersListContext.usersIdToNameMap[senderId] || !whitelist.includes(usersListContext.usersIdToNameMap[senderId])) {
    await client.invoke({
      _: 'sendMessage',
      chat_id: message.chat_id,
      input_message_content: {
        _: 'inputMessageText',
        text: {
          _: 'formattedText',
          text: 'Dont!'
        }
      }
    }).catch(console.error);
  }
}

async function getUserMapIdName(client) {
  const chats = await client.invoke({
    _: 'getChats',
    chat_list: { _: 'chatListMain' },
    limit: 1000
  });

  const userAndGroupIds = await getUserAndGroupIdsByChatListUseCase(client, chats.chat_ids);

  return await getUserNamesByIdsUseCase(client, userAndGroupIds.userIds);
}

module.exports = {
  answerIfNotWhitelistedUseCase
}