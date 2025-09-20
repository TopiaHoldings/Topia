import React from "react";

// src: 內容圖片
// texture: 遮罩圖
// maskScale: 遮罩縮放（1=填滿，0.8=縮小到80%）
// aspectRatio: 預設 16/9，可改 4/3、1/1 依需求
export function MaskedImg({
    src,
    texture,
    className = "",
    maskScale = 1,
    aspectRatio = 16 / 9,
}: {
    src: string;
    texture: string;
    className?: string;
    maskScale?: number;
    aspectRatio?: number;
}) {
    const width = 1600; // 高解析（僅用於 viewBox，不影響實際 RWD）
    const height = Math.round(width / aspectRatio);
    const maskWidth = width * maskScale;
    const maskHeight = height * maskScale;
    const maskX = (width - maskWidth) / 2;
    const maskY = (height - maskHeight) / 2;

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            className={`rounded-2xl ${className}`}
            style={{ display: "block" }}
            preserveAspectRatio="xMidYMid slice"
        >
            <defs>
                <mask id="mask" maskUnits="userSpaceOnUse">
                    <g filter="url(#whitefilter)">
                        <image
                            href={texture}
                            x={maskX}
                            y={maskY}
                            width={maskWidth}
                            height={maskHeight}
                            preserveAspectRatio="none"
                        />
                    </g>
                </mask>
                <filter id="whitefilter">
                    <feFlood floodColor="white" />
                    <feComposite in2="SourceAlpha" operator="in" />
                </filter>
            </defs>
            <image
                href={src}
                width={width}
                height={height}
                preserveAspectRatio="xMidYMid slice"
                mask="url(#mask)"
            />
        </svg>
    );
}