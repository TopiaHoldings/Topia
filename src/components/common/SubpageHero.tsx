// src/components/common/SubpageHero.tsx
type Props = {
    /** 背景圖片路徑 */
    bgImage: string;
    /** 子頁標題 */
    title: string;
};

export default function SubpageHero({ bgImage, title }: Props) {
    return (
        <section
            className="relative h-[33vh] w-full flex items-center justify-center overflow-hidden"
            aria-label={title}
        >
            <img
                src={bgImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover -z-10"
            />

            <div className="absolute inset-0 bg-black/30 -z-0" />

            <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-white drop-shadow-md text-center">
                {title}
            </h1>
        </section>
    );
}