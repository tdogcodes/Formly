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
        description: "Open-source relational database with strong reliability and features.",
    },
    {
        name: "Prisma",
        icon: prismaLogo,
        description: "Type-safe ORM for working with databases in Node.js and TypeScript.",
    },
    {
        name: "Gemini",
        icon: geminiLogo,
        description: "AI model developed by Google, integrated into Formly's editor.",
    },
    {
        name: "Typescript",
        icon: typescriptLogo,
        description: "Superset of JavaScript that adds static typing.",
    },
    {
        name: "Tailwind",
        icon: tailwindLogo,
        description: "Utility-first CSS framework for rapid UI development.",
    },
    {
        name: "Zod",
        icon: zodLogo,
        description: "Schema-based validation library focused on TypeScript.",
    },
    {
        name: "Framer Motion",
        icon: framerLogo,
        description: "Animation library for smooth, declarative motion in React.",
    },
    {
        name: "Next.js",
        icon: nextLogo,
        description: "React framework for building fast, server-rendered apps.",
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
                                target={"_blank"}
                                rel={"noopener noreferrer"}
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
