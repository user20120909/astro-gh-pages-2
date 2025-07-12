import { useEffect, useRef, useState } from 'react';
import Button from './Button';

interface Props {
  items: string[];
  rows?: number;
}

const Shop: React.FC<Props> = ({ items, rows }) => {
  const [shownItems, setShownItems] = useState<string[]>(items);

  useEffect(() => {
    setShownItems([...shownItems].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 w-full">
        {shownItems.slice(0, (rows ?? 1) * 2).map((src, idx) => (
          <div key={idx} className="aspect-square p-2">
            <a href="https://sjop.meidenlife.nl" target="_blank">
              <img
                src={src}
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
