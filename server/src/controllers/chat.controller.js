import { createConversationDAO, findConversationDao } from "../DAO/chat.dao";
import { generateTitle } from "../services/generateConversationTitle.service";

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


  
};

export default { convesationController };
