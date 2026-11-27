import { ConversationModel } from "../models/conversation.model.js";
import { MessageModel } from "../models/message.model.js";

/**
 * @param { userId , title }
 * @description create an conversation with userId and title
 */

export const createConversationDAO = async (userId, title) => {
  return await ConversationModel.create({
    user: userId,
    title,
  });
};

/**
 * @param { conversationId , userId }
 * @description find conversation on the basis of conversation Id and user Id
 */

export const findConversationDao = async (userId, conversationId) => {
  return await ConversationModel.findOne({
    user: userId,
    conversationId,
  });
};

/**
 * @param { conversation Id }
 * @description find all the messages on the basisi of conversation Id
 */

export const findMessagesByConversation = async (conversationId) => {
  console.log("IN DAO" , conversationId)
  return await MessageModel.find({ conversation: conversationId });
};

/**
 * @param { role , content , conversationId }
 * @description create message
 */

export const createMessageDAO = async (msg) => {
  return await MessageModel.create(msg);
};

/**
 * @param { userId }
 * @description find all the conversation on the basis of userId
 */

export const findAllConversationByUserId = async (userId) => {
  return await ConversationModel.find({
    user: userId,
  });
};

/**
 * @param { userId , conversationId }
 * @description find conversation on the basis of userId and conversation ID
 */

export const findConversationByIdAndUser = async (userId, conversationId) => {
  return await ConversationModel.findOne({
    _id: conversationId,
    user: userId,
  });
};

