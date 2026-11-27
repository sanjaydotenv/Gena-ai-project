import { ConversationModel } from "../models/conversation.model.js";

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

export const findConversationDao = async (userId , conversationId) => {
    return await ConversationModel.findOne({
        user: userId,
        conversationId
    })
}