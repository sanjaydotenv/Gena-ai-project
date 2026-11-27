import { createConversationDAO } from "../DAO/chat.dao";
import { generateTitle } from "../services/generateConversationTitle.service";

const convesationController = async (req, res) => {
  const { content, conversation } = req.body;
  const { id } = req.user;

  if (!conversation) {
    const title = await generateTitle(content);

    const conversation = createConversationDAO(id, title);
  }else {
    
  }
};

export default { convesationController };
