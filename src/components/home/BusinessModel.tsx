import { useEffect, useRef, useState } from "react";
import Container from "../common/Container";
import { RiTeamFill, RiScales3Fill, RiSearchEyeFill } from "react-icons/ri";

type Mode = "light" | "dark";

export default function StrategicBusinessModel({ mode = "light" }: { mode?: Mode }) {
    const isDark = mode === "dark";

    const sectionBg = isDark ? "bg-green-600 text-gray-50" : "bg-gray-50 text-green-800";
    const titleColor = isDark ? "text-gray-50" : "text-green-800";
    const underlineColor = "bg-yellow-50";

    const cardCls = isDark
        ? "border-white/25 bg-white/10 text-gray-50"
        : "border-green-700/20 bg-white text-green-700";

    const headerRef = useRef<HTMLElement | null>(null);
    const [inViewHeader, setInViewHeader] = useState(false);
    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) { setInViewHeader(true); return; }
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setInViewHeader(true); io.disconnect(); }
        }, { threshold: 0.15 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const items = [
        { text: "Develop a culture of stewardship and employee engagement.", Icon: RiTeamFill },
        { text: "Ensure balance of power", Icon: RiScales3Fill },
        { text: "Periodic independent reviews of governance effectiveness.", Icon: RiSearchEyeFill },
    ];

    return (
        <section id="strategic-business-model" className={`py-16 md:py-24 ${sectionBg}`}>
            <Container>
                <header
                    ref={headerRef as any}
                    className={[
                        "max-w-3xl mx-auto text-center transform transition-all duration-700 ease-out",
                        inViewHeader ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                    ].join(" ")}
                    style={{ transitionDelay: inViewHeader ? "40ms" : "0ms" }}
                >
                    <h3 className={`text-2xl md:text-3xl font-semibold ${titleColor}`}>
                        Strategic Business Model
                    </h3>
                    <div className={`mx-auto mt-2 h-0.5 w-14 rounded ${underlineColor}`} aria-hidden="true" />
                </header>

                <div className="mt-10 space-y-6 md:hidden">
                    {items.map(({ text, Icon }, i) => (
                        <div
                            key={`m-${i}`}
                            className="flex items-center gap-4"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-yellow-50 flex-shrink-0">
                                <Icon className="h-5 w-5" />
                            </div>
                            <p className="leading-relaxed">{text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
                    {items.map(({ text, Icon }, i) => (
                        <div
                            key={`d-${i}`}
                            className={[
                                "group rounded-2xl  p-6 leading-relaxed text-center shadow-sm",
                                "transform transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-lg",
                                cardCls,
                            ].join(" ")}
                            style={{ transitionDelay: `${80 + i * 80}ms` }}
                        >
                            <div
                                className={[
                                    "mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
                                    isDark
                                        ? " text-yellow-50"
                                        : " text-emerald-700",
                                ].join(" ")}
                            >
                                <Icon className="h-10 w-10" />
                            </div>
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}