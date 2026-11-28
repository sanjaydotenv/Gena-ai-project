import axiosInstance from "../../../config/axiosInstance";

export const getAllConversationAPI = async (accessToken) => {
  return await axiosInstance.get("/chat/get-all-conversation", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getMessagesByConversationIdAPI = async (
  conversationId,
  accessToken,
) => {
  return await axiosInstance.get(`/chat/get-all-messages/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
