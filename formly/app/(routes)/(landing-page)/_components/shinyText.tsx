import { cn } from "@/lib/utils";

const ShinyText: React.FC<{ text: string; className?: string, image?: string }> = ({
  text,
  className = "",
  image,
}) => (
  <span className={cn("relative overflow-hidden inline-block", className)}>
    {text}
    {image && <img src={image} alt="Shiny Text" className="w-5 h-5 object-cover" />}
    <span
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        animation: "shine 2s infinite linear",
        opacity: 0.5,
        pointerEvents: "none",
      }}
    ></span>
    <style>{`
            @keyframes shine {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
  </span>
);

export default ShinyText;