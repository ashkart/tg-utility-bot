async function getUserNamesByIdsUseCase(client, userIds) {
  const userNames = {};

  for (const userId of userIds) {
    const user = await client.invoke({
      _: 'getUser',
      user_id: userId
    });

    if (user.is_support || user.type._ === 'userTypeDeleted') {
      continue;
    }

    if (user.usernames && user.usernames.editable_username) {
      userNames[userId] = user.usernames.editable_username;
    } else if (user.phone_number) {
      userNames[userId] = user.phone_number;
    }
  }

  return userNames;
}

module.exports = {
  getUserNamesByIdsUseCase
}