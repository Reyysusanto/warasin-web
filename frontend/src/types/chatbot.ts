export type ChatBotRequest = {
  message: string;
  conversation_id?: string;
};

export type ChatBotResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: {
    response: string;
    conversation_id: string;
  };
};
