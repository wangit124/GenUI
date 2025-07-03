# GenUI

GenUI is a design-to-code generation tool powered by LLMs. It transforms UI designs into code with an intuitive and efficient workflow — ideal for developers looking to streamline their front-end development process.

## 💻 Live Demo
https://gen-ui-teal.vercel.app

## 🖥️ Video Demo

https://github.com/user-attachments/assets/20785676-8735-44aa-9fa1-0f49d256bcb5

## 📷 Screenshots
<img width="1496" alt="Step 1" src="https://github.com/user-attachments/assets/e18a7318-abbc-460f-bde8-210bffca2f35" />
<img width="1494" alt="Step 2" src="https://github.com/user-attachments/assets/2d107c64-9178-44e2-923e-da7a0dd66478" />
<img width="1494" alt="Step 3" src="https://github.com/user-attachments/assets/dcf7acb5-6ed9-43dd-b04d-0392a0f4f8cb" />
<img width="1494" alt="Step 3 5" src="https://github.com/user-attachments/assets/bf45f74a-a32c-48f6-bd84-45afffc37edd" />
<img width="1490" alt="Step 4" src="https://github.com/user-attachments/assets/326465e5-8c5a-4a11-bbbc-9ec0323a52fd" />

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
