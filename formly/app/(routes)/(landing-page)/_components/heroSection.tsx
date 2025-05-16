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
} from 'react';
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
    type Transition,
    type VariantLabels,
    type Target,
    type AnimationControls,
    type TargetAndTransition,
    type Variants,
} from 'framer-motion';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';

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
           const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
           return Array.from(segmenter.segment(text), (segment) => segment.segment);
        } catch (error) {
           console.error("Intl.Segmenter failed, falling back to simple split:", error);
           return text.split('');
        }
      }
      return text.split('');
    };

    const elements = useMemo(() => {
        const currentText: string = texts[currentTextIndex] ?? '';
        if (splitBy === "characters") {
            const words = currentText.split(/(\s+)/);
            let charCount = 0;
            return words.filter(part => part.length > 0).map((part) => {
                const isSpace = /^\s+$/.test(part);
                const chars = isSpace ? [part] : splitIntoCharacters(part);
                const startIndex = charCount;
                charCount += chars.length;
                return { characters: chars, isSpace: isSpace, startIndex: startIndex };
            });
        }
        if (splitBy === "words") {
            return currentText.split(/(\s+)/).filter(word => word.length > 0).map((word, i) => ({
                characters: [word], isSpace: /^\s+$/.test(word), startIndex: i
            }));
        }
        if (splitBy === "lines") {
            return currentText.split('\n').map((line, i) => ({
                characters: [line], isSpace: false, startIndex: i
            }));
        }
        return currentText.split(splitBy).map((part, i) => ({
            characters: [part], isSpace: false, startIndex: i
        }));
    }, [texts, currentTextIndex, splitBy]);

    const totalElements = useMemo(() => elements.reduce((sum, el) => sum + el.characters.length, 0), [elements]);

    const getStaggerDelay = useCallback(
      (index: number, total: number): number => {
        if (total <= 1 || !staggerDuration) return 0;
        const stagger = staggerDuration;
        switch (staggerFrom) {
          case "first": return index * stagger;
          case "last": return (total - 1 - index) * stagger;
          case "center":
            const center = (total - 1) / 2;
            return Math.abs(center - index) * stagger;
          case "random": return Math.random() * (total - 1) * stagger;
          default:
            if (typeof staggerFrom === 'number') {
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
      const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
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

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

    useEffect(() => {
      if (!auto || texts.length <= 1) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto, texts.length]);

    return (
      <motion.span
        className={cn("inline-flex flex-wrap whitespace-pre-wrap relative align-bottom pb-[10px]", mainClassName)}
        {...rest}
        layout
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.div
            key={currentTextIndex}
            className={cn(
               "inline-flex flex-wrap relative",
               splitBy === "lines" ? "flex-col items-start w-full" : "flex-row items-baseline"
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
                    className={cn("inline-flex", splitBy === 'lines' ? 'w-full' : '', splitLevelClassName)}
                    style={{ whiteSpace: 'pre' }}
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
                                className={cn("inline-block leading-none tracking-tight", elementLevelClassName)}
                            >
                                {char === ' ' ? '\u00A0' : char}
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

const ShinyText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => (
    <span className={cn("relative overflow-hidden inline-block", className)}>
        {text}
        <span style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            animation: 'shine 2s infinite linear',
            opacity: 0.5,
            pointerEvents: 'none'
        }}></span>
        <style>{`
            @keyframes shine {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
    </span>
);

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

   const { scrollY } = useScroll();
   useMotionValueEvent(scrollY, "change", (latest) => {
       setIsScrolled(latest > 10);
   });

   const dotsRef = useRef<Dot[]>([]);
   const gridRef = useRef<Record<string, number[]>>({});
   const canvasSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
   const mousePositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

   const DOT_SPACING = 25;
   const BASE_OPACITY_MIN = 0.40;
   const BASE_OPACITY_MAX = 0.50;
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

               const baseOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
               newDots.push({
                   x,
                   y,
                   baseColor: `rgba(170, 120, 255, ${BASE_OPACITY_MAX})`,
                   targetOpacity: baseOpacity,
                   currentOpacity: baseOpacity,
                   opacitySpeed: (Math.random() * 0.005) + 0.002,
                   baseRadius: BASE_RADIUS,
                   currentRadius: BASE_RADIUS,
               });
           }
       }
       dotsRef.current = newDots;
       gridRef.current = newGrid;
   }, [DOT_SPACING, GRID_CELL_SIZE, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS]);

   const handleResize = useCallback(() => {
       const canvas = canvasRef.current;
       if (!canvas) return;
       const container = canvas.parentElement;
       const width = container ? container.clientWidth : window.innerWidth;
       const height = container ? container.clientHeight : window.innerHeight;

       if (canvas.width !== width || canvas.height !== height ||
           canvasSizeRef.current.width !== width || canvasSizeRef.current.height !== height)
       {
           canvas.width = width;
           canvas.height = height;
           canvasSizeRef.current = { width, height };
           createDots();
       }
   }, [createDots]);

   const animateDots = useCallback(() => {
       const canvas = canvasRef.current;
       const ctx = canvas?.getContext('2d');
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
                       grid[cellKey].forEach(dotIndex => activeDotIndices.add(dotIndex));
                   }
               }
           }
       }

       dots.forEach((dot, index) => {
           dot.currentOpacity += dot.opacitySpeed;
           if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= BASE_OPACITY_MIN) {
               dot.opacitySpeed = -dot.opacitySpeed;
               dot.currentOpacity = Math.max(BASE_OPACITY_MIN, Math.min(dot.currentOpacity, BASE_OPACITY_MAX));
               dot.targetOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
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

           const finalOpacity = Math.min(1, dot.currentOpacity + interactionFactor * OPACITY_BOOST);
           dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

           const colorMatch = dot.baseColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
           const r = colorMatch ? colorMatch[1] : '170';
           const g = colorMatch ? colorMatch[2] : '120';
           const b = colorMatch ? colorMatch[3] : '255';

           ctx.beginPath();
           ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity.toFixed(3)})`;
           ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
           ctx.fill();
       });

       animationFrameId.current = requestAnimationFrame(animateDots);
   }, [GRID_CELL_SIZE, INTERACTION_RADIUS, INTERACTION_RADIUS_SQ, OPACITY_BOOST, RADIUS_BOOST, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS]);

   useEffect(() => {
       handleResize();
       const canvasElement = canvasRef.current;
        const handleMouseLeave = () => {
            mousePositionRef.current = { x: null, y: null };
        };

       window.addEventListener('mousemove', handleMouseMove, { passive: true });
       window.addEventListener('resize', handleResize);
       document.documentElement.addEventListener('mouseleave', handleMouseLeave);


       animationFrameId.current = requestAnimationFrame(animateDots);

       return () => {
           window.removeEventListener('resize', handleResize);
           window.removeEventListener('mousemove', handleMouseMove);
           document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
           if (animationFrameId.current) {
               cancelAnimationFrame(animationFrameId.current);
           }
       };
   }, [handleResize, handleMouseMove, animateDots])
   
    const contentDelay = 0.3;
    const itemDelayIncrement = 0.1;

    const bannerVariants: Variants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: contentDelay } }
    };
   const headlineVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement } }
    };
    const subHeadlineVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 2 } }
    };
    const formVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 3 } }
    };
    const trialTextVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 4 } }
    };
    const worksWithVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 5 } }
    };
    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, delay: contentDelay + itemDelayIncrement * 6, ease: [0.16, 1, 0.3, 1] } }
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
                <ShinyText text="Announcing our $15M Series A" className="bg-[#1a1a1a] border border-gray-700 text-[#aa78ff] px-4 py-1 rounded-full text-xs sm:text-sm font-medium cursor-pointer hover:border-[#aa78ff]/50 transition-colors" />
            </motion.div>

            <motion.h1
                variants={headlineVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl lg:text-[64px] font-semibold text-white leading-tight max-w-4xl mb-4"
            >
                Create and manage<br />{' '}
                <span className="inline-block h-[1.2em] sm:h-[1.2em] lg:h-[1.2em] overflow-hidden align-bottom">
                    <RotatingText
                        texts={['Forms', 'Surveys', 'Registrations', 'Orders', 'Quizzes']}
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
                className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
            >
               Welcome to Formly, the easiest way to make & manage forms. Simply drag and drop blocks, or use AI to generate forms in seconds.
            </motion.p>

            <motion.section
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full max-w-md mx-auto mb-3"
            >
                <RegisterLink>
                    <motion.button
                        className="w-full sm:w-auto bg-[#aa78ff] text-[#111111] px-5 py-2 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-colors duration-200 whitespace-nowrap shadow-sm hover:shadow-md flex-shrink-0"
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                        Sign up
                    </motion.button>
                </RegisterLink>
                <LoginLink>
                    <motion.button
                            className="w-full sm:w-auto bg-[#985cff] text-[#111111] px-5 py-2 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-colors duration-200 whitespace-nowrap shadow-sm hover:shadow-md flex-shrink-0"
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
                className="text-xs text-gray-500 mb-10"
            >
                Try for free today.
            </motion.p>

            <motion.div
                variants={worksWithVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center space-y-2 mb-10"
            >
                <span className="text-xs uppercase text-gray-500 tracking-wider font-medium">Works with</span>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-gray-400">
                    <span className="flex items-center whitespace-nowrap">Slack  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.52118 7.58241C2.52118 8.27634 1.9544 8.8432 1.26059 8.8432C0.566777 8.8432 0 8.27634 0 7.58241C0 6.88849 0.566777 6.32162 1.26059 6.32162H2.52118V7.58241Z" fill="#E21E5B"></path><path d="M3.15625 7.5825C3.15625 6.88858 3.72303 6.32172 4.41684 6.32172C5.11065 6.32172 5.67743 6.88858 5.67743 7.5825V10.7394C5.67743 11.4333 5.11065 12.0002 4.41684 12.0002C3.72303 12.0002 3.15625 11.4333 3.15625 10.7394V7.5825Z" fill="#E21E5B"></path><path d="M4.41684 2.52164C3.72303 2.52164 3.15625 1.95477 3.15625 1.26085C3.15625 0.566928 3.72303 6.10352e-05 4.41684 6.10352e-05C5.11065 6.10352e-05 5.67743 0.566928 5.67743 1.26085V2.52164H4.41684Z" fill="#36C6F0"></path><path d="M4.41695 3.15518C5.11076 3.15518 5.67754 3.72205 5.67754 4.41597C5.67754 5.10989 5.11076 5.67676 4.41695 5.67676H1.26059C0.566777 5.67676 0 5.10989 0 4.41597C0 3.72205 0.566777 3.15518 1.26059 3.15518H4.41695Z" fill="#36C6F0"></path><path d="M9.48047 4.41719C9.48047 3.72327 10.0472 3.1564 10.7411 3.1564C11.4349 3.1564 12.0016 3.72327 12.0016 4.41719C12.0016 5.11111 11.4349 5.67798 10.7411 5.67798H9.48047V4.41719Z" fill="#2EB77D"></path><path d="M8.8454 4.41765C8.8454 5.11157 8.27862 5.67844 7.58481 5.67844C6.89099 5.67844 6.32422 5.11157 6.32422 4.41765V1.26079C6.32422 0.566867 6.89099 0 7.58481 0C8.27862 0 8.8454 0.566867 8.8454 1.26079V4.41765Z" fill="#2EB77D"></path><path d="M7.58481 9.47812C8.27862 9.47812 8.8454 10.045 8.8454 10.7389C8.8454 11.4328 8.27862 11.9997 7.58481 11.9997C6.89099 11.9997 6.32422 11.4328 6.32422 10.7389V9.47812H7.58481Z" fill="#ECB22D"></path><path d="M7.58481 8.8432C6.89099 8.8432 6.32422 8.27634 6.32422 7.58241C6.32422 6.88849 6.89099 6.32162 7.58481 6.32162H10.7412C11.435 6.32162 12.0018 6.88849 12.0018 7.58241C12.0018 8.27634 11.435 8.8432 10.7412 8.8432H7.58481Z" fill="#ECB22D"></path></svg></span>
                    <span className="flex items-center whitespace-nowrap">Teams  <svg width="14" height="13" viewBox="0 0 14 13" fill="none"><g clipPath="url(#clip0_2019_82286)"><path d="M9.66723 4.70923H13.1543C13.4838 4.70923 13.7508 4.97629 13.7508 5.30574V8.48201C13.7508 9.6928 12.7693 10.6743 11.5585 10.6743H11.5481C10.3373 10.6745 9.35564 9.69311 9.35547 8.48232C9.35547 8.48221 9.35547 8.48211 9.35547 8.482V5.02099C9.35547 4.84881 9.49505 4.70923 9.66723 4.70923Z" fill="#5059C9"></path><path d="M12.0222 4.08135C12.8024 4.08135 13.435 3.44882 13.435 2.66856C13.435 1.8883 12.8024 1.25577 12.0222 1.25577C11.2419 1.25577 10.6094 1.8883 10.6094 2.66856C10.6094 3.44882 11.2419 4.08135 12.0222 4.08135Z" fill="#5059C9"></path><path d="M7.62664 4.08134C8.75368 4.08134 9.66734 3.16769 9.66734 2.04064C9.66734 0.913591 8.75368 -6.10352e-05 7.62664 -6.10352e-05C6.49959 -6.10352e-05 5.58594 0.913591 5.58594 2.04064C5.58594 3.16769 6.49959 4.08134 7.62664 4.08134Z" fill="#7B83EB"></path><path d="M10.3481 4.70923H4.59208C4.26656 4.71728 4.00905 4.98743 4.0166 5.31296V8.93568C3.97114 10.8892 5.51666 12.5103 7.47009 12.5581C9.42353 12.5103 10.969 10.8892 10.9236 8.93568V5.31296C10.9311 4.98743 10.6736 4.71728 10.3481 4.70923Z" fill="#7B83EB"></path><path opacity="0.1" d="M7.78323 4.70923V9.78586C7.78167 10.0187 7.6406 10.2278 7.42533 10.3164C7.35679 10.3454 7.28312 10.3604 7.2087 10.3604H4.29207C4.25126 10.2568 4.21358 10.1532 4.18218 10.0464C4.07229 9.68619 4.01621 9.31169 4.01579 8.93504V5.31202C4.00824 4.98701 4.26532 4.71728 4.59032 4.70923H7.78323Z" fill="black"></path><path opacity="0.2" d="M7.46928 4.70923V10.0998C7.46927 10.1742 7.45432 10.2479 7.42533 10.3164C7.33669 10.5317 7.12755 10.6728 6.89475 10.6743H4.43963C4.38626 10.5707 4.33603 10.4671 4.29207 10.3604C4.24811 10.2536 4.21358 10.1532 4.18218 10.0464C4.07229 9.6862 4.01621 9.31169 4.01579 8.93504V5.31202C4.00824 4.98701 4.26532 4.71728 4.59032 4.70923H7.46928Z" fill="black"></path><path opacity="0.2" d="M7.46928 4.70923V9.47191C7.46688 9.78822 7.21106 10.044 6.89474 10.0464H4.18218C4.07229 9.68619 4.01621 9.31169 4.01579 8.93504V5.31202C4.00824 4.98701 4.26532 4.71728 4.59032 4.70923H7.46928Z" fill="black"></path><path opacity="0.2" d="M7.15532 4.70923V9.47191C7.15293 9.78822 6.8971 10.044 6.58079 10.0464H4.18218C4.07229 9.68619 4.01621 9.31169 4.01579 8.93504V5.31202C4.00824 4.98701 4.26532 4.71728 4.59032 4.70923H7.15532Z" fill="black"></path><path opacity="0.1" d="M7.7857 3.0861V4.07505C7.73232 4.07819 7.68209 4.08133 7.62872 4.08133C7.57535 4.08133 7.52512 4.07819 7.47174 4.07505C7.36577 4.06802 7.26067 4.0512 7.15779 4.02482C6.52203 3.87426 5.99679 3.42839 5.745 2.82552C5.70167 2.72428 5.66804 2.61915 5.64453 2.51157H7.21116C7.52797 2.51277 7.78449 2.76928 7.7857 3.0861Z" fill="black"></path><path opacity="0.2" d="M7.46893 3.40006V4.07506C7.36296 4.06803 7.25786 4.05122 7.15498 4.02483C6.51922 3.87427 5.99398 3.42841 5.74219 2.82553H6.8944C7.2112 2.82673 7.46772 3.08326 7.46893 3.40006Z" fill="black"></path><path opacity="0.2" d="M7.46893 3.40006V4.07506C7.36296 4.06803 7.25786 4.05122 7.15498 4.02483C6.51922 3.87427 5.99398 3.42841 5.74219 2.82553H6.8944C7.2112 2.82673 7.46772 3.08326 7.46893 3.40006Z" fill="black"></path><path opacity="0.2" d="M7.15498 3.40007V4.02483C6.51922 3.87427 5.99398 3.42841 5.74219 2.82553H6.58044C6.89725 2.82674 7.15377 3.08326 7.15498 3.40007Z" fill="black"></path><path d="M0.825474 2.82553H6.5815C6.89932 2.82553 7.15697 3.08318 7.15697 3.401V9.15703C7.15697 9.47485 6.89932 9.7325 6.5815 9.7325H0.825474C0.507646 9.7325 0.25 9.47485 0.25 9.15703V3.401C0.25 3.08318 0.507652 2.82553 0.825474 2.82553Z" fill="url(#paint0_linear_2019_82286)"></path><path d="M5.21652 5.01629H4.06588V8.14955H3.3328V5.01629H2.1875V4.40848H5.21652V5.01629Z" fill="white"></path></g><defs><linearGradient id="paint0_linear_2019_82286" x1="1.44988" y1="2.37586" x2="5.9571" y2="10.1822" gradientUnits="userSpaceOnUse"><stop stopColor="#5A62C3"></stop><stop offset="0.5" stopColor="#4D55BD"></stop><stop offset="1" stopColor="#3940AB"></stop></linearGradient><clipPath id="clip0_2019_82286"><rect width="13.5" height="12.5581" fill="white" transform="translate(0.25 -6.10352e-05)"></rect></clipPath></defs></svg></span>
                    <span className="flex items-center whitespace-nowrap">Discord  <svg width="14" height="12" viewBox="0 0 14 12" fill="none"><path d="M11.6783 1.68101C10.8179 1.28619 9.89518 0.995304 8.93044 0.828702C8.91287 0.825486 8.89532 0.833522 8.88627 0.849593C8.76761 1.06066 8.63616 1.33601 8.54411 1.55243C7.50648 1.39708 6.47417 1.39708 5.45781 1.55243C5.36574 1.3312 5.22952 1.06066 5.11032 0.849593C5.10127 0.834058 5.08372 0.826023 5.06615 0.828702C4.10195 0.994772 3.17925 1.28566 2.31828 1.68101C2.31082 1.68422 2.30443 1.68959 2.30019 1.69655C0.550033 4.31133 0.0705905 6.86184 0.305789 9.38073C0.306853 9.39305 0.313771 9.40484 0.323349 9.41233C1.47805 10.2603 2.59659 10.7752 3.69434 11.1164C3.71191 11.1218 3.73053 11.1153 3.74171 11.1009C4.00138 10.7462 4.23286 10.3723 4.43133 9.9791C4.44304 9.95607 4.43186 9.92875 4.40792 9.91964C4.04076 9.78036 3.69115 9.61054 3.35485 9.41769C3.32825 9.40216 3.32612 9.36411 3.35059 9.34589C3.42136 9.29286 3.49215 9.23768 3.55972 9.18197C3.57195 9.17179 3.58899 9.16965 3.60336 9.17607C5.81272 10.1848 8.20462 10.1848 10.3879 9.17607C10.4023 9.16911 10.4193 9.17126 10.4321 9.18143C10.4997 9.23715 10.5704 9.29286 10.6417 9.34589C10.6662 9.36411 10.6646 9.40216 10.638 9.41769C10.3017 9.61428 9.95211 9.78036 9.58441 9.91911C9.56047 9.92822 9.54983 9.95607 9.56154 9.9791C9.76427 10.3718 9.99574 10.7457 10.2506 11.1003C10.2613 11.1153 10.2804 11.1218 10.298 11.1164C11.4011 10.7752 12.5196 10.2603 13.6743 9.41233C13.6844 9.40484 13.6908 9.39358 13.6919 9.38126C13.9734 6.46915 13.2204 3.93955 11.6959 1.69708C11.6921 1.68959 11.6858 1.68422 11.6783 1.68101ZM4.76126 7.84699C4.09609 7.84699 3.54801 7.23629 3.54801 6.4863C3.54801 5.7363 4.08546 5.12561 4.76126 5.12561C5.44237 5.12561 5.98514 5.74167 5.97449 6.4863C5.97449 7.23629 5.43704 7.84699 4.76126 7.84699ZM9.24705 7.84699C8.58189 7.84699 8.03381 7.23629 8.03381 6.4863C8.03381 5.7363 8.57125 5.12561 9.24705 5.12561C9.92817 5.12561 10.4709 5.74167 10.4603 6.4863C10.4603 7.23629 9.92817 7.84699 9.24705 7.84699Z" fill="#5865F2"></path></svg></span>
                    <span className="flex items-center whitespace-nowrap">Email  <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M0.5 7.00012C0.5 6.58591 0.835786 6.25012 1.25 6.25012H5.3C5.55076 6.25012 5.78494 6.37545 5.92404 6.5841L7.05139 8.27512H8.94861L10.076 6.5841C10.2151 6.37545 10.4492 6.25012 10.7 6.25012H14.75C15.1642 6.25012 15.5 6.58591 15.5 7.00012C15.5 7.41434 15.1642 7.75012 14.75 7.75012H11.1014L9.97404 9.44115C9.83494 9.6498 9.60076 9.77512 9.35 9.77512H6.65C6.39923 9.77512 6.16506 9.6498 6.02596 9.44115L4.89861 7.75012H1.25C0.835786 7.75012 0.5 7.41434 0.5 7.00012Z" fill="#9898A9"></path><path fillRule="evenodd" clipRule="evenodd" d="M4.787 0.849976L11.213 0.849976C11.6037 0.850183 11.987 0.959373 12.319 1.16527C12.6506 1.37092 12.9184 1.66491 13.0923 2.01424C13.0925 2.01465 13.0927 2.01506 13.0929 2.01548L15.4206 6.66418C15.4728 6.76842 15.5 6.88354 15.5 7.00012V11.05C15.5 11.6069 15.2787 12.1411 14.8849 12.5349C14.4911 12.9287 13.957 13.15 13.4 13.15H2.6C2.04304 13.15 1.5089 12.9287 1.11508 12.5349C0.721249 12.1411 0.5 11.6069 0.5 11.05V7.00012C0.5 6.88354 0.527177 6.76842 0.579374 6.66418L2.9071 2.01548C2.90728 2.01511 2.90747 2.01474 2.90765 2.01437C3.08152 1.66498 3.34932 1.37095 3.681 1.16527C4.01303 0.959373 4.39631 0.850183 4.787 0.849976ZM4.78726 2.34998C4.67568 2.35006 4.56634 2.38126 4.47151 2.44006C4.37665 2.49889 4.30007 2.58301 4.2504 2.68298L4.24938 2.68503L2 7.17726V11.05C2 11.2091 2.06321 11.3617 2.17574 11.4742C2.28826 11.5868 2.44087 11.65 2.6 11.65H13.4C13.5591 11.65 13.7117 11.5868 13.8243 11.4742C13.9368 11.3617 14 11.2091 14 11.05V7.17726L11.7506 2.68503L11.7496 2.68298C11.6999 2.58301 11.6234 2.49889 11.5285 2.44006C11.4337 2.38126 11.3243 2.35006 11.2127 2.34998H4.78726Z" fill="#9898A9"></path></svg></span>
                    <span className="flex items-center whitespace-nowrap">AND MORE</span>
                </div>
            </motion.div>

            <motion.div
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-4xl mx-auto px-4 sm:px-0"
            >
                <img
                    src="/formlyai.PNG"
                    alt="Product screen preview showing collaborative features"
                    width={1024}
                    height={640}
                    className="w-full h-auto object-contain rounded-lg shadow-xl border border-gray-700/50"
                    loading="lazy"
                />
            </motion.div>
        </main>

    </div>
  );
};

export default InteractiveHero;