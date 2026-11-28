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

export const handleConversationAPI = async (
  content,
  conversationId,
  accessToken,
) => {
  console.log("SENDING CONVERSATION ID:", conversationId);

  const response = await fetch("/api/chat/conversation", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify({
      content,
      conversation: conversationId,
    }),
  });

  if (!response.ok) {
    const error = await response.text();

    console.log("STATUS:", response.status);
    console.log("ERROR RESPONSE:", error);

    throw new Error(error);
  }

  return response;
};
