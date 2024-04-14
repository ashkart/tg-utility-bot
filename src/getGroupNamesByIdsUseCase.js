async function getGroupNamesByIdsUseCase(client, groupIds) {
  const groupNames = [];

  for (const groupId of groupIds) {
    const group = await client.invoke({
      _: 'getBasicGroupFullInfo',
      basic_group_id: groupId
    });

    console.log(group);

    // groupNames.push(group.usernames.editable_username);
  }

  return groupNames;
}

async function getSuperGroupNamesByIdsUseCase(client, superGroupIds) {
  const groupNames = [];

  for (const groupId of superGroupIds) {
    const group = await client.invoke({
      _: 'getSupergroupFullInfo',
      supergroup_id: groupId
    });

    console.log(group);

    // groupNames.push(group.usernames.editable_username);
  }

  return groupNames;
}

module.exports = {
  getGroupNamesByIdsUseCase,
  getSuperGroupNamesByIdsUseCase
}