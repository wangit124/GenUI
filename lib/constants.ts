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
    id: StepType.PREVIEW,
    title: "Preview",
    description: "Review results",
    component: "preview",
  },
  {
    id: StepType.EXPORT,
    title: "Export",
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
  {
    id: "mobile-status-bar",
    fileName: "components/mobile-status-bar.tsx",
    code: 'export function MobileStatusBar() {\n  return (\n    <div className="flex justify-between items-center px-6 py-2 text-black font-medium">\n      <div className="text-lg">9:27</div>\n      <div className="flex items-center gap-1">\n        <div className="flex gap-1">\n          <div className="w-1 h-3 bg-black rounded-full"></div>\n          <div className="w-1 h-3 bg-black rounded-full"></div>\n          <div className="w-1 h-3 bg-black rounded-full"></div>\n          <div className="w-1 h-3 bg-gray-400 rounded-full"></div>\n        </div>\n        <div className="ml-2">\n          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">\n            <path d="M1 6C1 6 4 1 9 1C14 1 17 6 17 6C17 6 14 11 9 11C4 11 1 6 1 6Z" stroke="black" strokeWidth="2" />\n            <circle cx="9" cy="6" r="2" stroke="black" strokeWidth="2" />\n          </svg>\n        </div>\n        <div className="w-6 h-3 bg-black rounded-sm ml-2"></div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: "layout",
    fileName: "app/layout.tsx",
    code: 'import type React from "react"\nimport type { Metadata } from "next"\nimport { Inter } from "next/font/google"\nimport "./globals.css"\n\nconst inter = Inter({ subsets: ["latin"] })\n\nexport const metadata: Metadata = {\n  title: "Social Media App",\n  description: "A modern social media application",\n}\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode\n}) {\n  return (\n    <html lang="en">\n      <body className={inter.className}>\n        <div className="max-w-sm mx-auto bg-white min-h-screen">{children}</div>\n      </body>\n    </html>\n  )\n}',
  },
  {
    id: "bottom-navigation",
    fileName: "components/bottom-navigation.tsx",
    code: 'import { Home, Search, Plus, MessageCircle, User } from "lucide-react"\nimport { Button } from "@/components/ui/button"\n\nexport function BottomNavigation() {\n  return (\n    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">\n      <div className="flex justify-around items-center max-w-sm mx-auto">\n        <Button variant="ghost" size="icon">\n          <Home className="h-6 w-6" />\n        </Button>\n        <Button variant="ghost" size="icon">\n          <Search className="h-6 w-6" />\n        </Button>\n        <Button\n          size="icon"\n          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 rounded-full"\n        >\n          <Plus className="h-6 w-6 text-white" />\n        </Button>\n        <Button variant="ghost" size="icon">\n          <MessageCircle className="h-6 w-6" />\n        </Button>\n        <Button variant="ghost" size="icon">\n          <User className="h-6 w-6" />\n        </Button>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: "photo-gallery",
    fileName: "components/photo-gallery.tsx",
    code: 'import Image from "next/image"\n\nconst photos = [\n  "/placeholder.svg?height=150&width=150",\n  "/placeholder.svg?height=150&width=150",\n  "/placeholder.svg?height=150&width=150",\n  "/placeholder.svg?height=150&width=150",\n]\n\nexport function PhotoGallery() {\n  return (\n    <div className="grid grid-cols-2 gap-2 px-6 pb-20">\n      {photos.map((photo, index) => (\n        <div key={index} className="aspect-square relative">\n          <Image\n            src={photo || "/placeholder.svg"}\n            alt={`Photo ${index + 1}`}\n            fill\n            className="object-cover rounded-lg"\n          />\n        </div>\n      ))}\n    </div>\n  )\n}',
  },
  {
    id: "register-page",
    fileName: "app/register/page.tsx",
    code: '"use client"\n\nimport { useForm } from "react-hook-form"\nimport { useRouter } from "next/navigation"\nimport { Button } from "@/components/ui/button"\nimport { Input } from "@/components/ui/input"\nimport { MobileStatusBar } from "@/components/mobile-status-bar"\nimport { BackButton } from "@/components/back-button"\nimport { useAuthStore } from "@/stores/auth-store"\n\ninterface RegisterForm {\n  email: string\n  password: string\n}\n\nexport default function RegisterPage() {\n  const router = useRouter()\n  const register = useAuthStore((state) => state.register)\n\n  const {\n    register: registerField,\n    handleSubmit,\n    formState: { errors },\n  } = useForm<RegisterForm>()\n\n  const onSubmit = (data: RegisterForm) => {\n    register(data.email, data.password)\n    router.push("/profile")\n  }\n\n  const handleBack = () => {\n    router.back()\n  }\n\n  return (\n    <div className="min-h-screen bg-gray-50">\n      <MobileStatusBar />\n      <div className="relative px-6 pt-16">\n        <BackButton onClick={handleBack} />\n\n        <h1 className="text-4xl font-light text-black mb-12">Register</h1>\n\n        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">\n          <div>\n            <Input\n              {...registerField("email", {\n                required: "Email is required",\n                pattern: {\n                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,\n                  message: "Invalid email address",\n                },\n              })}\n              type="email"\n              placeholder="Email address"\n              className="h-14 text-lg border-2 border-black rounded-none bg-white"\n            />\n            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}\n          </div>\n\n          <div>\n            <Input\n              {...registerField("password", {\n                required: "Password is required",\n                minLength: {\n                  value: 6,\n                  message: "Password must be at least 6 characters",\n                },\n              })}\n              type="password"\n              placeholder="Create password"\n              className="h-14 text-lg border-2 border-black rounded-none bg-white"\n            />\n            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}\n          </div>\n\n          <Button\n            type="submit"\n            className="w-full h-14 bg-black hover:bg-gray-800 text-white text-lg font-medium rounded-none mt-8"\n          >\n            NEXT\n          </Button>\n        </form>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: "profile-page",
    fileName: "app/profile/page.tsx",
    code: '"use client"\n\nimport Image from "next/image"\nimport { Button } from "@/components/ui/button"\nimport { MobileStatusBar } from "@/components/mobile-status-bar"\nimport { BottomNavigation } from "@/components/bottom-navigation"\nimport { PhotoGallery } from "@/components/photo-gallery"\nimport { useAuthStore } from "@/stores/auth-store"\n\nexport default function ProfilePage() {\n  const { user, followUser, unfollowUser } = useAuthStore()\n\n  const handleFollowToggle = () => {\n    if (!user) return\n\n    if (user.isFollowing) {\n      unfollowUser(user.id)\n    } else {\n      followUser(user.id)\n    }\n  }\n\n  if (!user) {\n    return <div>Loading...</div>\n  }\n\n  return (\n    <div className="min-h-screen bg-gray-50">\n      <MobileStatusBar />\n\n      <div className="pt-8 pb-4">\n        {/* Profile Section */}\n        <div className="flex flex-col items-center px-6 mb-8">\n          <div className="relative w-32 h-32 mb-6">\n            <Image\n              src="/placeholder.svg?height=128&width=128"\n              alt="Profile"\n              fill\n              className="object-cover rounded-full"\n            />\n          </div>\n\n          <h1 className="text-3xl font-light text-black mb-2">{user.name}</h1>\n          <p className="text-lg font-medium text-black mb-8">{user.location}</p>\n\n          <div className="w-full space-y-4">\n            <Button\n              onClick={handleFollowToggle}\n              className="w-full h-12 bg-black hover:bg-gray-800 text-white text-lg font-medium rounded-none"\n            >\n              {user.isFollowing ? "UNFOLLOW JANE" : "FOLLOW JANE"}\n            </Button>\n\n            <Button\n              variant="outline"\n              className="w-full h-12 bg-white text-black text-lg font-medium rounded-none border-2 border-black hover:bg-gray-50"\n            >\n              MESSAGE\n            </Button>\n          </div>\n        </div>\n\n        {/* Photo Gallery */}\n        <PhotoGallery />\n      </div>\n\n      <BottomNavigation />\n    </div>\n  )\n}',
  },
  {
    id: "auth-store",
    fileName: "stores/auth-store.ts",
    code: 'import { create } from "zustand"\n\ninterface User {\n  id: string\n  name: string\n  email: string\n  location: string\n  profileImage: string\n  isFollowing: boolean\n}\n\ninterface AuthState {\n  user: User | null\n  isAuthenticated: boolean\n  login: (email: string, password: string) => void\n  register: (email: string, password: string) => void\n  logout: () => void\n  followUser: (userId: string) => void\n  unfollowUser: (userId: string) => void\n}\n\nexport const useAuthStore = create<AuthState>((set) => ({\n  user: null,\n  isAuthenticated: false,\n  login: (email: string, password: string) => {\n    // Mock login logic\n    set({\n      user: {\n        id: "1",\n        name: "Jane",\n        email,\n        location: "SAN FRANCISCO, CA",\n        profileImage: "/placeholder.svg?height=200&width=200",\n        isFollowing: false,\n      },\n      isAuthenticated: true,\n    })\n  },\n  register: (email: string, password: string) => {\n    // Mock registration logic\n    set({\n      user: {\n        id: "1",\n        name: "Jane",\n        email,\n        location: "SAN FRANCISCO, CA",\n        profileImage: "/placeholder.svg?height=200&width=200",\n        isFollowing: false,\n      },\n      isAuthenticated: true,\n    })\n  },\n  logout: () => {\n    set({ user: null, isAuthenticated: false })\n  },\n  followUser: (userId: string) => {\n    set((state) => ({\n      user: state.user ? { ...state.user, isFollowing: true } : null,\n    }))\n  },\n  unfollowUser: (userId: string) => {\n    set((state) => ({\n      user: state.user ? { ...state.user, isFollowing: false } : null,\n    }))\n  },\n}))',
  },
];
