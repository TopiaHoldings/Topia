// src/components/home/ProcessStandalone.tsx
// TBD: 材料放在最前面，壓縮整個流程的長度，讓使用者能夠快速流覽所有流程
import { useEffect, useRef, useState } from "react";

type Mode = "light" | "dark";

// ——— Utilities ———
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

// Shared visual constants
const ImgWrap = ({ children }: { children: React.ReactNode }) => (
    <div className="h-[66vh] w-full overflow-hidden rounded-2xl">{children}</div>
);

const TwoStack = ({
    topSrc,
    bottomSrc,
    eager,
}: {
    topSrc: string;
    bottomSrc: string;
    eager?: boolean;
}) => (
    <div className="flex flex-col gap-4">
        <ImgWrap>
            <img
                src={topSrc}
                alt=""
                loading={eager ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
        </ImgWrap>
        <ImgWrap>
            <img
                src={bottomSrc}
                alt=""
                loading={eager ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
        </ImgWrap>
    </div>
);

const OneFill = ({ src, eager }: { src: string; eager?: boolean }) => (
    <ImgWrap>
        <img
            src={src}
            alt=""
            loading={eager ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
    </ImgWrap>
);

export default function ProcessStandalone({ mode = "dark" }: { mode?: Mode }) {
    const isDark = mode === "dark";
    const sectionBg = isDark ? "bg-green-600 text-gray-50" : "bg-gray-50 text-slate-900";
    const eyebrow = isDark ? "text-yellow-50" : "text-emerald-700";
    const subtext = isDark ? "text-gray-50/85" : "text-slate-600";

    return (
        <section id="process" className={`relative isolate w-full ${sectionBg}`}>
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                {/* Header */}
                <Header eyebrow={eyebrow} subtext={subtext} />
                <MaterialsPanel mode={mode} />
                <StepBlock
                    index={1}
                    title="Intake"
                    desc="Receive and register plastics from suppliers; verify material type, source, and condition."
                    layout="text-left"
                    mode={mode}
                >
                    <TwoStack
                        topSrc="/images/p/operation/L1310788.jpeg"
                        bottomSrc="/images/p/operation/L1310780.jpeg"
                        eager
                    />
                </StepBlock>

                <ArrowBetween mode={mode} />

                {/* Step 2: Storage */}
                <StepBlock
                    index={2}
                    title="Storage"
                    desc="Stage and store by polymer/resin family with tracked batches for traceability."
                    layout="text-right"
                    mode={mode}
                >
                    <OneFill src="/images/p/operation/L1310812.jpeg" />
                </StepBlock>


                <ArrowBetween mode={mode} />
                {/* Step 3: Prepared for Grind */}
                <StepBlock
                    index={3}
                    title="Prepared for Grind"
                    desc="Pre-sorting, decontamination, and size reduction prep for consistent feedstock."
                    layout="text-left"
                    mode={mode}
                >
                    <OneFill src="/images/p/operation/L1310777.jpeg" />
                </StepBlock>
                <ArrowBetween mode={mode} />
                {/* Step 4: Processing */}
                <StepBlock
                    index={4}
                    title="Processing"
                    desc="Shredding, washing, and extrusion. Closed-loop water systems and in-line QC."
                    layout="text-right"
                    mode={mode}
                >
                    <TwoStack
                        topSrc="/images/p/operation/L1310876.jpeg"
                        bottomSrc="/images/p/operation/L1310855.jpeg"
                    />
                </StepBlock>
                <ArrowBetween mode={mode} />
                {/* Step 5: Final Product */}
                <StepBlock
                    index={5}
                    title="Final Product"
                    desc="High-quality regrinds/pellets, tested in lab and delivered or reintroduced in closed-loop."
                    layout="text-left"
                    mode={mode}
                >
                    <OneFill src="/images/p/operation/L1310769.jpeg" />
                </StepBlock>
            </div>

            <style>{`
        @keyframes bounce-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .animate-bounce-slow { animation: bounce-slow 1.6s ease-in-out infinite; }
      `}</style>
        </section>
    );
}

// ——— Subcomponents ———
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

function StepBlock({
    index,
    title,
    desc,
    layout,
    mode,
    children,
}: {
    index: number;
    title: string;
    desc: string;
    layout: "text-left" | "text-right";
    mode: Mode;
    children: React.ReactNode;
}) {
    const { ref, inView } = useInView<HTMLDivElement>(0.15);
    const isDark = mode === "dark";

    const chipCls = isDark
        ? "bg-yellow-50/20 text-yellow-50 ring-white/20"
        : "bg-emerald-600/10 text-emerald-700 ring-emerald-700/20";
    const titleCls = isDark ? "text-gray-50" : "text-slate-900";
    const descCls = isDark ? "text-gray-50/90" : "text-slate-600";

    const textCol =
        layout === "text-left"
            ? "md:col-span-4 md:col-start-1 order-1"
            : "md:col-span-4 md:col-start-9 order-2";
    const imgCol =
        layout === "text-left"
            ? "md:col-span-8 md:col-start-5 order-2"
            : "md:col-span-8 md:col-start-1 order-1";

    return (
        <div className="mt-12 md:mt-16">
            <div ref={ref} className="grid gap-6 md:grid-cols-12 items-stretch">
                <div
                    className={[
                        textCol,
                        "flex items-center",
                        "transform transition-all duration-700 ease-out",
                        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                    ].join(" ")}
                    style={{ transitionDelay: inView ? "80ms" : "0ms" }}
                >
                    <article className="w-full">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${chipCls}`}>
                            Step {index}
                        </span>
                        <h3 className={`mt-4 text-2xl md:text-3xl font-semibold ${titleCls}`}>{title}</h3>
                        <p className={`mt-3 leading-relaxed ${descCls}`}>{desc}</p>
                    </article>
                </div>
                <div
                    className={[
                        imgCol,
                        "transform transition-all duration-700 ease-out",
                        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                    ].join(" ")}
                    style={{ transitionDelay: inView ? "140ms" : "0ms" }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function ArrowBetween({ mode }: { mode: Mode }) {
    const color = mode === "dark" ? "text-yellow-50" : "text-emerald-700";
    return (
        <div className="col-span-full flex justify-center my-6 md:my-10">
            <svg className={`h-8 w-8 ${color} animate-bounce-slow`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
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
                        <img src="/images/p/operation/IMG_9081.jpeg" alt="" className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-500 ease-in-out hover:scale-105" />
                    </div>
                    <div className="rounded-xl overflow-hidden">
                        <img src="/images/p/operation/IMG_9082.jpeg" alt="" className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-500 ease-in-out hover:scale-105" />
                    </div>
                    <div className="rounded-xl overflow-hidden">
                        <img src="/images/p/operation/IMG_9083.jpeg" alt="" className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-500 ease-in-out hover:scale-105" />
                    </div>
                </div>
            </div>
        </div>
    );
}
// // src/components/home/Operation.tsx
// import { useEffect, useRef, useState, Fragment } from "react";

// type Step = {
//     id: string;
//     title: string;
//     desc: string;
//     images: string[]; // 1~2
// };

// type Mode = "light" | "dark";


// const STEPS: Step[] = [
//     {
//         id: "intake",
//         title: "Intake",
//         desc:
//             "Receive and register plastics from suppliers; verify material type, source, and condition.",
//         images: ["/images/p/operation/L1310788.jpeg", "/images/p/operation/L1310780.jpeg"],
//     },
//     {
//         id: "storage",
//         title: "Storage",
//         desc:
//             "Stage and store by polymer/resin family with tracked batches for traceability.",
//         images: ["/images/p/operation/L1310812.jpeg"],
//     },
//     {
//         id: "prep",
//         title: "Prepared for Grind",
//         desc:
//             "Pre-sorting, decontamination, and size reduction prep for consistent feedstock.",
//         images: ["/images/p/operation/L1310777.jpeg"],
//     },
//     {
//         id: "processing",
//         title: "Processing",
//         desc:
//             "Shredding, washing, and extrusion. Closed-loop water systems and in-line QC.",
//         images: ["/images/p/operation/L1310876.jpeg", "/images/p/operation/L1310855.jpeg"],
//     },
//     {
//         id: "final",
//         title: "Final Product",
//         desc:
//             "High-quality flakes/pellets, tested in lab and delivered or reintroduced in closed-loop.",
//         images: ["/images/p/operation/L1310769.jpeg"],
//     },
// ];

// const MATERIALS = [
//     "Post-industrial plastics (HDPE, LDPE, PP, PS, PET, ABS, PC, Nylon)",
//     "Select post-consumer rigid plastics",
//     "Polymer-family mixed streams after pre-sort",
//     "Film and regrind suitable for wash/line intake",
// ];
// const MATERIAL_IMAGES = [
//     "/images/p/operation/IMG_9081.jpeg", "/images/p/operation/IMG_9082.jpeg", "/images/p/operation/IMG_9083.jpeg"
// ];

// function useInView<T extends HTMLElement>(threshold = 0.08) {
//     const ref = useRef<T | null>(null);
//     const [inView, setInView] = useState(false);

//     useEffect(() => {
//         const el = ref.current;
//         if (!el) return;

//         const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
//         if (mq.matches) {
//             setInView(true);
//             return;
//         }

//         const io = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setInView(true);
//                     io.disconnect();
//                 }
//             },
//             { threshold }
//         );
//         io.observe(el);
//         return () => io.disconnect();
//     }, [threshold]);

//     return { ref, inView };
// }

// function StepRow({ step, index, mode }: { step: Step; index: number; mode: Mode }) {
//     const { ref, inView } = useInView<HTMLDivElement>(0.15);
//     const imageOnRight = index % 2 === 0;

//     // layout
//     const textCol = imageOnRight ? "md:col-span-4 md:col-start-1 md:order-1" : "md:col-span-4 md:col-start-9 md:order-2";
//     const imgCol = imageOnRight ? "md:col-span-8 md:col-start-5 md:order-2" : "md:col-span-8 md:col-start-1 md:order-1";

//     // colors
//     const isDark = mode === "dark";
//     const chipCls = isDark
//         ? "bg-yellow-50/20 text-yellow-50 ring-white/20"
//         : "bg-emerald-600/10 text-emerald-700 ring-emerald-700/20";
//     const titleCls = isDark ? "text-gray-50" : "text-slate-900";
//     const descCls = isDark ? "text-gray-50/90" : "text-slate-600";

//     return (
//         <div ref={ref} className="grid gap-6 md:grid-cols-12 items-stretch">
//             {/* text */}
//             <div
//                 className={[
//                     textCol, "flex items-center",
//                     "transform transition-all duration-700 ease-out",
//                     inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
//                 ].join(" ")}
//                 style={{ transitionDelay: inView ? "80ms" : "0ms" }}
//             >
//                 <article className="w-full">
//                     <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${chipCls}`}>
//                         Step {index + 1}
//                     </span>
//                     <h3 className={`mt-4 text-2xl md:text-3xl font-semibold ${titleCls}`}>{step.title}</h3>
//                     <p className={`mt-3 leading-relaxed ${descCls}`}>{step.desc}</p>
//                 </article>
//             </div>

//             {/* images */}
//             <div
//                 className={[
//                     imgCol,
//                     "transform transition-all duration-700 ease-out",
//                     inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
//                 ].join(" ")}
//                 style={{ transitionDelay: inView ? "140ms" : "0ms" }}
//             >
//                 <div className="flex flex-col gap-4 h-full">
//                     {step.images.slice(0, 2).map((src, i) => (
//                         <div key={`${step.id}-img-${i}`} className="w-full rounded-2xl overflow-hidden">
//                             <img src={src} alt="" className="w-full h-auto object-cover aspect-[16/9] transform transition-transform duration-500 ease-in-out hover:scale-105" loading={index === 0 ? "eager" : "lazy"} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// function ArrowBetween({ mode }: { mode: Mode }) {
//     const color = mode === "dark" ? "text-yellow-50" : "text-emerald-700";
//     return (
//         <div className="col-span-full flex justify-center my-6 md:my-10">
//             <svg className={`h-8 w-8 ${color} animate-bounce-slow`} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
//                 <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
//             </svg>
//         </div>
//     );
// }

// function MaterialsPanel({ mode }: { mode: Mode }) {
//     const isDark = mode === "dark";
//     const wrap = isDark ? "bg-white/90" : "bg-white";
//     const title = isDark ? "text-green-600" : "text-emerald-700";
//     const text = isDark ? "text-green-600/90" : "text-slate-700";
//     return (
//         <div className="mt-10">
//             <div className={`rounded-2xl ${wrap} backdrop-blur-sm shadow-md p-6 md:p-8`}>
//                 <h4 className={`text-2xl md:text-3xl font-semibold ${title}`}>The materials we can process</h4>
//                 <ul className={`mt-4 space-y-2 text-lg leading-relaxed ${text}`}>
//                     {MATERIALS.map((m, i) => <li key={i} className="list-disc ml-5">{m}</li>)}
//                 </ul>
//                 {MATERIAL_IMAGES.length > 0 && (
//                     <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
//                         {MATERIAL_IMAGES.slice(0, 3).map((src, i) => (
//                             <div key={i} className="rounded-xl overflow-hidden">
//                                 <img src={src} alt="" className="w-full h-auto object-cover aspect-[4/3] transform transition-transform duration-500 ease-in-out hover:scale-105" />
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default function Process({ mode = "dark" }: { mode?: Mode }) {
//     const { ref, inView } = useInView<HTMLElement>(0.08);
//     const isDark = mode === "dark";

//     const sectionBg = isDark ? "bg-green-600 text-gray-50" : "bg-gray-50 text-slate-900";
//     const eyebrow = isDark ? "text-yellow-50" : "text-emerald-700";
//     const subtext = isDark ? "text-gray-50/85" : "text-slate-600";

//     return (
//         <section id="process" ref={ref} className={`relative isolate w-full ${sectionBg}`}>
//             <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
//                 {/* Header */}
//                 <header
//                     className={[
//                         "max-w-3xl mx-auto text-center transform transition-all duration-700 ease-out",
//                         inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
//                     ].join(" ")}
//                     style={{ transitionDelay: inView ? "40ms" : "0ms" }}
//                 >
//                     <p className={`${eyebrow} text-sm uppercase tracking-[0.2em]`}>Process</p>
//                     <h2 className="mt-3 text-3xl md:text-4xl font-semibold">From Intake to Final Product</h2>
//                     <p className={`mt-3 ${subtext}`}>Scroll to follow each step of our plastics recycling workflow.</p>
//                 </header>

//                 {/* Steps */}
//                 <div className="mt-12 md:mt-16 space-y-16 md:space-y-20">
//                     {STEPS.map((step, i) => (
//                         <Fragment key={step.id}>
//                             <StepRow step={step} index={i} mode={mode} />
//                             {i === 0 && <MaterialsPanel mode={mode} />}
//                             {i < STEPS.length - 1 && <ArrowBetween mode={mode} />}
//                         </Fragment>
//                     ))}
//                 </div>
//             </div>

//             <style>{`
//         @keyframes bounce-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
//         .animate-bounce-slow { animation: bounce-slow 1.6s ease-in-out infinite; }
//       `}</style>
//         </section>
//     );
// }