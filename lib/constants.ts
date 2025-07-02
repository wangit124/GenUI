import { Configuration, StepNavItem, StepType } from "./types";

export const APP_URL =
  process.env.NODE_ENV === "development" ? `http://localhost:3000` : "";

export const steps: StepNavItem[] = [
  {
    id: StepType.UPLOAD,
    title: "Upload",
    description: "Import designs",
    component: "upload",
  },
  {
    id: StepType.CONFIG,
    title: "Configure",
    description: "Setup preferences",
    component: "config",
  },
  {
    id: StepType.GENERATE,
    title: "Generate",
    description: "Create code & components",
    component: "generate",
  },
  {
    id: StepType.EXPORT,
    title: "Preview & Export",
    description: "Download & deploy",
    component: "export",
  },
];

export const baseFrameworks: {
  id: Configuration["baseFramework"];
  name: string;
}[] = [
  {
    id: "nextjs",
    name: "Next.js",
  },
  {
    id: "reactjs",
    name: "React.js",
  },
  {
    id: "angular",
    name: "Angular.js",
  },
  {
    id: "jquery",
    name: "HTML & jQuery",
  },
];

export const componentSplittingConfig: Record<
  Configuration["styling"]["componentSplitting"],
  number
> = {
  minimal: 800,
  moderate: 500,
  aggressive: 300,
};

export const componentSplittingLevels: {
  id: Configuration["styling"]["componentSplitting"];
  name: string;
}[] = [
  {
    id: "minimal",
    name: `Minimal - split components that exceed ${componentSplittingConfig["minimal"]} lines`,
  },
  {
    id: "moderate",
    name: `Moderate - split components that exceed ${componentSplittingConfig["moderate"]} lines`,
  },
  {
    id: "aggressive",
    name: `Aggressive - split components that exceed ${componentSplittingConfig["aggressive"]} lines`,
  },
];

export const uiLibraries: {
  id: Configuration["libraries"]["ui"];
  name: string;
  link: string;
  description: string;
}[] = [
  {
    id: "shadcn",
    name: "shadcn/ui",
    link: "https://ui.shadcn.com/",
    description:
      "Beautifully designed components built with Radix UI and Tailwind CSS",
  },
  {
    id: "mui",
    name: "Material-UI (MUI)",
    link: "https://www.npmjs.com/package/@mui/material",
    description: "React components implementing Google's Material Design",
  },
  {
    id: "react-bootstrap",
    name: "React Bootstrap",
    link: "https://www.npmjs.com/package/react-bootstrap",
    description: "Bootstrap components built for React",
  },
  {
    id: "chakra-ui",
    name: "Chakra UI",
    link: "https://www.npmjs.com/package/@chakra-ui/react",
    description: "Simple, modular and accessible component library",
  },
  {
    id: "mantine",
    name: "Mantine",
    link: "https://www.npmjs.com/package/@mantine/core",
    description: "Full-featured React components and hooks library",
  },
  {
    id: "ant-design",
    name: "Ant Design",
    link: "https://www.npmjs.com/package/antd",
    description: "Enterprise-class UI design language and React components",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    link: "https://www.npmjs.com/package/@blueprintjs/core",
    description: "A React-based UI toolkit for the web",
  },
  {
    id: "semantic-ui-react",
    name: "Semantic UI React",
    link: "https://www.npmjs.com/package/semantic-ui-react",
    description: "React integration for Semantic UI",
  },
  {
    id: "nextui",
    name: "NextUI",
    link: "https://www.npmjs.com/package/@nextui-org/react",
    description: "Beautiful, fast and modern React UI Library",
  },
];

export const stateLibraries: {
  id: string;
  name: string;
  link: string;
  description: string;
}[] = [
  {
    id: "zustand",
    name: "Zustand",
    link: "https://www.npmjs.com/package/zustand",
    description: "Small, fast and scalable state management solution",
  },
  {
    id: "redux-toolkit",
    name: "Redux Toolkit",
    link: "https://www.npmjs.com/package/@reduxjs/toolkit",
    description:
      "Official, opinionated, batteries-included toolset for efficient Redux development",
  },
  {
    id: "jotai",
    name: "Jotai",
    link: "https://www.npmjs.com/package/jotai",
    description: "Primitive and flexible state management for React",
  },
  {
    id: "mobx",
    name: "MobX",
    link: "https://www.npmjs.com/package/mobx",
    description:
      "Simple, scalable state management through reactive programming",
  },
];

export const formLibraries: {
  id: string;
  name: string;
  link: string;
  description: string;
}[] = [
  {
    id: "react-hook-form",
    name: "React Hook Form",
    link: "https://www.npmjs.com/package/react-hook-form",
    description:
      "Performant, flexible and extensible forms with easy validation",
  },
  {
    id: "formik",
    name: "Formik",
    link: "https://www.npmjs.com/package/formik",
    description: "Build forms in React, without the tears",
  },
  {
    id: "react-form",
    name: "React Form",
    link: "https://www.npmjs.com/package/@tanstack/react-form",
    description: "Powerful and type-safe form state management for the web",
  },
  {
    id: "yup",
    name: "Yup",
    link: "https://www.npmjs.com/package/yup",
    description: "Dead simple Object schema validation",
  },
  {
    id: "zod",
    name: "Zod",
    link: "https://www.npmjs.com/package/zod",
    description:
      "TypeScript-first schema validation with static type inference",
  },
  {
    id: "joi",
    name: "Joi",
    link: "https://www.npmjs.com/package/joi",
    description:
      "Object schema description language and validator for JavaScript objects",
  },
];

export const mockGeneratedCodeResponse = [
  {
    id: "home-page",
    fileName: "app/page.tsx",
    code: '"use client"\n\nimport { useEffect } from "react"\nimport { useRouter } from "next/navigation"\nimport { useAuthStore } from "@/stores/auth-store"\n\nexport default function HomePage() {\n  const router = useRouter()\n  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)\n\n  useEffect(() => {\n    if (isAuthenticated) {\n      router.push("/profile")\n    } else {\n      router.push("/register")\n    }\n  }, [isAuthenticated, router])\n\n  return (\n    <div className="min-h-screen bg-gray-50 flex items-center justify-center">\n      <div className="text-center">\n        <h1 className="text-2xl font-light mb-4">Loading...</h1>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: "back-button",
    fileName: "components/back-button.tsx",
    code: '"use client"\n\nimport { ArrowLeft } from "lucide-react"\nimport { Button } from "@/components/ui/button"\n\ninterface BackButtonProps {\n  onClick?: () => void\n}\n\nexport function BackButton({ onClick }: BackButtonProps) {\n  return (\n    <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-10" onClick={onClick}>\n      <ArrowLeft className="h-6 w-6" />\n    </Button>\n  )\n}',
  },
];

export const MAX_FILE_COUNT = 2;
