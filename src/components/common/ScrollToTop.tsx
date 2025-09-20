import { useEffect, useState } from "react";

export default function ScrollToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onScroll = () => setShow(window.scrollY > 240);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = () => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label="Scroll to top"
            title="Back to top"
            className={[
                "fixed bottom-6 right-6 z-50",
                "inline-flex items-center justify-center",
                "h-12 w-12 rounded-full",
                "bg-green-600 text-white",
                "bg-opacity-90 hover:bg-opacity-100",
                "shadow-xl hover:shadow-2xl",
                "hover:bg-yellow-50 hover:text-green-700",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-600",
                "transition-all duration-300",
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
            ].join(" ")}
        >
            <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
}