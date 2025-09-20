// src/components/home/Hero.tsx
import Logo from "../common/Logo";

type Props = {
    photoSrc: string;
    className?: string;
};


export default function Hero({
    photoSrc,

    className = "",
}: Props) {
    return (
        <section
            className={[
                "relative isolate h-[100svh] w-full overflow-hidden bg-green-600",
                className,
            ].join(" ")}
            aria-label="Hero"
        >
            <div className="absolute inset-y-0 right-0 flex items-center justify-end pointer-events-none">
                <div className="relative h-full">
                    <img
                        src={photoSrc}
                        alt=""
                        className="block h-full max-h-[100svh] w-auto object-cover"
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "linear-gradient(to right, #0F1B04 20%, transparent 60%)",
                        }}
                    />
                </div>
            </div>
            <div className="relative z-10 mx-auto h-full max-w-7xl px-6 sm:px-8 lg:px-12">
                <div className="flex h-full items-center">
                    <div className="w-full max-w-[720px] text-left">
                        <div className="inline-block">
                            <Logo
                                titleColor="text-gray-50"
                                sloganColor="text-gray-50"
                            />
                        </div>

                        <h1 className="mt-4 text-white [font-size:clamp(1.75rem,5.4vw,3.75rem)] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                            Post-Industrial <br />Plastic Management<br />Redefined
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
}

