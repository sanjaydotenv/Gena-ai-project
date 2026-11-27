import { ChatGroq } from "@langchain/groq";
import { _Config } from "../config/config.js";

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: _Config.GROQ_API_KEY,
});

export default model