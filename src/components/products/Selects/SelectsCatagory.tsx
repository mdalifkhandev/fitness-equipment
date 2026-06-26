/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductsCatagoreQuery } from '@/redux/fetures/products/productsApi';
import Loding from '@/utils/Loding';
import { Checkbox } from 'antd';
import { useState } from 'react';

const SelectsCatagory = ({ setValues }: any) => {
  const { data: catagory } = useGetProductsCatagoreQuery(undefined);
  const [checkedList, setCheckedList] = useState<any[]>([]);

  if (!catagory) {
    return <Loding />;
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const nextList = checked 
      ? [...checkedList, value] 
      : checkedList.filter(item => item !== value);
    setCheckedList(nextList);
    setValues(nextList);
  };

  return (
    <div className="flex flex-col gap-2.5 pt-1">
      {catagory.data.map((cata: any) => (
        <label 
          key={cata} 
          className="flex items-center gap-3 py-1 cursor-pointer group hover:text-brand-primary transition-colors duration-200"
        >
          <Checkbox
            checked={checkedList.includes(cata)}
            onChange={(e) => handleCheckboxChange(cata, e.target.checked)}
            className="group-hover:border-brand-primary scale-105"
          />
          <span className="text-sm font-semibold text-gray-600 group-hover:text-brand-primary transition-colors duration-200 capitalize">
            {cata}
          </span>
        </label>
      ))}
    </div>
  );
};

export default SelectsCatagory;
