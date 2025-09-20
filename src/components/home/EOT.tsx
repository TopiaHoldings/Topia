// src/components/home/EOT.tsx
import { useEffect, useRef, useState } from "react";
import {
    Users2,
    ShieldCheck,
    Leaf,
    TrendingUp,
    Scale,
    RefreshCw,
    Landmark
} from "lucide-react";

type Mode = "light" | "dark";

export default function EOT({ mode = "light" }: { mode?: Mode }) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);


    // const isDark = mode === "dark";
    // const sectionBg = isDark ? "bg-green-600 text-gray-50" : "bg-gray-50 text-slate-900";
    // const eyebrow = isDark ? "text-yellow-50" : "text-emerald-700";
    // const subtext = isDark ? "text-gray-50/85" : "text-slate-600";



    const isDark = mode === "dark";
    const wrapCls = isDark
        ? "bg-green-600 text-gray-50"
        : "bg-gray-50 text-green-600";

    const titleCls = isDark ? "text-gray-50" : "text-green-600";
    const subCls = isDark ? "text-gray-50/85" : "text-green-600/80";

    const cardCls = isDark
        ? "border-white/20 bg-white/10"
        : "border-green-600/30 bg-white";

    const cardBorder = isDark ? "border-white/20" : "border-green-700/20";
    const cardBg = isDark ? "bg-white/10" : "bg-white";
    const kickerCls = isDark ? "text-yellow-50" : "text-green-700";

    return (
        <section id="EOT" ref={sectionRef} className={`relative isolate w-full ${wrapCls}`}>
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                {/* Header (consistent design) */}
                <header
                    className={[
                        "max-w-3xl mx-auto text-center transform transition-all duration-700 ease-out",
                        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                    ].join(" ")}
                    style={{ transitionDelay: inView ? "80ms" : "0ms" }}
                >
                    <p className={`text-sm uppercase tracking-[0.2em] ${kickerCls}`}>EOT</p>
                    <h2 className={`mt-3 text-3xl md:text-4xl font-semibold ${titleCls}`}>
                        Employee Ownership Trust
                    </h2>
                    <p className={`mt-3 ${subCls}`}>
                        Topia is operating as an Employee Ownership Trust (EOT)
                    </p>
                </header>

                {/* Intro / Definition */}
                <div
                    className={[
                        "mt-12 grid grid-cols-1 items-center gap-8 md:gap-12 md:grid-cols-2",
                        "transform transition-all duration-700 ease-out",
                        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                    ].join(" ")}
                    style={{ transitionDelay: inView ? "160ms" : "0ms" }}
                >
                    <div>
                        <div className="mb-6">
                            <h3 className={`text-2xl font-semibold ${titleCls}`}>What is an EOT?</h3>
                            <div className="mt-2 h-0.5 w-14 rounded bg-yellow-50" aria-hidden="true" />
                        </div>

                        <p className="mt-4 leading-relaxed">
                            An employee ownership trust (EOT) is a governance model where a trust holds a controlling interest in a company on behalf of its employees.
                        </p>
                    </div>

                    {/* Image placeholder */}
                    {/* <figure
                        className={`relative w-full aspect-[16/10] rounded-2xl border ${cardBorder} ${cardBg} grid place-items-center`}
                        aria-label="EOT illustration placeholder"
                    >
                        <div className="text-center px-6">
                            <Users2 className="h-10 w-10 mx-auto" aria-hidden />
                            <p className="mt-2 text-sm opacity-80">Image placeholder</p>
                        </div>
                    </figure> */}
                    <figure
                        className={`relative w-full aspect-[16/10] rounded-2xl border ${cardBorder} ${cardBg} overflow-hidden`}
                        aria-label="EOT illustration"
                    >
                        <img
                            src="/images/p/operation/L1310876.jpeg"
                            alt="Employee Ownership Trust illustration"
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </figure>
                </div>

                {/* PURPOSE OF THE TRUST */}
                <section
                    className={[
                        "mt-16 transform transition-all duration-700 ease-out",
                        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                    ].join(" ")}
                    style={{ transitionDelay: inView ? "240ms" : "0ms" }}
                    aria-labelledby="purpose-heading"
                >
                    <div className="mb-6">
                        <h3 id="purpose-heading" className={`text-2xl font-semibold ${titleCls}`}>
                            PURPOSE OF THE TRUST
                        </h3>
                        <div className="mt-2 h-0.5 w-14 rounded bg-yellow-50" aria-hidden="true" />
                    </div>

                    <p className="mt-4">The primary purpose of the Trust is to:</p>

                    {/* 手機單欄、桌機兩欄卡片 */}
                    <ul className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {[
                            "Hold and manage shares in the Company for the long-term benefit of current and future employees.",
                            "Promote employee engagement, well-being, and a sense of shared ownership.",
                            "Ensure that the Company operates in a sustainable, ethical, and inclusive manner, aligning with its core values.",
                            "Support long-term company performance and alignment of employee and organizational interests.",
                        ].map((text, i) => (
                            <li
                                key={`purpose-${i}`}
                                className={`rounded-2xl border ${cardBorder} ${cardBg} p-5 leading-relaxed`}
                            >
                                {text}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Strategic Business Model */}
                {/* <section
                    className={[
                        "mt-16 transform transition-all duration-700 ease-out",
                        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                    ].join(" ")}
                    style={{ transitionDelay: inView ? "320ms" : "0ms" }}
                    aria-labelledby="strategic-heading"
                >

                    <div className="mb-6">
                        <h3 id="strategic-heading" className={`text-2xl font-semibold ${titleCls}`}>
                            Strategic Business Model
                        </h3>
                        <div className="mt-2 h-0.5 w-14 rounded bg-yellow-50" aria-hidden="true" />
                    </div>

                    <ul className="mt-6 space-y-4">
                        <li className={`rounded-2xl border ${cardBorder} ${cardBg} p-5`}>
                            • Develop a culture of stewardship and employee engagement.
                        </li>
                        <li className={`rounded-2xl border ${cardBorder} ${cardBg} p-5`}>
                            • Ensure balance of power
                        </li>
                        <li className={`rounded-2xl border ${cardBorder} ${cardBg} p-5`}>
                            • Periodic independent reviews of governance effectiveness.
                        </li>
                    </ul>
                </section> */}
            </div>
        </section>
    );
}
