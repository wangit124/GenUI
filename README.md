# GenUI

GenUI is a design-to-code generation tool powered by LLMs. It transforms UI designs into code with an intuitive and efficient workflow — ideal for developers looking to streamline their front-end development process.

## 🚀 Steps

1. Link your Figma account (Figma REST API)
1. Upload your Figma designs and convert them into images (Figma REST API)
1. Choose base framework (next.js, react.js, angular.js, jquery, etc...)
1. Choose refactoring settings (aggressive, moderate, or minimal component splitting)
1. Choose UI, State Management and Form NPM libraries (shadcn, zustand, react-hook-form, etc...)
1. Click "Generate" (LLM prompting)
1. View interactive directory structure and code file content
1. Export your code as a ZIP file
1. Option to restart the flow from scratch

## 🖥️ Live Demo


## 💻 Tech Stack
`Next.js` - Frontend App Server
`Node.js` - Backend API Server
`TailwindCSS` - UI Styling
`Shadcn & RadixUI` - UI Library
`Zustand` - State Management Library
`Supabase` - Database
`Figma API` - Auth and Images
`Anthropic API` - Code Generation

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- yarn

### Installation

```bash
cp env.example .env
yarn install && yarn dev
