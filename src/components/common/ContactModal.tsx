import { useEffect, useRef, useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    title?: string;
};

export default function ContactModal({ open, onClose, title = "Contact Us" }: Props) {
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const firstFieldRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey, { passive: true });
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (open) setTimeout(() => firstFieldRef.current?.focus(), 0);
    }, [open]);

    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        const fd = new FormData(e.currentTarget);
        const name = String(fd.get("name") || "");
        const email = String(fd.get("email") || "");
        const msg = String(fd.get("message") || "");
        if (!name || !email || !msg) {
            setError("Please fill out all fields.");
            return;
        }
        setSending(true);

        // Demo：直接印在 console；要串後端可換成 fetch(...)
        console.log({ name, email, msg });

        e.currentTarget.reset();
        setSending(false);
        onClose();
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            aria-modal="true"
            role="dialog"
            aria-labelledby="contact-title"
        >
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                ref={dialogRef}
                className="relative mx-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
            >
                <div className="p-6 md:p-10">
                    <div className="mb-6 text-center">
                        <h3 id="contact-title" className="text-2xl md:text-3xl font-semibold">
                            {title}
                        </h3>
                        <div className="mx-auto mt-2 h-0.5 w-14 rounded bg-yellow-50" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 text-left">
                                Full Name
                            </label>
                            <input
                                ref={firstFieldRef}
                                name="name"
                                type="text"
                                placeholder="What's your full name?"
                                className="mt-1 w-full border-0 border-b border-slate-300/70 bg-transparent px-0 py-2 outline-none
                     focus:border-green-600 focus:ring-0 hover:border-green-600"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 text-left">
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Where can we reach you?"
                                className="mt-1 w-full border-0 border-b border-slate-300/70 bg-transparent px-0 py-2 outline-none
                     focus:border-green-600 focus:ring-0 hover:border-green-600"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 text-left">
                                Your Message
                            </label>
                            <textarea
                                name="message"
                                rows={5}
                                placeholder="Tell us how we can help you…"
                                className="mt-1 w-full rounded-lg border border-slate-300/70 px-3 py-2 outline-none
                     focus:border-green-600 focus:ring-1 focus:ring-green-600 hover:border-green-600"
                                required
                            />
                        </div>

                        {error && <p className="text-sm text-red-600">{error}</p>}

                        <div className="flex justify-center pt-2">
                            <button
                                type="submit"
                                disabled={sending}
                                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-2.5 text-gray-50 
                     hover:bg-yellow-50 hover:text-green-600 disabled:opacity-60 transition-colors"
                            >
                                {sending ? "Sending…" : "Submit"}
                                {!sending && (
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden
                                    >
                                        <path d="M2.94 2.94a1.5 1.5 0 0 1 1.57-.34l12.5 4.69a1 1 0 0 1 0 1.86L10.9 11.7l-1.9 6a1 1 0 0 1-1.9-.08L5.9 12.6 2.6 10.4a1 1 0 0 1 .34-1.77l4.4-1.5-4.06-3.2a1.5 1.5 0 0 1-.35-1.99z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </form>

                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}