import { HumanMessage, AIMessage } from "langchain";
import {
  createConversationDAO,
  findConversationDao,
  findMessagesByConversation,
} from "../DAO/chat.dao";
import { generateTitle } from "../services/generateConversationTitle.service";
import model from "../services/main.service.js";

const convesationController = async (req, res) => {
  const { content, conversation: conversationId } = req.body;
  const { id } = req.user;

  let conversation;
  if (!conversationId) {
    const title = await generateTitle(content);

    conversation = createConversationDAO(id, title);
  } else {
    conversation = await findConversationDao(id, conversationId);

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }
  }

  const messages = (await findMessagesByConversation(conversation._id))
    .map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      } else if (msg.role === "assistant") {
        return new AIMessage(msg.content);
      }

      return null;
    })
    .filter(Boolean);

  messages.push(new HumanMessage(content));

  const response = await model.stream(content);

  let aiChunk = null;

  for await (let chunk of response) {
    if (aiChunk == null) {
      aiChunk = chunk;
    } else {
      aiChunk = aiChunk.concat(chunk);
    }
  }
};

export default { convesationController };
