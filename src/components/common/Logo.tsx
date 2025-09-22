// src/components/Logo.tsx
import { useEffect, useState } from "react";

type LogoProps = {
    titleColor?: string;
    sloganColor?: string;
};

export default function Logo({
    titleColor = "text-gray-50",
    sloganColor = "text-gray-50",
}: LogoProps) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkWidth = () => setIsDesktop(window.innerWidth >= 768); // md 斷點
        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    return (
        <div className={`flex flex-col items-center text-center mx-auto ${isDesktop ? "animate-flip" : ""}`}>
            <img
                src="/images/logo_hand.png"
                alt="Topia logo"
                className="h-36 w-auto"
            />

            <h1
                className={`font-serif text-5xl tracking-wide ${titleColor}`}
            >
                TOPIA
            </h1>

            <p
                className={`text-xs font-papyrus tracking-tighter ${sloganColor}`}
            >
                Sustain Life on Earth
            </p>
        </div>
    );
}
// 中小型 Logo：h-20 sm:h-24 md:h-28 → 80px / 96px / 112px
// 中等 Logo：h-24 sm:h-28 md:h-32 → 96px / 112px / 128px
// 大 Logo：h-28 sm:h-32 md:h-36 → 112px / 128px / 144px
// 特大 Logo：h-32 sm:h-36 md:h-40 → 128px / 144px / 160px
// 超大 Hero Logo：h-36 sm:h-40 md:h-44 → 144px / 160px / 176px