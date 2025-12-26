import { useEffect, useState } from 'react';
import Button from './Button';

interface Props {
  items: { url: string | null; img: string }[];
  rows?: number;
}

const Shop: React.FC<Props> = ({ items, rows }) => {
  const [shownItems, setShownItems] =
    useState<{ url: string | null; img: string }[]>(items);

  useEffect(() => {
    setShownItems([...shownItems].sort(() => Math.random() - 0.5));

    let currentIndex = 0;
    const interval = setInterval(() => {
      setShownItems((prev) => {
        const visibleCount = (rows ?? 1) * 2;
        const hiddenItems = prev.slice(visibleCount);

        if (hiddenItems.length === 0) return prev;

        const randomHiddenIndex = Math.floor(
          Math.random() * hiddenItems.length
        );

        const newItems = [...prev];
        [newItems[currentIndex], newItems[visibleCount + randomHiddenIndex]] = [
          newItems[visibleCount + randomHiddenIndex],
          newItems[currentIndex],
        ];

        currentIndex = (currentIndex + 1) % visibleCount;

        return newItems;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 w-full">
        {shownItems.slice(0, (rows ?? 1) * 2).map((item, idx) => (
          <div key={idx} className="aspect-square p-2">
            <a href={item.url ?? 'https://sjop.meidenlife.nl'} target="_blank">
              <img
                src={item.img}
                className="w-full h-full object-cover rounded border-3 border-pink-400"
              />
            </a>
          </div>
        ))}
      </div>
      <Button text="bekeik de hele sjop" href="https://sjop.meidenlife.nl" />
    </>
  );
};

export default Shop;
