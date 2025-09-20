import { useEffect, useRef, useState } from "react";
import Container from "../common/Container";

type Mode = "light" | "dark";

export default function StrategicBusinessModel({ mode = "light" }: { mode?: Mode }) {
    const isDark = mode === "dark";

    // 反轉配色：Dark(全頁) → 本區Light；Light(全頁) → 本區深色卡片
    const sectionBg = isDark ? "bg-green-600 text-gray-50" : "bg-gray-50 text-green-800";
    const titleColor = isDark ? "text-gray-50" : "text-green-800";
    const underlineColor = isDark ? "bg-white/60" : "bg-yellow-50";

    const cardCls = isDark
        ? "border-white/25 bg-white/10 text-gray-50"
        : "border-green-700/20 bg-white text-green-700";

    // header in-view 動畫
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

    // 卡片 in-view 小工具
    function useInView<T extends HTMLElement>(threshold = 0.14) {
        const ref = useRef<T | null>(null);
        const [inView, setInView] = useState(false);
        useEffect(() => {
            const el = ref.current;
            if (!el) return;
            const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
            if (mq.matches) { setInView(true); return; }
            const io = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) { setInView(true); io.disconnect(); }
            }, { threshold });
            io.observe(el);
            return () => io.disconnect();
        }, [threshold]);
        return { ref, inView };
    }

    const items = [
        "Develop a culture of stewardship and employee engagement.",
        "Ensure balance of power",
        "Periodic independent reviews of governance effectiveness.",
    ];

    return (
        <section id="strategic-business-model" className={`py-16 md:py-24 ${sectionBg}`}>
            <Container>
                {/* Header：置中、h3 有底線（僅原本內容） */}
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
                    <div
                        className={`mx-auto mt-2 h-0.5 w-14 rounded ${underlineColor}`}
                        aria-hidden="true"
                    />
                </header>

                {/* Cards：手機單欄、平板雙欄、桌機三欄；微浮動與進場動畫 */}
                <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((text, i) => (
                        <Card key={i} text={text} cardCls={cardCls} delayMs={80 + i * 80} />
                    ))}
                </div>
            </Container>

            <style>{`
        @keyframes float-soft { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-4px) } }
      `}</style>
        </section>
    );

    function Card({ text, cardCls, delayMs = 80 }: { text: string; cardCls: string; delayMs?: number }) {
        const { ref, inView } = useInView<HTMLDivElement>(0.14);
        return (
            <article
                ref={ref}
                className={[
                    "rounded-2xl border p-5 leading-relaxed shadow-sm",
                    "transform transition-all duration-700 ease-out hover:-translate-y-1",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                    cardCls,
                ].join(" ")}
                style={{ transitionDelay: inView ? `${delayMs}ms` : undefined }}
            >
                {text}
            </article>
        );
    }
}