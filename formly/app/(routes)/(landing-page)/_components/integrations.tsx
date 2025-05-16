import geminiLogo from "@/public/icons/gemini.svg";
import postgresLogo from "@/public/icons/postgres.svg";
import nextLogo from "@/public/icons/next.svg";
import zodLogo from "@/public/icons/zod.svg";
import tailwindLogo from "@/public/icons/tailwind.svg";
import framerLogo from "@/public/icons/framer.png";
import prismaLogo from "@/public/icons/prisma.svg";
import IntegrationsColumn from "./integrationsColumn";
import typescriptLogo from "@/public/icons/typescript.svg";
import ShinyText from "./shinyText";
import { motion } from "framer-motion";

const integrations = [
    {
        name: "Postgres SQL",
        icon: postgresLogo,
        description: "Figma is a collaborative interface design tool.",
    },
    {
        name: "Prisma",
        icon: prismaLogo,
        description: "Notion is an all-in-one workspace for notes and docs.",
    },
    {
        name: "Gemini",
        icon: geminiLogo,
        description: "Slack is a powerful team communication platform.",
    },
    {
        name: "Typescript",
        icon: typescriptLogo,
        description: "Slack is a powerful team communication platform.",
    },
    {
        name: "Tailwind",
        icon: tailwindLogo,
        description: "Relume is a no-code website builder and design system.",
    },
    {
        name: "Zod",
        icon: zodLogo,
        description: "Relume is a no-code website builder and design system.",
    },
    {
        name: "Framer Motion",
        icon: framerLogo,
        description: "Framer is a professional website prototyping tool.",
    },
    {
        name: "Next.js",
        icon: nextLogo,
        description: "The most popular React framework.",
    },
];

export type IntegrationsType = typeof integrations;

export default function Integrations() {
    return (
        <section className="py-24 overflow-none" id="integrations">
            <div className="container">
                <div className="grid lg:grid-cols-2 items-center lg:gap-16">
                    <div>
                        <ShinyText 
                           text="Formly is open source"
                            className="bg-[#1a1a1a] flex items-center justify-center gap-2 w-fit border border-gray-700 text-[#aa78ff]
                             px-4 py-1 rounded-full text-sm font-medium cursor-pointer
                              hover:border-[#aa78ff]/50 transition-colors"
                              image="/icons/github.svg"
                        />
                        <h2 className="text-6xl font-medium mt-6">
                            Made with the latest{" "}
                            <span className="text-[#aa78ff]">technology</span>
                        </h2>
                        <p className="text-white/50 mt-4 text-xl">
                           Formly leverages the latest tech to deliver a seamless<br/> user experience, while remaining scalable for future growth.
                        </p>
                            <a
                                href="https://github.com/tdogcodes/Formly"
                                target={"_blank" + "_self"}
                                rel={"noopener noreferrer" + undefined}
                            >
                                <motion.button
                                 className="mt-6 w-fit bg-[#aa78ff] tracking-wide text-[#111111] px-5 py-2 rounded-md text-md font-semibold
                                 hover:bg-opacity-90 transition-colors duration-200 whitespace-nowrap shadow-sm hover:shadow-md flex-shrink-0"
                                    whileHover={{ scale: 1.03, y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                                    View on Github
                                </motion.button>
                            </a>
                    </div>
                    <div>
                        <div
                            className="h-[400px] lg:h-[800px] lg:mt-0 overflow-hidden mt-8 grid md:grid-cols-2 gap-4"
                            style={{
                                maskImage:
                                    "linear-gradient(to top, transparent, black 10%, black 90%, transparent)",
                            }}
                        >
                            <IntegrationsColumn
                                integrations={integrations}
                                reverse={true}
                            />
                            <IntegrationsColumn
                                integrations={integrations.slice().reverse()}
                                className="hidden md:flex"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
