// src/components/home/EOT.tsx
import { useEffect, useRef, useState } from "react";
import {
    RiCommunityFill,
    RiHeart2Fill,
    RiLeafFill,
    RiLineChartFill,
} from "react-icons/ri";

const purposes = [
    {
        text: "Hold and manage shares in the Company for the long-term benefit of current and future employees.",
        Icon: RiCommunityFill,
    },
    {
        text: "Promote employee engagement, well-being, and a sense of shared ownership.",
        Icon: RiHeart2Fill,
    },
    {
        text: "Ensure that the Company operates in a sustainable, ethical, and inclusive manner, aligning with its core values.",
        Icon: RiLeafFill,
    },
    {
        text: "Support long-term company performance and alignment of employee and organizational interests.",
        Icon: RiLineChartFill,
    },
];

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

                        <p className="mt-4 leading-relaxed font-semibold">
                            An{" "}
                            <span className="text-emerald-700 font-semibold">
                                employee ownership trust (EOT)
                            </span>{" "}
                            is a governance model where a trust holds a controlling interest in a
                            company on behalf of its employees.
                        </p>

                    </div>


                    <figure
                        className={`relative w-full aspect-[16/10] rounded-2xl  ${cardBg} overflow-hidden`}
                        aria-label="EOT illustration"
                    >
                        <img
                            src="/images/p/eot/eot.jpeg"
                            alt="Employee Ownership Trust illustration"
                            className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                            loading="lazy"
                        />
                    </figure>
                </div>

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

                    <p className="mt-4 font-semibold">The primary purpose of the Trust is to:</p>


                    <ul className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {purposes.map(({ text, Icon }, i) => (
                            <li
                                key={`purpose-${i}`}
                                className={`rounded-2xl border ${cardBorder} p-0 overflow-hidden`}
                            >
                                <div className="flex items-stretch">
                                    <div className="self-stretch p-5 flex items-center justify-center min-w-[84px]">
                                        <div className="rounded-xl text-green-500 p-4">
                                            <Icon className="h-12 w-12" aria-hidden />
                                        </div>
                                    </div>

                                    <div className="flex-1 p-5 flex items-center">
                                        <p className="leading-relaxed">{text}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

            </div>
        </section>
    );
}
