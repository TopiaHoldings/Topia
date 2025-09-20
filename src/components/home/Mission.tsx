// src/components/home/CoreMission.tsx
import { useEffect, useRef, useState, type JSX } from "react";
import { FaHandshake, FaBuilding, FaMapMarkerAlt, FaLightbulb, FaCogs, FaMicrochip, FaUsers } from "react-icons/fa";


type Card = {
    id: string;
    title: string;
    desc: string;
    icons: JSX.Element[];
};

const CARDS: Card[] = [

    {
        id: "expertise-innovation",
        title: "Expertise & Innovation",
        desc: "Process engineering, data, and advanced equipment—applied pragmatically to drive quality, throughput, and conversion.",
        icons: [<FaCogs key="g" />, <FaLightbulb key="l" />, <FaMicrochip key="c" />],
    },
    {
        id: "local-partnerships",
        title: "Local Partnerships",
        desc: "We build long-term relationships with regional manufacturers and community partners to create resilient circular networks.",
        icons: [<FaHandshake key="h" />, <FaBuilding key="b" />, <FaMapMarkerAlt key="m" />],
    },
    {
        id: "shared-prosperity",
        title: "Shared Prosperity",
        desc: "Stakeholder alignment through transparency and value-sharing, turning progress into durable, distributed outcomes.",
        icons: [<FaUsers key="p" />, <FaLightbulb key="l2" />, <FaHandshake key="h2" />],
    },
];

export default function Mission() {
    const [active, setActive] = useState(1);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        start();
        return stop;
    }, [active]);

    const start = () => {
        stop();
        timerRef.current = window.setTimeout(() => {
            setActive((a) => (a + 1) % CARDS.length);
        }, 5000); // 自動輪播秒數
    };
    const stop = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const prev = () => setActive((a) => (a - 1 + CARDS.length) % CARDS.length);
    const next = () => setActive((a) => (a + 1) % CARDS.length);

    return (
        <section id="core-mission" className="relative isolate w-full bg-green-600">
            {/* <Wave position="top" /> */}
            <div
                className="mx-auto max-w-7xl px-6 py-16 md:py-24"
                onMouseEnter={stop}
                onMouseLeave={start}
            >
                {/* Header */}
                <header className="mx-auto max-w-3xl text-center">
                    <p className="text-yellow-50 text-sm uppercase tracking-[0.2em]">
                        Core Mission
                    </p>
                    <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white">
                        What drives our circular impact
                    </h2>
                    {/* <p className="mt-3 text-slate-600 dark:text-slate-300">
                        Use a three-column layout to visually separate the core values. The center card is emphasized.
                    </p> */}
                </header>

                {/* Cards */}
                <div className="mt-10 flex justify-center">
                    <div className="grid gap-6 sm:gap-8 md:grid-cols-3 items-stretch max-w-5xl">
                        {CARDS.map((c, i) => {
                            const isActive = i === active;
                            return (
                                <article
                                    key={c.id}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setActive(i)}
                                    onKeyDown={(e) =>
                                        (e.key === "Enter" || e.key === " ") && setActive(i)
                                    }
                                    className={[
                                        "group rounded-2xl  shadow-sm transition-all duration-500 ease-out",
                                        "bg-white/10  ",
                                        isActive
                                            ? "scale-[1.05] opacity-100"
                                            : "scale-[0.92] opacity-80",
                                        "w-60 md:w-72 h-80 md:h-96", // 👈 控制寬高比例
                                        "mx-auto", // 卡片置中
                                    ].join(" ")}
                                >
                                    <div className="p-6 md:p-8 flex h-full flex-col items-center text-center">
                                        <IconCircle icons={c.icons} active={isActive} />

                                        <h3 className="mt-5 text-xl md:text-2xl font-bold text-white">
                                            {c.title}
                                        </h3>
                                        <p className="mt-3 text-white/80 leading-relaxed text-center">
                                            {c.desc}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* Controls */}
                {/* <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="h-10 w-10 rounded-full bg-slate-900/5 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-900/10 dark:hover:bg-white/20 transition"
                    >
                        ‹
                    </button>
                    <div className="flex items-center gap-2">
                        {CARDS.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Go to ${i + 1}`}
                                onClick={() => setActive(i)}
                                className={[
                                    "h-2.5 w-2.5 rounded-full transition",
                                    i === active ? "bg-emerald-600" : "bg-slate-400/50 dark:bg-white/30",
                                ].join(" ")}
                            />
                        ))}
                    </div>
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="h-10 w-10 rounded-full bg-slate-900/5 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-900/10 dark:hover:bg-white/20 transition"
                    >
                        ›
                    </button>
                </div> */}
            </div>
            {/* <Wave position="bottom" /> */}
        </section>
    );
}

/** 上方圓形媒體：預設用 react-icons。若要換成圖片：
 *  將內層 <div className="..."> 替換成
 *    <img src="/images/xxx.jpg" alt="" className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover" />
 */
function IconCircle({ icons, active }: { icons: JSX.Element[]; active: boolean }) {
    return (
        <div
            className={[
                "inline-grid place-items-center rounded-full ring-1 ring-black/5 dark:ring-white/10",
                "bg-emerald-500/15 text-yellow-50",
                "h-16 w-16 md:h-20 md:w-20 transition-all duration-500",
                active ? "scale-110 shadow-lg" : "scale-95 opacity-90",
            ].join(" ")}
        >
            {/* 多 icon 時，做一個簡單輪播/淡入淡出 */}
            <span className="relative h-7 w-7 md:h-8 md:w-8">
                {icons.map((Ico, idx) => (
                    <i
                        key={idx}
                        className={[
                            "absolute inset-0 grid place-items-center transition-opacity duration-500",
                            idx === 0 ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                        aria-hidden
                    >
                        {Ico}
                    </i>
                ))}
            </span>
        </div>
    );
}
