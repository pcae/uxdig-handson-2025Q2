import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Tool } from "@modelcontextprotocol/sdk/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDesignSystemRules: Tool = {
  name: "getDesignSystemRules",
  description: "KDSデザインガイドラインの内容を取得します",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
};

export async function executeGetDesignSystemRules(args: any) {
  try {
    const pathName = path.join(__dirname, "../../config/design-guide.md");
    if (!fs.existsSync(pathName)) {
      return {
        content: [
          {
            type: "text",
            text: "デザインガイドファイルが見つかりません。",
          },
        ],
      };
    }

    const content = fs.readFileSync(pathName, "utf-8");
    return {
      content: [
        {
          type: "text",
          text: `# KDSデザインガイドライン\n\n${content}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `エラーが発生しました: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
    };
  }
}
