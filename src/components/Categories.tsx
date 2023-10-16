import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

/**
 * Renders a category selection component.
 *
 * @param categories - An array of category names.
 * @param selectedCategory - The selected category.
 * @param onSelect - Callback function when a category is selected.
 */
function Categories({ categories, selectedCategory, onSelect }: CategoryProps) {
  // State variables
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [translate, setTranslate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update visibility of left and right arrows
    const updateArrowVisibility = () => {
      if (containerRef.current === null) return;

      const container = containerRef.current;
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    };

    // Observe resize changes
    const observer = new ResizeObserver(updateArrowVisibility);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div className="overflow-x-hidden relative" ref={containerRef}>
      {/* Category buttons */}
      <div
        className="flex whitespace-nowrap gap-3 
        transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            variant={selectedCategory === category ? "dark" : "default"}
            onClick={() => onSelect(category)}
            className="py-1 px-3 rounded-lg
        whitespace-nowrap"
            key={category}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Arrow on the left side */}
      {isLeftVisible && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50%
        to-transparent w-24 h-full"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((currentTranslate) => {
                const newTranslate = currentTranslate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}

      {/* Arrow on the right side */}
      {isRightVisible && (
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50%
          to-transparent w-24 h-full flex justify-end"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) {
                  return translate;
                }
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge - width;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
export default Categories;
