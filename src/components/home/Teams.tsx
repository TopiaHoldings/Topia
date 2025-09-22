// src/components/home/Teams.tsx
import { useEffect, useRef, useState } from "react";

type Member = {
    id: string;
    name: string;
    role?: string;
    bio: string;
    avatar?: string;
};
type Mode = "light" | "dark";

const members: Member[] = [
    {
        id: "alexander",
        name: "Alexander Long",
        role: "Chief Executive Officer, Co-Founder",
        bio: "12+ years in sustainability and circularity. Expert in mechanical recycling, plastics compounding, and business growth strategies—turning vision into measurable value.",
        avatar: "/images/teams/al.jpeg",
    },
    {
        id: "liang",
        name: "Liang Zhao",
        role: "Co-Operator, Co-Founder",
        bio: "20+ years in capital and financial planning. Skilled in market expansion and tackling hard-to-recycle materials, strengthening capital structures and long-term resilience.",
        avatar: "/images/teams/lz.jpeg",
    },

    {
        id: "travis",
        name: "Travis Langdale",
        role: "Chief Sales & Marketing",
        bio: "20+ years in recycling and industrial services. Expert in market expansion and partnership building, driving high-value collaborations and operational sustainability.",
        avatar: "/images/teams/tl.jpeg",
    },
    {
        id: "marijke",
        name: "Marijke Long",
        role: "Chief Networking Officer",
        bio: "30+ years in business development and networking. Builds high-impact relationships, opens new opportunities, and strengthens long-term market connectivity.",
        avatar: "/images/teams/ml.jpeg",
    },
    {
        id: "brian",
        name: "Brian Morgan",
        role: "Executive Trustee for Employee Ownership Trust",
        bio: "Background in investment, startups, and financial structuring. Blends strategic insight with innovative thinking to drive sustainable, win-win growth.",
        avatar: "/images/teams/br.jpeg",
    },
    {
        id: "stephen",
        name: "Stephen Wright",
        role: "Chief Operations Officer",
        bio: "30+ years in manufacturing and supply chain operations. Focused on scalability, continuous improvement, and cross-functional alignment to ensure efficiency and quality.",
        avatar: "/images/teams/sw.png",
    },
];

function sortByLastName(a: Member, b: Member) {
    const lastA = a.name.split(/\s+/).slice(-1)[0].toLowerCase();
    const lastB = b.name.split(/\s+/).slice(-1)[0].toLowerCase();
    return lastA.localeCompare(lastB);
}

export default function Teams({ mode = "light" }: { mode?: Mode }) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
            { threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const featured = members.slice(0, 2);
    const rest = members.slice(2).sort(sortByLastName);

    const isDark = mode === "dark";
    const wrapCls = isDark
        ? "bg-green-600 text-gray-50"
        : "bg-gray-50 text-green-600";

    const titleCls = isDark ? "text-gray-50" : "text-green-600";
    const subCls = isDark ? "text-gray-50/85" : "text-green-600/80";

    const cardCls = isDark
        ? "border-white/20 bg-white/10"
        : "border-green-600/30 bg-white";

    const nameCls = isDark ? "text-gray-50" : "text-green-600";
    const roleCls = isDark ? "text-yellow-50" : "text-green-600/80";
    const bioCls = isDark ? "text-gray-50/90" : "text-green-600/90";

    return (
        <section id="teams" ref={sectionRef} className={`relative isolate w-full ${wrapCls}`}>
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                {/* Header */}
                <header
                    className={[
                        "max-w-3xl mx-auto text-center transform transition-all duration-700 ease-out",
                        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                    ].join(" ")}
                    style={{ transitionDelay: inView ? "80ms" : "0ms" }}
                >
                    <p className="text-yellow-50 text-sm uppercase tracking-[0.2em]">Our Team</p>
                    <h2 className={`mt-3 text-3xl md:text-4xl font-semibold ${titleCls}`}>
                        People building the circular future
                    </h2>
                    <p className={`mt-3 ${subCls}`}>
                        A multidisciplinary team combining operations, technology, and partnerships
                        to turn waste into lasting value.
                    </p>
                </header>

                {/* Main*/}
                <ul className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2" aria-label="Featured team members">
                    {featured.map((m, i) => (
                        <FadeInLi
                            key={m.id}
                            inView={inView}
                            delay={200 + i * 120}
                            className={`group rounded-2xl border ${cardCls} p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow`}
                        >
                            <div className="flex items-start gap-4">
                                <Avatar name={m.name} src={m.avatar} />
                                <div>
                                    <h3 className={`text-xl md:text-2xl font-semibold ${nameCls}`}>{m.name}</h3>
                                    {m.role && <p className={`text-sm md:text-base ${roleCls}`}>{m.role}</p>}
                                </div>
                            </div>
                            <p className={`mt-4 text-sm md:text-base leading-relaxed ${bioCls}`}>{m.bio}</p>
                        </FadeInLi>
                    ))}
                </ul>


                <ul
                    className="mt-10 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    aria-label="Team members"
                >
                    {rest.map((m, i) => (
                        <FadeInLi
                            key={m.id}
                            inView={inView}
                            delay={i * 100}
                            className={`group rounded-2xl border ${cardCls} p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full`}
                        >

                            <div className="flex items-start gap-4 lg:flex-col lg:items-center">
                                <Avatar name={m.name} src={m.avatar} />
                                <div className="lg:text-center">
                                    <h3 className={`text-lg font-semibold ${nameCls}`}>{m.name}</h3>
                                    {m.role && <p className={`italic text-sm ${roleCls}`}>{m.role}</p>}
                                </div>
                            </div>

                            <p className={`mt-4 text-sm leading-relaxed ${bioCls} lg:text-center `}>
                                {m.bio}
                            </p>
                        </FadeInLi>
                    ))}
                </ul>

            </div>
        </section>
    );
}

function FadeInLi({
    className = "",
    children,
    delay = 0,
    inView,
}: {
    className?: string;
    children: React.ReactNode;
    delay?: number;
    inView: boolean;
}) {
    return (
        <li
            className={[
                "transform transition-all duration-700 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                className,
            ].join(" ")}
            style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
        >
            {children}
        </li>
    );
}

function Avatar({ name, src }: { name: string; src?: string }) {
    const initial = name?.trim()?.charAt(0)?.toUpperCase() || "T";
    if (src) {
        return (
            <img
                src={src}
                alt={`${name} avatar`}
                className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
            />
        );
    }
    return (
        <div
            aria-hidden
            className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.03]"
            title={name}
        >
            {initial}
        </div>
    );
}