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

export const handleConversationAPI = async (content,conversationId , accessToken) => {
  console.log(content , accessToken)
  try {
    const response = await fetch("/api/chat/conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        content,
      }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return response;
  } catch (error) {
    console.log("API Error:", error.message);
    throw error;
  }
};
