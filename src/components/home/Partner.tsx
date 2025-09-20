// src/components/home/Partnership.tsx
import Container from "../common/Container";

type PartnerItem = {
    name: string;
    logo?: string;
    href?: string;
};

const partnerRows: PartnerItem[][] = [
    [
        { name: "AeroCom" },
        { name: "BuildOne" },
        { name: "CircuitX" },
        { name: "DeltaFab" },
        { name: "EcoPack" },
        { name: "FlexTex" },
    ],
    [
        { name: "GreenLabs" },
        { name: "HelixMed" },
        { name: "IonWorks" },
        { name: "JetFoods" },
        { name: "Kappa Mfg" },
    ],
    [
        { name: "LumenAuto" },
        { name: "MetaMat" },
        { name: "NeoPlast" },
        { name: "Orchid" },
        { name: "PolyCore" },
        { name: "Quanta" },
    ],
];

function MarqueeRow({
    items,
    direction = "left",
    speedSec = 30,
    rowIndex = 0,
    debug = true,
}: {
    items: PartnerItem[];
    direction?: "left" | "right";
    speedSec?: number;
    rowIndex?: number;
    debug?: boolean;
}) {
    const doubled = [...items, ...items];
    const animClass = direction === "left" ? "marquee-left" : "marquee-right";

    return (
        <div className="relative overflow-hidden">
            <div
                className={[
                    "flex items-center gap-3 sm:gap-4 md:gap-6 min-w-max will-change-transform",
                    animClass,
                ].join(" ")}
                style={{ animationDuration: `${speedSec}s` }}
            >
                {doubled.map((item, i) => (
                    <div
                        key={`${rowIndex}-${i}`}
                        className="relative h-14 w-36 sm:h-16 sm:w-44 md:h-20 md:w-56
                       rounded-xl bg-white/8 ring-1 ring-white/10
                       shadow-[0_4px_16px_rgba(0,0,0,0.25)]
                       flex items-center justify-center"
                    >
                        {item.logo ? (
                            <img
                                src={item.logo}
                                alt={item.name}
                                className="max-h-10 object-contain opacity-90"
                                loading="lazy"
                            />
                        ) : (
                            <span className="block h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-white/70" />
                        )}
                        {debug && (
                            <span className="absolute inset-x-0 bottom-1 text-[10px] sm:text-xs text-white/70 text-center">
                                {rowIndex}-{i % items.length} · {item.name}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Partner() {
    return (
        <section id="partner" className="relative isolate w-full overflow-hidden">
            <div className="absolute inset-0 -z-20 bg-green-600" />

            <img
                src="/images/partnership_bg_temp_nbg.png"
                alt=""
                className="hidden md:block pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 -z-10
                   h-[70svh] max-h-[780px] opacity-50 mix-blend-luminosity"
                style={{
                    maskImage:
                        "radial-gradient(90% 90% at 70% 50%, black 60%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(90% 90% at 70% 50%, black 60%, transparent 100%)",
                    filter: "drop-shadow(0 8px 24px rgba(0,0,0,.35))",
                }}
                loading="lazy"
            />

            <Container>
                <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                    <header className="max-w-4xl">
                        <p className="text-yellow-50 text-sm uppercase tracking-[0.2em]">
                            Partners & Industries
                        </p>
                        <h2 className="mt-3 text-3xl md:text-5xl font-semibold text-white leading-tight">
                            Industries We Partner With
                        </h2>
                        <p className="mt-3 text-white/80">
                            Building sustainable value across diverse manufacturing sectors.
                        </p>
                    </header>

                    <div className="mt-10 w-full md:w-2/3">
                        <div
                            className="
                                backdrop-blur-sm
                                p-4 sm:p-6 md:p-8
                                overflow-x-auto md:overflow-hidden
                                md:mask-fade-x
                            "
                        >
                            <div className="space-y-5 md:space-y-7">
                                {partnerRows.map((row, rIdx) => (
                                    <MarqueeRow
                                        key={rIdx}
                                        items={row}
                                        rowIndex={rIdx}
                                        direction={rIdx % 2 === 0 ? "left" : "right"}
                                        speedSec={36}
                                        debug={false}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left  { animation: marquee-left linear infinite; }
        .marquee-right { animation: marquee-right linear infinite; }

        @media (min-width: 768px) {
          .md\\:mask-fade-x {
            -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
                    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          }
        }
      `}</style>
        </section>
    );
}