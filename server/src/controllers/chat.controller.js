import { HumanMessage, AIMessage, createAgent } from "langchain";
import {
  createConversationDAO,
  createMessageDAO,
  findAllConversationByUserId,
  findConversationByIdAndUser,
  findConversationDao,
  findMessagesByConversation,
} from "../DAO/chat.dao.js";
import { generateTitle } from "../services/generateConversationTitle.service.js";
import { MCPAdapter } from "@langchain/mcp-adapters";
import model from "../services/main.service.js";
import { _Config } from "../config/config.js";

const adapter = new MCPAdapter({
  servers: {
    tavily: {
      url: _Config.TAVILY_API_KEY,
    },
  },
});

const tools = await adapter.listTools();

const convesationController = async (req, res) => {
  const { content, conversation: conversationId } = req.body;
  const { id } = req.user;

  let conversation;
  if (!conversationId) {
    const { title } = await generateTitle(content);

    conversation = await createConversationDAO(id, title);
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

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write(
    `data: ${JSON.stringify({ conversationId: conversation.id, title: conversation.title })}\n\n`,
  );

  await createMessageDAO({
    role: "user",
    content,
    conversation: conversation._id,
  });

  const agent = createAgent({
    model,
    tools,
  });

  const response = await agent.invoke({
    messages,
  });

  console.log("AGENT RESPONSE:", response);

  const aiMessage = response.messages[response.messages.length - 1];

  console.log("AI MESSAGE:", aiMessage.content);

  res.write(`data: ${JSON.stringify({ chunk: aiMessage.content })}\n\n`);

  res.end();

  await createMessageDAO({
    role: "assistant",
    content: aiMessage.content,
    conversation: conversation._id,
  });
};

const getAllConversationController = async (req, res) => {
  const { id } = req.user;

  const conversations = await findAllConversationByUserId(id);

  res.status(200).json({
    message: "all conversation fetched successfully",
    conversations,
  });
};

const getAllMessageByConersation = async (req, res) => {
  const { conversationId } = req.params;
  const { id } = req.user;

  const conversation = await findConversationByIdAndUser(id, conversationId);

  if (conversation.length === 0) {
    return res.status(404).json({
      message: "conversation not found",
    });
  }

  const messages = await findMessagesByConversation(conversation._id);

  res.status(200).json({
    message: "all message fetched successfully",
    messages,
  });
};

export default {
  convesationController,
  getAllConversationController,
  getAllMessageByConersation,
};
