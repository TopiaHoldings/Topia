// src/components/subpage/ServiceDetail.tsx
import { useEffect, useRef, useState } from "react";
import Container from "../common/Container";

type Step = {
    id: string;
    title: string;
    desc: string;
    images: string[];
    materials?: string[];
};

const STEPS: Step[] = [
    {
        id: "intake",
        title: "Intake",
        desc:
            "We receive and register plastics from suppliers, verifying material type, source, and condition for traceability and quality control.",
        images: [
            "/images/p/operation/L1310788.jpeg",
            "/images/p/operation/L1310780.jpeg",
        ],
        materials: [
            "Post-industrial plastics (HDPE, LDPE, PP, PS, PET, ABS, PC, Nylon)",
            "Mixed streams by polymer family after pre-sort",
            "Film and regrind suitable for wash/line intake",
        ],
    },
    {
        id: "storage",
        title: "Storage",
        desc:
            "Staging by polymer/resin family with tracked batches. Inventory is organized to support consistent feedstock and closed-loop programs.",
        images: ["/images/p/operation/L1310812.jpeg", "/images/p/IMG_7315.jpeg"],
    },
    {
        id: "prep",
        title: "Prepared for Ground",
        desc:
            "Pre-sorting, decontamination, and size reduction steps prepare materials for steady throughput and reliable machine feeding.",
        images: ["/images/p/operation/L1310777.jpeg", "/images/p/IMG_7382.jpeg"],
    },
    {
        id: "processing",
        title: "Processing Through Machine",
        desc:
            "Shredding, washing, separation, and extrusion with in-line QC. Closed-loop water systems and lab testing ensure specification-grade output.",
        images: [
            "/images/p/operation/L1310843.jpeg",
            "/images/p/operation/L1310855.jpeg",
            "/images/p/operation/L1310876.jpeg",

        ],
    },
    {
        id: "final",
        title: "Final Product",
        desc:
            "High-quality flakes and pellets ready for reintroduction into manufacturing: sold as recycled content or used in closed-loop programs.",
        images: ["/images/p/operation/L1310898.jpeg", "/images/p/operation/L1310775.jpeg"],
    },
];

function useInView<T extends HTMLElement>(
    opts: { threshold?: number; rootMargin?: string; eager?: boolean } = {}
) {
    const { threshold = 0.18, rootMargin = "0px", eager = false } = opts;
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (eager) {
            setInView(true);
            return;
        }
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
            { threshold, rootMargin }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold, rootMargin, eager]);

    return { ref, inView };
}

export default function ServiceDetail() {
    return (
        <section id="service-detail" className="bg-gray-50">
            <div className="">
                {STEPS.map((step, i) => {
                    const isEven = i % 2 === 0;
                    const wrapBg = isEven ? "bg-gray-50" : "bg-green-600";
                    const textMain = isEven ? "text-slate-900" : "text-gray-50";
                    const textSub = isEven ? "text-slate-600" : "text-white/85";
                    const chipBg = isEven ? "bg-emerald-600/10 text-emerald-700" : "bg-white/10 text-yellow-50";

                    return (
                        <div key={step.id} className={`${wrapBg} py-14 md:py-20`}>
                            <Container>
                                <StepBlock step={step} index={i} textMain={textMain} textSub={textSub} chipBg={chipBg} eager={i === 0} />
                            </Container>

                            {step.materials && (
                                <Container>
                                    <MaterialsBlock
                                        images={["/images/p/operation/IMG_9081.jpeg", "/images/p/operation/IMG_9082.jpeg", "/images/p/operation/IMG_9083.jpeg"]}
                                        materials={step.materials}
                                        variant={isEven ? "light" : "dark"}
                                        eager={i === 0}
                                        delay={0}
                                    />
                                </Container>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function StepBlock({
    step,
    index,
    textMain,
    textSub,
    chipBg,
    eager = false,
}: {
    step: Step;
    index: number;
    textMain: string;
    textSub: string;
    chipBg: string;
    eager?: boolean;
}) {
    const { ref, inView } = useInView<HTMLDivElement>({
        threshold: 0.05,
        rootMargin: "25% 0px",
        eager,
    });
    const alignRight = index % 2 === 0; // 交錯方向

    const imgColCls = alignRight
        ? "md:col-span-7 md:col-start-6 md:order-2" // 右側（第 6~12 欄）
        : "md:col-span-7 md:col-start-1 md:order-1"; // 左側（第 1~7 欄）

    const textColCls = alignRight
        ? "md:col-span-5 md:col-start-1 md:order-1" // 左側（第 1~5 欄）
        : "md:col-span-5 md:col-start-8 md:order-2"; // 右側（第 8~12 欄）

    return (
        <div ref={ref} className="grid items-center gap-8 md:gap-12 md:grid-cols-12">
            <div
                className={[
                    textColCls,
                    "transform transition-all duration-700 ease-out",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                ].join(" ")}
                style={{ transitionDelay: inView ? "60ms" : "0ms" }}
            >
                <div className="max-w-2xl">
                    <span
                        className={[
                            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset",
                            chipBg,
                        ].join(" ")}
                    >
                        Step {index + 1}
                    </span>
                    <h3 className={`mt-4 text-3xl md:text-4xl font-semibold ${textMain}`}>
                        {step.title}
                    </h3>
                    <p className={`mt-4 text-lg md:text-xl leading-relaxed ${textSub} text-justify`}>
                        {step.desc}
                    </p>
                </div>
            </div>

            <div
                className={[
                    imgColCls,
                    "transform transition-all duration-700 ease-out",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                ].join(" ")}
                style={{ transitionDelay: inView ? "80ms" : "0ms" }}
            >
                <ImagesFlowGrid stepId={step.id} images={step.images} />
            </div>
        </div>
    );
}


function FeatherImage({
    src,
    idPrefix,
    className = "",
    feather = 26,
    viewW = 1000,
    viewH = 562,
}: {
    src: string;
    idPrefix: string;
    className?: string;
    feather?: number;
    viewW?: number;
    viewH?: number;
}) {
    const blurId = `${idPrefix}-blur`;
    const maskId = `${idPrefix}-mask`;
    return (
        <div className={["relative w-full aspect-[16/9] overflow-hidden", className].join(" ")}>
            <svg
                viewBox={`0 0 ${viewW} ${viewH}`}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <filter id={blurId}>
                        <feGaussianBlur stdDeviation={feather / 2} />
                    </filter>
                    <mask id={maskId}>
                        {/* 背景全黑（隱藏），中間白色矩形加模糊→羽化四邊 */}
                        <rect width={viewW} height={viewH} fill="black" />
                        <rect
                            x={feather}
                            y={feather}
                            width={viewW - feather * 2}
                            height={viewH - feather * 2}
                            fill="white"
                            filter={`url(#${blurId})`}
                        />
                    </mask>
                </defs>
                <image
                    href={src}
                    width={viewW}
                    height={viewH}
                    preserveAspectRatio="xMidYMid slice"
                    mask={`url(#${maskId})`}
                />
            </svg>
        </div>
    );
}

function ImagesFlowGrid({
    stepId,
    images,
}: {
    stepId: string;
    images: string[];
}) {
    const n = images.length;
    const isOdd = n % 2 === 1;

    if (n <= 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((src, i) => {
                const isLastSingle = isOdd && i === n - 1;
                if (isLastSingle) {
                    return (
                        <div key={`${stepId}-${i}`} className="md:col-span-2 flex justify-center">
                            <div className="w-full md:max-w-[80%]">
                                <FeatherImage src={src} idPrefix={`${stepId}-img-${i}`} />
                            </div>
                        </div>
                    );
                }
                return (
                    <FeatherImage key={`${stepId}-${i}`} src={src} idPrefix={`${stepId}-img-${i}`} />
                );
            })}
        </div>
    );
}

function MaterialsBlock({
    materials,
    variant = "light",
    images = [],
    delay = 120,
    eager = false,
}: {
    materials: string[];
    variant?: "light" | "dark";
    images?: string[];
    delay?: number;
    eager?: boolean;
}) {
    const isLight = variant === "light";
    const { ref, inView } = useInView<HTMLDivElement>({
        threshold: 0.05,
        rootMargin: "25% 0px",
        eager,
    });

    return (
        <div
            ref={ref}
            className={[
                "mt-8 md:mt-10 transform transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}
            style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
        >
            <div
                className={[
                    "rounded-2xl shadow-lg backdrop-blur-sm",
                    isLight ? "bg-gray-50 ring-1 ring-black/5" : "bg-white/10 ring-1 ring-white/10",
                ].join(" ")}
            >
                <div className="p-6 md:p-8">
                    <h4 className={["text-2xl font-semibold", isLight ? "text-slate-900" : "text-white"].join(" ")}>
                        The materials we can process
                    </h4>

                    <ul className={["mt-4 space-y-2 text-lg leading-relaxed", isLight ? "text-slate-700" : "text-white/85"].join(" ")}>
                        {materials.map((m, i) => (
                            <li key={i} className="list-disc ml-5">{m}</li>
                        ))}
                    </ul>

                    {images.length > 0 && (
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {images.slice(0, 3).map((src, i) => (
                                <div key={`mat-${i}`} className="aspect-[4/3] overflow-hidden rounded-xl">
                                    <FeatherImage src={src} idPrefix={`material-${i}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}



function edgeFeatherMask(
    side: "left" | "right" | "top" | "bottom" | "all" = "all",
    strength: string = "20%"
) {
    switch (side) {
        case "left":
            return "linear-gradient(to right, transparent 0%, white " + strength + ", white 100%)";
        case "right":
            return "linear-gradient(to left, transparent 0%, white " + strength + ", white 100%)";
        case "top":
            return "linear-gradient(to bottom, transparent 0%, white " + strength + ", white 100%)";
        case "bottom":
            return "linear-gradient(to top, transparent 0%, white " + strength + ", white 100%)";
        case "all":
        default:
            // 四邊柔化
            return "radial-gradient(120% 120% at 50% 50%, white 60%, transparent 100%)";
    }
}

