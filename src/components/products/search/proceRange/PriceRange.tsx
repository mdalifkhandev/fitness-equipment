/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from 'antd';

const PriceRange = ({ setMinPrice, setMixPrice }: any) => {
  const onFinish = (event: any) => {
    event.preventDefault();
    const mix = event.target.mix.value;
    const min = event.target.min.value;
    setMinPrice(min);
    setMixPrice(mix);
  };

  return (
    <div className="w-full pt-1">
      <form onSubmit={onFinish} className="flex flex-col gap-3 w-full">
        <div className="flex items-center gap-2">
          <Input 
            name="min" 
            type="number" 
            placeholder="Min" 
            className="rounded-xl border-gray-200" 
          />
          <span className="text-gray-400 font-bold">-</span>
          <Input 
            name="mix" 
            type="number" 
            placeholder="Max" 
            className="rounded-xl border-gray-200" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-brand-secondary hover:bg-brand-secondary-hover text-white font-bold rounded-xl h-10 shadow-sm transition-all flex items-center justify-center"
        >
          Apply Price
        </button>
      </form>
    </div>
  );
};

export default PriceRange;
