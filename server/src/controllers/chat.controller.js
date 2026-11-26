import { generateTitle } from "../services/generateConversationTitle.service";

const convesationController = async () => {
  const { content, conversation } = req.body;

  if (!conversation) {
    const response = await generateTitle(content);
  }
};

export default { convesationController };
