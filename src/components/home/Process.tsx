// src/components/home/Process.tsx
import { useEffect, useRef, useState } from "react";
import { RiSparkling2Fill } from "react-icons/ri";
type Mode = "light" | "dark";

/* ---------------- Utilities ---------------- */
function useInView<T extends HTMLElement>(threshold = 0.12) {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) {
            setInView(true);
            return;
        }

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);
    return { ref, inView };
}

/* ---------------- Main Section ---------------- */
export default function Process({ mode = "dark" }: { mode?: Mode }) {
    const isDark = mode === "dark";
    const sectionBg = isDark ? "bg-green-600 text-gray-50" : "bg-gray-50 text-slate-900";
    const eyebrow = isDark ? "text-yellow-50" : "text-emerald-700";
    const subtext = isDark ? "text-gray-50/85" : "text-slate-600";

    return (
        <section id="process" className={`relative isolate w-full ${sectionBg}`}>
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <Header eyebrow={eyebrow} subtext={subtext} />
                <MaterialsPanel mode={mode} />

                {/* Step 1：左文右圖（底圖 50% 透明 + 疊圖），左右不重疊 */}
                <StepBlock
                    index={1}
                    title="Intake"
                    desc="Receive and register plastics from suppliers; verify material type, source, and condition."
                    mode={mode}
                    variant="overlay-right"
                    baseImg="/images/p/operation/truck2.png"   // 長形卡車圖
                    overlayImg="/images/p/operation/box.png"   // 透明背景 PNG 疊圖
                />

                {/* <ArrowBetween mode={mode} /> */}

                {/* Step 2：左圖右文（40:60） */}
                <StepBlock
                    index={2}
                    title="Storage"
                    desc="Stage and store by polymer/resin family with tracked batches for traceability."
                    mode={mode}
                    variant="image-left"
                    baseImg="/images/p/operation/L1310812.jpeg"
                />

                {/* <ArrowBetween mode={mode} /> */}

                {/* Step 3：右圖左文（40:60） */}
                <StepBlock
                    index={3}
                    title="Prepared for Grind"
                    desc="Pre-sorting, decontamination, and size reduction prep for consistent feedstock."
                    mode={mode}
                    variant="image-right"
                    baseImg="/images/p/operation/L1310777.jpeg"
                />

                {/* <ArrowBetween mode={mode} /> */}

                {/* Step 4：左右對調（左圖右文）且為兩張正方形拼接（40:60） */}
                <StepBlock
                    index={4}
                    title="Processing"
                    desc="Shredding, washing, and extrusion. Closed-loop water systems and in-line QC."
                    mode={mode}
                    variant="image-left-duo"
                    imgOne="/images/p/operation/L1310843.jpeg"
                    imgTwo="/images/p/operation/L1310855.jpeg"
                />

                {/* <ArrowBetween mode={mode} /> */}

                {/* Step 5：置中（上文下圖） */}
                <StepBlock
                    index={5}
                    title="Final Product"
                    desc="High-quality regrinds/pellets, tested in lab and delivered or reintroduced in closed-loop."
                    mode={mode}
                    variant="centered"
                    baseImg="/images/p/operation/L1310769.jpeg"
                />
            </div>

            {/* 少量工具樣式（無需外部 CSS 檔） */}
            <style>{`
        @keyframes bounce-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .animate-bounce-slow { animation: bounce-slow 1.6s ease-in-out infinite; }

        /* 讓圖片區左右貼齊螢幕（不受容器限制） */
        .full-bleed {
          width: 100vw;
          margin-left: 50%;
          transform: translateX(-50%);
        }
        /* 圖片裁切容器：不改變圖片比例，僅以容器裁切，最高 45vh */
        .img-crop {
          max-height: 45vh;
          height: 45vh;
          overflow: hidden;
        }
      `}</style>
        </section>
    );
}

/* ---------------- Subcomponents ---------------- */
function Header({ eyebrow, subtext }: { eyebrow: string; subtext: string }) {
    const { ref, inView } = useInView<HTMLElement>(0.08);
    return (
        <header
            ref={ref}
            className={[
                "max-w-3xl mx-auto text-center transform transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: inView ? "40ms" : "0ms" }}
        >
            <p className={`${eyebrow} text-sm uppercase tracking-[0.2em]`}>Process</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold">From Intake to Final Product</h2>
            <p className={`mt-3 ${subtext}`}>Scroll to follow each step of our plastics recycling workflow.</p>
        </header>
    );
}

/* ------- Step Block（40:60；文字與圖片不重合；修正溢出） ------- */
type StepVariant =
    | "overlay-right"      // 步1：左文右圖(底圖+疊圖)
    | "image-left"         // 步2：左圖右文
    | "image-right"        // 步3：右圖左文
    | "image-left-duo"     // 步4：左圖(兩正方形)右文
    | "centered";          // 步5：置中（上文下圖）

function StepBlock({
    index, title, desc, mode, variant,
    baseImg, overlayImg, imgOne, imgTwo,
}: {
    index: number;
    title: string;
    desc: string;
    mode: Mode;
    variant: StepVariant;
    baseImg?: string;
    overlayImg?: string;
    imgOne?: string;
    imgTwo?: string;
}) {
    const { ref, inView } = useInView<HTMLDivElement>(0.15);
    const isDark = mode === "dark";

    const chipCls = isDark
        ? "bg-yellow-50/20 text-yellow-50 ring-white/20"
        : "bg-emerald-600/10 text-emerald-700 ring-emerald-700/20";
    const titleCls = isDark ? "text-gray-50" : "text-slate-900";
    const descCls = isDark ? "text-gray-50/90" : "text-slate-600";

    const TextCard = (
        <article
            className={[
                "w-full px-6 md:px-8 py-6 md:py-10",
                "transform transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: inView ? "80ms" : "0ms" }}
        >
            {/* Step chip：步 1–4 左對齊；步 5（centered）置中，並在左側顯示 icon */}
            <div
                className={[
                    "flex items-center gap-2",
                    variant === "centered" ? "justify-center" : "justify-start",
                ].join(" ")}
            >
                {variant === "centered" && (
                    <RiSparkling2Fill className="h-5 w-5 text-yellow-50" />
                )}
                <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${chipCls}`}
                >
                    Step {index}
                </span>
            </div>

            <h3 className={`mt-4 text-2xl md:text-3xl font-semibold ${titleCls}`}>{title}</h3>
            <p className={`mt-3 leading-relaxed ${descCls}`}>{desc}</p>
        </article>
    );
    /* 單張圖片容器：不再使用 full-bleed，避免超欄；以容器裁切並包住 hover 放大 */
    const SingleImage = baseImg ? (
        <div
            className={[
                "img-crop overflow-hidden w-full",
                "transform transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: inView ? "140ms" : "0ms" }}
        >
            <img
                src={baseImg}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
        </div>
    ) : null;

    /* 兩張正方形拼接：同樣不使用 full-bleed */
    const DuoSquares = imgOne && imgTwo ? (
        <div
            className={[
                "img-crop overflow-hidden w-full",
                "transform transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: inView ? "140ms" : "0ms" }}
        >
            <div className="h-full w-full grid grid-cols-2 gap-0">
                <div className="h-full w-full">
                    <img
                        src={imgOne}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover aspect-square transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                </div>
                <div className="h-full w-full">
                    <img
                        src={imgTwo}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover aspect-square transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                </div>
            </div>
        </div>
    ) : null;

    /* 疊圖（步1）：容器不使用 full-bleed，留在欄位內；底圖 50% 透明 */
    const OverlayRight = baseImg ? (
        <div
            className={[
                "img-crop overflow-hidden w-full relative",
                "transform transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: inView ? "140ms" : "0ms" }}
        >
            <img
                src={baseImg}
                alt=""
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-500 ease-in-out hover:scale-105"
            />
            {overlayImg && (
                <img
                    src={overlayImg}
                    alt=""
                    loading="eager"
                    className="relative h-full w-full object-contain transition-transform duration-500 ease-in-out hover:scale-105"
                />
            )}
        </div>
    ) : null;

    /* 40:60 full-bleed 在「整列」上，內層不再使用 full-bleed */
    const Row = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
        <div ref={ref} className="mt-12 md:mt-16">
            {/* <div className="full-bleed grid grid-cols-10 items-stretch">
                <div className="col-span-10 md:col-span-4 flex items-center">{left}</div>
                <div className="col-span-10 md:col-span-6">{right}</div>
            </div> */}
            <div className="full-bleed grid grid-cols-10 items-stretch">
                <div className="col-span-10 md:col-span-3 flex items-center">{left}</div>
                <div className="col-span-10 md:col-span-7">{right}</div>
            </div>
        </div>
    );

    if (variant === "centered") {
        return (
            <div ref={ref} className="mt-12 md:mt-16">
                <div className="max-w-5xl mx-auto text-center">{TextCard}</div>
                <div className="mt-2">{SingleImage}</div>
            </div>
        );
    }

    if (variant === "overlay-right") return <Row left={TextCard} right={OverlayRight} />;
    if (variant === "image-left") {
        return (
            <div ref={ref} className="mt-12 md:mt-16">
                <div className="full-bleed grid grid-cols-10 items-stretch">
                    <div className="col-span-10 md:col-span-6">{SingleImage}</div>
                    <div className="col-span-10 md:col-span-4 flex items-center">{TextCard}</div>
                </div>
            </div>
        );
    }
    if (variant === "image-right") return <Row left={TextCard} right={SingleImage} />;
    if (variant === "image-left-duo") {
        return (
            <div ref={ref} className="mt-12 md:mt-16">
                <div className="full-bleed grid grid-cols-10 items-stretch">
                    <div className="col-span-10 md:col-span-6">{DuoSquares}</div>
                    <div className="col-span-10 md:col-span-4 flex items-center">{TextCard}</div>
                </div>
            </div>
        );
    }
    return null;
}

function ArrowBetween({ mode }: { mode: Mode }) {
    const color = mode === "dark" ? "text-yellow-50" : "text-emerald-700";
    return (
        <div className="col-span-full flex justify-center my-6 md:my-10">
            <svg
                className={`h-8 w-8 ${color} animate-bounce-slow`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
            </svg>
        </div>
    );
}

function MaterialsPanel({ mode }: { mode: Mode }) {
    const isDark = mode === "dark";
    const wrap = isDark ? "bg-white/90" : "bg-white";
    const title = isDark ? "text-green-600" : "text-emerald-700";
    const text = isDark ? "text-green-600/90" : "text-slate-700";
    const { ref, inView } = useInView<HTMLDivElement>(0.1);

    return (
        <div
            ref={ref}
            className={[
                "mt-10 transform transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: inView ? "120ms" : "0ms" }}
        >
            <div className={`rounded-2xl ${wrap} backdrop-blur-sm shadow-md p-6 md:p-8`}>
                <h4 className={`text-2xl md:text-3xl font-semibold ${title}`}>The materials we can process</h4>
                <ul className={`mt-4 space-y-2 text-lg leading-relaxed ${text}`}>
                    <li className="list-disc ml-5">Post-industrial plastics (HDPE, LDPE, PP, PS, PET, ABS, PC, Nylon)</li>
                    <li className="list-disc ml-5">Select post-consumer rigid plastics</li>
                    <li className="list-disc ml-5">Polymer-family mixed streams after pre-sort</li>
                    <li className="list-disc ml-5">Film and regrind suitable for wash/line intake</li>
                </ul>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl overflow-hidden">
                        <img
                            src="/images/p/operation/IMG_9081.jpeg"
                            alt=""
                            className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-500 ease-in-out hover:scale-105"
                        />
                    </div>
                    <div className="rounded-xl overflow-hidden">
                        <img
                            src="/images/p/operation/IMG_9082.jpeg"
                            alt=""
                            className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-500 ease-in-out hover:scale-105"
                        />
                    </div>
                    <div className="rounded-xl overflow-hidden">
                        <img
                            src="/images/p/operation/IMG_9083.jpeg"
                            alt=""
                            className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-500 ease-in-out hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


function SwooshDecor({ mode }: { mode: Mode }) {
    const isDark = mode === "dark";
    // 使用 currentColor 當作填色；改這裡就能換色
    const colorClass = isDark ? "text-yellow-50" : "text-emerald-700";

    return (
        <div className={`pointer-events-none absolute inset-0 ${colorClass}`} aria-hidden>
            {/* 左上 */}
            <span
                className="absolute block h-6 w-10 bg-current opacity-90
                   [clip-path:polygon(8%_60%,88%_10%,100%_100%)] rounded-[12px]"
                style={{ top: "-10px", left: "-6px", transform: "rotate(-28deg)" }}
            />
            {/* 正上（置中） */}
            <span
                className="absolute block h-7 w-12 bg-current opacity-90
                   [clip-path:polygon(10%_65%,90%_0%,100%_100%)] rounded-[14px]"
                style={{ top: "-16px", left: "50%", transform: "translateX(-50%) rotate(0deg)" }}
            />
            {/* 右上 */}
            <span
                className="absolute block h-6 w-10 bg-current opacity-90
                   [clip-path:polygon(8%_10%,92%_60%,0%_100%)] rounded-[12px]"
                style={{ top: "-10px", right: "-6px", transform: "rotate(28deg)" }}
            />
        </div>
    );
}