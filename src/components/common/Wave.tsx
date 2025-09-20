// src/components/common/WaveDivider.tsx
type WaveDividerProps = {
    position?: "top" | "bottom";
    mode?: "light" | "dark";
    className?: string;
};

export default function Wave({ position = "top", className = "", mode = "dark" }: WaveDividerProps) {
    const color = mode === "dark" ? "text-green-600" : "text-gray-50";
    return (
        <div
            className={[
                "absolute inset-x-0 w-full overflow-hidden leading-none",
                position === "top" ? "top-0 -translate-y-full rotate-180" : "bottom-0 translate-y-full",
                className,
            ].join(" ")}
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 1440 120"
                xmlns="http://www.w3.org/2000/svg"
                className="relative block w-full h-[120px]"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,64L48,80C96,96,192,128,288,117.3C384,107,480,53,576,37.3C672,21,768,43,864,53.3C960,64,1056,64,1152,53.3C1248,43,1344,21,1392,10.7L1440,0L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    className={`fill-current ${color}`}
                />
            </svg>
        </div>
    );
}