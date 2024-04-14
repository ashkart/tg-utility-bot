import {Api} from "telegram";

async function answerIfNotWhitelistedUseCase(client, me, event, whitelist, answerText) {
  const senderId = event.message._senderId.value;

  if (senderId === me.id) {
    return;
  }

  const sender = await event.message.getSender();

  const user = await getUserById(client, sender.id);

  if (!user.users.some(u => whitelist.includes(u.username)) && !user.users.some(u => whitelist.includes(u.phone))) {
    await client.invoke(
      new Api.messages.SendMessage({
        peer: event._chatPeer,
        message: answerText,
        randomId: BigInt("-4156887774564"),
        noWebpage: true,
        noforwards: true
      })
    );
  }
}

async function getUserById(client, senderId) {
  return await client.invoke(
    new Api.users.GetFullUser({id: senderId})
  );
}

export {
  answerIfNotWhitelistedUseCase,
  getUserById
}