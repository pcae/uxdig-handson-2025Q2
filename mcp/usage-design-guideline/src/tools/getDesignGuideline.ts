import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export const getDesignGuideline: Tool = {
  name: "getDesignGuideline",
  description: (() => {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const configPath = join(__dirname, "../../config/figma-guideline.json");
      const configContent = readFileSync(configPath, "utf-8");
      const config = JSON.parse(configContent);
      return config.description || "";
    } catch (error) {
      return "";
    }
  })(),
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
};

// 設定ファイルからFigma URLを読み込む関数
function loadFigmaUrl(): { url: string; description: string } {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const configPath = join(__dirname, "../../config/figma-guideline.json");
    const configContent = readFileSync(configPath, "utf-8");
    const config = JSON.parse(configContent);
    
    if (!config.url) {
      throw new Error("Figma URL is empty in config file");
    }
    
    return {
      url: config.url,
      description: config.description || "KDS Design Guideline"
    };
  } catch (error) {
    console.error("Failed to load Figma URL from config:", error);
    // フォールバック用のデフォルト値
    return {
      url: "",
      description: "KDS Design Guideline"
    };
  }
}

export async function executeGetDesignGuideline() {
  const figmaConfig = loadFigmaUrl();
  
  return {
    content: [
      {
        type: "text",
        text: `
          下記は${figmaConfig.description}Figmaのリンクです。このFigmaリンクをfigma-dev-mcp-serverに渡して内容を取得してください。
          ${figmaConfig.url}
        `,
      },
    ],
  };
}
