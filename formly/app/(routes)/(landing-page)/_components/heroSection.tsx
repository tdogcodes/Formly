"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
  type FormEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  type Transition,
  type VariantLabels,
  type Target,
  type AnimationControls,
  type TargetAndTransition,
  type Variants,
} from "framer-motion";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  HeadingBlockComponent,
  ParagraphBlockComponent,
  RadioBlockComponent,
  StarRatingBlockComponent,
  TextAreaBlockComponent,
  TextFieldBlockComponent,
} from "./animatedBlocks";
import ShinyText from "./shinyText";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | AnimationControls | TargetAndTransition;
  exit?: Target | VariantLabels;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2200,
      staggerDuration = 0.01,
      staggerFrom = "last",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        try {
          const segmenter = new Intl.Segmenter("en", {
            granularity: "grapheme",
          });
          return Array.from(
            segmenter.segment(text),
            (segment) => segment.segment
          );
        } catch (error) {
          console.error(
            "Intl.Segmenter failed, falling back to simple split:",
            error
          );
          return text.split("");
        }
      }
      return text.split("");
    };

    const elements = useMemo(() => {
      const currentText: string = texts[currentTextIndex] ?? "";
      if (splitBy === "characters") {
        const words = currentText.split(/(\s+)/);
        let charCount = 0;
        return words
          .filter((part) => part.length > 0)
          .map((part) => {
            const isSpace = /^\s+$/.test(part);
            const chars = isSpace ? [part] : splitIntoCharacters(part);
            const startIndex = charCount;
            charCount += chars.length;
            return {
              characters: chars,
              isSpace: isSpace,
              startIndex: startIndex,
            };
          });
      }
      if (splitBy === "words") {
        return currentText
          .split(/(\s+)/)
          .filter((word) => word.length > 0)
          .map((word, i) => ({
            characters: [word],
            isSpace: /^\s+$/.test(word),
            startIndex: i,
          }));
      }
      if (splitBy === "lines") {
        return currentText.split("\n").map((line, i) => ({
          characters: [line],
          isSpace: false,
          startIndex: i,
        }));
      }
      return currentText.split(splitBy).map((part, i) => ({
        characters: [part],
        isSpace: false,
        startIndex: i,
      }));
    }, [texts, currentTextIndex, splitBy]);

    const totalElements = useMemo(
      () => elements.reduce((sum, el) => sum + el.characters.length, 0),
      [elements]
    );

    const getStaggerDelay = useCallback(
      (index: number, total: number): number => {
        if (total <= 1 || !staggerDuration) return 0;
        const stagger = staggerDuration;
        switch (staggerFrom) {
          case "first":
            return index * stagger;
          case "last":
            return (total - 1 - index) * stagger;
          case "center":
            const center = (total - 1) / 2;
            return Math.abs(center - index) * stagger;
          case "random":
            return Math.random() * (total - 1) * stagger;
          default:
            if (typeof staggerFrom === "number") {
              const fromIndex = Math.max(0, Math.min(staggerFrom, total - 1));
              return Math.abs(fromIndex - index) * stagger;
            }
            return index * stagger;
        }
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) handleIndexChange(0);
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      if (!auto || texts.length <= 1) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto, texts.length]);

    return (
      <motion.span
        className={cn(
          "inline-flex flex-wrap whitespace-pre-wrap relative align-bottom pb-[10px]",
          mainClassName
        )}
        {...rest}
        layout
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <motion.div
            key={currentTextIndex}
            className={cn(
              "inline-flex flex-wrap relative",
              splitBy === "lines"
                ? "flex-col items-start w-full"
                : "flex-row items-baseline"
            )}
            layout
            aria-hidden="true"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {elements.map((elementObj, elementIndex) => (
              <span
                key={elementIndex}
                className={cn(
                  "inline-flex",
                  splitBy === "lines" ? "w-full" : "",
                  splitLevelClassName
                )}
                style={{ whiteSpace: "pre" }}
              >
                {elementObj.characters.map((char, charIndex) => {
                  const globalIndex = elementObj.startIndex + charIndex;
                  return (
                    <motion.span
                      key={`${char}-${charIndex}`}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(globalIndex, totalElements),
                      }}
                      className={cn(
                        "inline-block leading-none tracking-tight",
                        elementLevelClassName
                      )}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);
RotatingText.displayName = "RotatingText";

interface Dot {
  x: number;
  y: number;
  baseColor: string;
  targetOpacity: number;
  currentOpacity: number;
  opacitySpeed: number;
  baseRadius: number;
  currentRadius: number;
}

const InteractiveHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const dotsRef = useRef<Dot[]>([]);
  const gridRef = useRef<Record<string, number[]>>({});
  const canvasSizeRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const mousePositionRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const DOT_SPACING = 25;
  const BASE_OPACITY_MIN = 0.4;
  const BASE_OPACITY_MAX = 0.5;
  const BASE_RADIUS = 1;
  const INTERACTION_RADIUS = 150;
  const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
  const OPACITY_BOOST = 0.6;
  const RADIUS_BOOST = 2.5;
  const GRID_CELL_SIZE = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5));

  const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      mousePositionRef.current = { x: null, y: null };
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    mousePositionRef.current = { x: canvasX, y: canvasY };
  }, []);

  const createDots = useCallback(() => {
    const { width, height } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;

    const newDots: Dot[] = [];
    const newGrid: Record<string, number[]> = {};
    const cols = Math.ceil(width / DOT_SPACING);
    const rows = Math.ceil(height / DOT_SPACING);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2;
        const y = j * DOT_SPACING + DOT_SPACING / 2;
        const cellX = Math.floor(x / GRID_CELL_SIZE);
        const cellY = Math.floor(y / GRID_CELL_SIZE);
        const cellKey = `${cellX}_${cellY}`;

        if (!newGrid[cellKey]) {
          newGrid[cellKey] = [];
        }

        const dotIndex = newDots.length;
        newGrid[cellKey].push(dotIndex);

        const baseOpacity =
          Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) +
          BASE_OPACITY_MIN;
        newDots.push({
          x,
          y,
          baseColor: `rgba(170, 120, 255, ${BASE_OPACITY_MAX})`,
          targetOpacity: baseOpacity,
          currentOpacity: baseOpacity,
          opacitySpeed: Math.random() * 0.005 + 0.002,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        });
      }
    }
    dotsRef.current = newDots;
    gridRef.current = newGrid;
  }, [
    DOT_SPACING,
    GRID_CELL_SIZE,
    BASE_OPACITY_MIN,
    BASE_OPACITY_MAX,
    BASE_RADIUS,
  ]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;

    if (
      canvas.width !== width ||
      canvas.height !== height ||
      canvasSizeRef.current.width !== width ||
      canvasSizeRef.current.height !== height
    ) {
      canvas.width = width;
      canvas.height = height;
      canvasSizeRef.current = { width, height };
      createDots();
    }
  }, [createDots]);

  const animateDots = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const dots = dotsRef.current;
    const grid = gridRef.current;
    const { width, height } = canvasSizeRef.current;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;

    if (!ctx || !dots || !grid || width === 0 || height === 0) {
      animationFrameId.current = requestAnimationFrame(animateDots);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const activeDotIndices = new Set<number>();
    if (mouseX !== null && mouseY !== null) {
      const mouseCellX = Math.floor(mouseX / GRID_CELL_SIZE);
      const mouseCellY = Math.floor(mouseY / GRID_CELL_SIZE);
      const searchRadius = Math.ceil(INTERACTION_RADIUS / GRID_CELL_SIZE);
      for (let i = -searchRadius; i <= searchRadius; i++) {
        for (let j = -searchRadius; j <= searchRadius; j++) {
          const checkCellX = mouseCellX + i;
          const checkCellY = mouseCellY + j;
          const cellKey = `${checkCellX}_${checkCellY}`;
          if (grid[cellKey]) {
            grid[cellKey].forEach((dotIndex) => activeDotIndices.add(dotIndex));
          }
        }
      }
    }

    dots.forEach((dot, index) => {
      dot.currentOpacity += dot.opacitySpeed;
      if (
        dot.currentOpacity >= dot.targetOpacity ||
        dot.currentOpacity <= BASE_OPACITY_MIN
      ) {
        dot.opacitySpeed = -dot.opacitySpeed;
        dot.currentOpacity = Math.max(
          BASE_OPACITY_MIN,
          Math.min(dot.currentOpacity, BASE_OPACITY_MAX)
        );
        dot.targetOpacity =
          Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) +
          BASE_OPACITY_MIN;
      }

      let interactionFactor = 0;
      dot.currentRadius = dot.baseRadius;

      if (mouseX !== null && mouseY !== null && activeDotIndices.has(index)) {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const distSq = dx * dx + dy * dy;

        if (distSq < INTERACTION_RADIUS_SQ) {
          const distance = Math.sqrt(distSq);
          interactionFactor = Math.max(0, 1 - distance / INTERACTION_RADIUS);
          interactionFactor = interactionFactor * interactionFactor;
        }
      }

      const finalOpacity = Math.min(
        1,
        dot.currentOpacity + interactionFactor * OPACITY_BOOST
      );
      dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

      const colorMatch = dot.baseColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
      );
      const r = colorMatch ? colorMatch[1] : "170";
      const g = colorMatch ? colorMatch[2] : "120";
      const b = colorMatch ? colorMatch[3] : "255";

      ctx.beginPath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animateDots);
  }, [
    GRID_CELL_SIZE,
    INTERACTION_RADIUS,
    INTERACTION_RADIUS_SQ,
    OPACITY_BOOST,
    RADIUS_BOOST,
    BASE_OPACITY_MIN,
    BASE_OPACITY_MAX,
    BASE_RADIUS,
  ]);

  useEffect(() => {
    handleResize();
    const canvasElement = canvasRef.current;
    const handleMouseLeave = () => {
      mousePositionRef.current = { x: null, y: null };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    animationFrameId.current = requestAnimationFrame(animateDots);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleResize, handleMouseMove, animateDots]);

  const contentDelay = 0.3;
  const itemDelayIncrement = 0.1;

  const bannerVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: contentDelay },
    },
  };
  const headlineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement },
    },
  };
  const subHeadlineVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: contentDelay + itemDelayIncrement * 2,
      },
    },
  };
  const formVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: contentDelay + itemDelayIncrement * 3,
      },
    },
  };
  const trialTextVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: contentDelay + itemDelayIncrement * 4,
      },
    },
  };
  const worksWithVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: contentDelay + itemDelayIncrement * 5,
      },
    },
  };
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: contentDelay + itemDelayIncrement * 6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="pt-[100px] relative text-gray-300 min-h-screen flex flex-col overflow-x-hidden">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-8 pb-16 relative z-10">
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <ShinyText
            text="Powered by Google Gemini ✨"
            className="bg-[#1a1a1a] border border-gray-700 text-[#aa78ff] px-4 py-1 rounded-full text-sm font-medium cursor-pointer hover:border-[#aa78ff]/50 transition-colors"
          />
        </motion.div>

        <motion.h1
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl sm:text-8xl text-white max-w-6xl mb-4"
        >
          Create and manage
          <br />{" "}
          <span className="inline-block h-[1.2em] sm:h-[1.2em] lg:h-[1.2em] overflow-hidden align-bottom">
            <RotatingText
              texts={["Forms", "Surveys", "Registrations", "Invoices", "Quizzes"]}
              mainClassName="text-[#aa78ff] mx-1"
              staggerFrom={"last"}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "110%", opacity: 0 }}
              staggerDuration={0.01}
              transition={{ type: "spring", damping: 18, stiffness: 250 }}
              rotationInterval={2200}
              splitBy="characters"
              auto={true}
              loop={true}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={subHeadlineVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Welcome to Formly, the easiest way to make & manage forms. Simply drag
          and drop blocks, or use AI to generate forms in seconds.
        </motion.p>

        <motion.section
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-row items-center justify-center w-full gap-3 max-w-auto mx-auto mb-3"
        >
          <RegisterLink>
            <motion.button
              className="w-full sm:w-auto bg-[#aa78ff] tracking-wide text-[#111111] px-5 py-2 rounded-md text-md font-semibold hover:bg-opacity-90 transition-colors duration-200 whitespace-nowrap shadow-sm hover:shadow-md flex-shrink-0"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              Sign up
            </motion.button>
          </RegisterLink>
          <LoginLink>
            <motion.button
              className="w-full sm:w-auto bg-[#985cff] tracking-wide text-white px-5 py-2 rounded-md text-md font-semibold hover:bg-opacity-90 transition-colors duration-200 whitespace-nowrap shadow-sm hover:shadow-md flex-shrink-0"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              Log in
            </motion.button>
          </LoginLink>
        </motion.section>

        <motion.p
          variants={trialTextVariants}
          initial="hidden"
          animate="visible"
          className="text-sm text-gray-500 mb-10"
        >
          Try for free today.
        </motion.p>
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-7xl justify-center px-4 sm:px-0 flex flex-col sm:flex-row"
        >
          <div className="hidden sm:flex flex-col gap-12 mx-8 items-center justify-center">
            <StarRatingBlockComponent />
            <ParagraphBlockComponent />
            <HeadingBlockComponent  />
          </div>

          <img
            src="/images/formlyai.PNG"
            alt="Product screen preview showing collaborative features"
            width={1024}
            height={640}
            className="w-full h-auto object-contain rounded-lg shadow-xl border border-gray-700/50"
            loading="lazy"
          />

          <div className="hidden sm:flex flex-col gap-12 mx-8 items-center justify-center">
            <RadioBlockComponent />
            <TextFieldBlockComponent  />
            <TextAreaBlockComponent  />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default InteractiveHero;
