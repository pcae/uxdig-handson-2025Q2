#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  getDesignSystemRules,
  executeGetDesignSystemRules,
} from "../tools/getDesignSystemRules.js";
import {
  getDesignGuideline,
  executeGetDesignGuideline,
} from "../tools/getDesignGuideline.js";

const server = new Server(
  {
    name: "kds-design-guide-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [getDesignSystemRules, getDesignGuideline],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "getDesignSystemRules") {
    return await executeGetDesignSystemRules(args);
  }

  if (name === "getDesignGuideline") {
    return await executeGetDesignGuideline();
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("📡 KDS Design Guide MCP Server is running");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("❌ MCP 起動エラー:", error);
    process.exit(1);
  });
}
