This project is a boilerplate for [Next.js](https://nextjs.org/).

## Tech Stack

Refer to [Tech stack](/docs/TechStack.md).

## Consensus overview

Refer to [Consensus overview](/docs/ConsensusOverview.md).

## Directory structure

Refer to [Directory structure](/docs/DirectoryStructure.md).

## Installation

First, install with this command:

\* Use `pnpm` as the package manager.  
[https://pnpm.io/ja/](https://pnpm.io/ja/)

```bash
pnpm i
```

## Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Function Description

The `app` directory is mapped to `/*`. However, the `app/api` directory is excluded.

[API routes](https://nextjs.org/docs/api-routes/introduction) can accessed at [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can edited in `app/api/hello.ts`.

The `app/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Formatter settings are `.vscode/settings.json` and `.prettierrc`.

Learn more about Mock server, State management, HTTP Client, Generator for OpenAPI specification and more to [Consensus overview](/docs/ConsensusOverview.md).

## Environment Variables

There are 4 types environment variables: local, develop, staging, and production.
Learn more about Environment variables to [Consensus overview](/docs/ConsensusOverview.md).

## Build files

Running build commands for production files:

```bash
pnpm build
```

## AI Coding

This boilerplate provides a system prompt in `.cursor/rules` to enable the use of Cursor.
If necessary, modify accordingly according to your requirements.
