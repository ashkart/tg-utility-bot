/**
 * @param client
 * @param chatIds {number[]}
 * @returns {Promise<object>}
 */
async function getUserAndGroupIdsByChatListUseCase(client, chatIds) {
  const buddys = {
    userIds: [],
    groupIds: [],
    superGroupIds: []
  };

  for (const chatId of chatIds) {
    const chat = await client.invoke({
      _: 'getChat',
      chat_id: chatId
    });

    switch(chat.type._) {
      case 'chatTypePrivate':
      case 'chatTypeSecret':
        buddys.userIds.push(chat.type.user_id);
        break;
      case 'chatTypeBasicGroup':
        buddys.groupIds.push(chat.type.basic_group_id);
        break;
      case 'chatTypeSupergroup':
        buddys.superGroupIds.push(chat.type.supergroup_id);
        break;

      default:
        console.log(chat.type._);
    }
  }

  return buddys;
}

module.exports = {
  getUserAndGroupIdsByChatListUseCase
}