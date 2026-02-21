import {
  useEffect,
  useLayoutEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";

const ASPECT_RATIO = 16 / 9;
const LOGICAL_WIDTH = 1920;
const LOGICAL_HEIGHT = LOGICAL_WIDTH / ASPECT_RATIO; // ≈ 787.5

export const ResponsiveUI: FC<PropsWithChildren<{ zIndex?: number }>> = ({
  children,
  zIndex = 10,
}) => {
  const [scale, setScale] = useState(1);

  const [marginLeft, setMarginLeft] = useState(0);
  const [marginTop, setMarginTop] = useState(0);

  useLayoutEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Вариант 1: масштабируем под ширину → получаем требуемую высоту
      const requiredHeight = vw / ASPECT_RATIO;
      // Вариант 2: масштабируем под высоту → получаем требуемую ширину
      const requiredWidth = vh * ASPECT_RATIO;

      let newScale: number;

      if (requiredHeight <= vh) {
        // Всё помещается при масштабе по ширине → используем его
        newScale = vw / LOGICAL_WIDTH;
      } else {
        newScale = vh / LOGICAL_HEIGHT;
        // Не помещается → масштабируем по высоте
      }

      // 🔥 Убираем ограничение — масштабируем ВСЕГДА (вверх и вниз)
      setScale(newScale);
      setMarginLeft(
        Math.max(0, window.innerWidth - LOGICAL_WIDTH * newScale) / 2,
      );
      setMarginTop(
        Math.max(0, window.innerHeight - LOGICAL_HEIGHT * newScale) / 2,
      );
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // console.log(LOGICAL_WIDTH * scale, window.innerWidth, scale);

  return (
    <div
      className="w-dvw inset-0 h-dvh absolute z-10 overflow-hidden"
      style={{ zIndex }}
    >
      <div
        style={{
          width: LOGICAL_WIDTH,
          height: LOGICAL_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "relative",
          marginLeft: `${marginLeft}px`,
          // marginTop: `${marginTop}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
