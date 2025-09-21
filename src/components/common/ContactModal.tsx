// src/components/common/ContactModal.tsx
import { useEffect, useRef, useState } from "react";

type Props = { open: boolean; onClose: () => void; title?: string };

export default function ContactModal({ open, onClose, title = "Contact Us" }: Props) {
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
    const [success, setSuccess] = useState(false);

    // function encode(data: Record<string, string>) {
    //     return Object.keys(data)
    //         .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    //         .join("&");
    // }

    // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     setError(null);
    //     setSuccess(false);

    //     const fd = new FormData(e.currentTarget);
    //     const payload: Record<string, string> = {
    //         "form-name": "contact",
    //     };
    //     fd.forEach((value, key) => {
    //         payload[key] = value.toString();
    //     });

    //     setSending(true);
    //     try {
    //         await fetch("/", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //             body: encode(payload),
    //         });

    //         e.currentTarget.reset();
    //         setSuccess(true); // 顯示感謝訊息
    //     } catch (err) {
    //         setError("Submission failed. Please try again.");
    //     } finally {
    //         setSending(false);
    //     }
    // }
    function encode(data: Record<string, string>) {
        return Object.keys(data)
            .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
            .join("&");
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const fd = new FormData(e.currentTarget);
        const payload: Record<string, string> = { "form-name": "contact" };
        fd.forEach((v, k) => (payload[k] = String(v)));

        setSending(true);
        try {
            const res = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode(payload),
            });

            const successStatuses = [200, 201, 202, 204, 301, 302, 303];
            if (res.ok || successStatuses.includes(res.status)) {
                e.currentTarget.reset();
                setSuccess(true);
                return;
            }

            setError(`Submission failed (status ${res.status}). Please try again.`);
        } catch (err) {
            setError("Submission failed. Please try again.");
        } finally {
            setSending(false);
        }
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

            <div className="relative mx-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                <div className="p-6 md:p-10">
                    <div className="mb-6 text-center">
                        <h3
                            id="contact-title"
                            className="text-2xl md:text-3xl font-semibold"
                        >
                            {title}
                        </h3>
                        <div className="mx-auto mt-2 h-0.5 w-14 rounded bg-emerald-600" />
                    </div>

                    {success ? (
                        <div className="text-center py-10">
                            <h4 className="text-xl font-semibold text-emerald-700">
                                Thank you for your submission!
                            </h4>
                            <p className="mt-2 text-slate-600">
                                We have received your message and will get back to you soon.
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            name="contact"
                            method="POST"
                            data-netlify="true"
                            netlify-honeypot="bot-field"
                            noValidate
                            className="space-y-6"
                        >
                            {/* Netlify required hidden field */}
                            {/* <input type="hidden" name="form-name" value="contact" />
                            <input
                                type="text"
                                name="bot-field"
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                            /> */}

                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-slate-700 text-left"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    ref={firstFieldRef}
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="What's your full name?"
                                    className="mt-1 w-full border-0 border-b border-slate-300/70 bg-transparent px-0 py-2 outline-none focus:border-green-600 focus:ring-0 hover:border-green-600"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-700 text-left"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Where can we reach you?"
                                    autoComplete="email"
                                    className="mt-1 w-full border-0 border-b border-slate-300/70 bg-transparent px-0 py-2 outline-none focus:border-green-600 focus:ring-0 hover:border-green-600"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-slate-700 text-left"
                                >
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Tell us how we can help you…"
                                    autoComplete="off"
                                    className="mt-1 w-full rounded-lg border border-slate-300/70 px-3 py-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 hover:border-green-600"
                                    required
                                />
                            </div>

                            {error && <p className="text-sm text-red-600">{error}</p>}

                            <div className="flex justify-center pt-2">
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-2.5 text-gray-50 hover:bg-yellow-50 hover:text-green-600 disabled:opacity-60 transition-colors"
                                >
                                    {sending ? "Sending…" : "Submit"}
                                </button>
                            </div>
                        </form>
                    )}

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