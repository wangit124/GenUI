# GenUI

GenUI is a design-to-code generation tool powered by LLMs. It transforms UI designs into code with an intuitive and efficient workflow — ideal for developers looking to streamline their front-end development process.

## 💻 Live Demo
https://gen-ui-teal.vercel.app

## 🎥 Video Demo

https://github.com/user-attachments/assets/2ad47614-fb75-4533-aa77-202bd735da5b

## 📷 Screenshots
<img alt="GenUI - Step 1" src="https://github.com/user-attachments/assets/23cd197c-923f-43e6-ba16-dfc7f50d607d" />
<img alt="GenUI - Step 2" src="https://github.com/user-attachments/assets/e2f39d06-4256-4086-932a-ceba3b27ce98" />
<img alt="GenUI - Step 3" src="https://github.com/user-attachments/assets/9ce4fa3e-2a3e-476e-bf6b-7ab01be639e1" />
<img alt="GenUI - Step 3 5" src="https://github.com/user-attachments/assets/091f90d0-89e9-4bdf-8ff9-6a173dc0a534" />
<img alt="GenUI - Step 4" src="https://github.com/user-attachments/assets/4dd4b4f5-5e4e-4042-a412-1bdb83ac6f2b" />

## 🚀 Steps

1. Link your Figma account (Figma REST API)
1. Upload your Figma designs and convert them into images (Figma REST API)
1. Choose base web framework (next.js, react.js, angular.js, jquery, etc...)
1. Choose refactoring settings (aggressive, moderate, or minimal component splitting)
1. Choose UI, State Management and Form NPM libraries (shadcn, zustand, react-hook-form, etc...)
1. Click "Generate" (LLM prompting)
1. View interactive directory structure and code file content
1. Export your code as a ZIP file
1. Option to restart the flow from scratch

## 💻 Tech Stack
`Next.js` - Frontend App Server

`Node.js` - Backend API Server

`TailwindCSS` - UI Styling

`RadixUI` - UI Library

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
