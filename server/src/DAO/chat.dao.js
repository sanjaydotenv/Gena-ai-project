import { ConversationModel } from "../models/conversation.model.js";
import { MessageModel } from "../models/message.model.js";

/**
 * @args { userId , title }
 * @description create an conversation with userId and title
 */

export const createConversationDAO = async (userId, title) => {
  return await ConversationModel.create({
    user: userId,
    title,
  });
};

/**
 * @args { conversationId , userId }
 * @description find conversation on the basis of conversation Id and user Id
 */

export const findConversationDao = async (userId, conversationId) => {
  return await ConversationModel.findOne({
    user: userId,
    conversationId,
  });
};

/**
 * @args { conversation Id }
 * @description find all the messages on the basisi of conversation Id
 */

export const findMessagesByConversation = async (conversationId) => {
  return await MessageModel.find({ conversation: conversationId });
};
