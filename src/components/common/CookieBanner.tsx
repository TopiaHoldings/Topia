// src/components/common/CookieBanner.tsx
import { useEffect, useState } from "react";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        // console.log(consent);
        if (!consent) {
            setVisible(true);
        }
    }, []);

    function handleConsent(choice: "accepted" | "declined") {
        localStorage.setItem("cookie-consent", choice);
        if (choice === "accepted") {
            document.dispatchEvent(new CustomEvent("loadGA", { detail: "G-JY0BNJRZS6" }));
            console.log("Google Analytics loaded");
        }
        setVisible(false);
    }
    return (
        <>
            {visible && (
                <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white px-6 py-4 flex flex-col gap-3 z-50 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm">
                        <p>
                            This site uses cookies to analyze traffic and improve your
                            experience.{" "}
                            <button
                                onClick={() => setShowInfo(!showInfo)}
                                className="underline text-emerald-400"
                            >
                                {showInfo ? "Hide details" : "Learn more"}
                            </button>
                            .
                        </p>
                        {showInfo && (
                            <div className="mt-2 text-xs text-gray-300 leading-relaxed max-w-md">
                                We use cookies to help us understand how visitors use our
                                website. This includes anonymous analytics data via Google
                                Analytics, which tracks page views, device types, and traffic
                                sources. You can choose to accept or decline cookies at any
                                time.
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button
                            className="bg-emerald-600 hover:bg-yellow-50 text-white text-sm font-medium px-4 py-2 rounded"
                            onClick={() => handleConsent("accepted")}
                        >
                            Accept
                        </button>
                        <button
                            className="bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium px-4 py-2 rounded"
                            onClick={() => handleConsent("declined")}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}