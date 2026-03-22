import { useState, useEffect, useRef } from 'react';

export const usePreloadAssets = (
    assetGroups: Record<string, string[]>,
    concurrency = 6
) => {
    const [progress, setProgress] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const cacheRef = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        const allUrls = Array.from(new Set(Object.values(assetGroups).flat()));

        if (allUrls.length === 0) {
            setIsReady(true);
            return;
        }

        let loaded = 0;
        const total = allUrls.length;

        const updateProgress = () => {
            loaded++;
            setProgress(Math.round((loaded / total) * 100));
            if (loaded === total) {
                requestAnimationFrame(() => {
                    setIsReady(true);
                });
            }
        };

        const loadImage = async (url: string) => {
            const img = new Image();
            img.src = url;

            try {
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });

                if (img.decode) {
                    await img.decode().catch(() => { });
                }
            } finally {
                cacheRef.current.push(img);
                updateProgress();
            }
        };

        const queue = [...allUrls];
        const workers: Promise<void>[] = [];

        const worker = async () => {
            while (queue.length) {
                const url = queue.shift();
                if (!url) return;
                await loadImage(url);
            }
        };

        for (let i = 0; i < concurrency; i++) {
            workers.push(worker());
        }

        Promise.all(workers);

    }, [assetGroups, concurrency]);

    return { progress, isReady };
};