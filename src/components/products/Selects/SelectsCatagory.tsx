/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductsCatagoreQuery } from '@/redux/fetures/products/productsApi';
import Loding from '@/utils/Loding';
import { Select } from 'antd';

const SelectsCatagory = ({ setValues }: any) => {
  const { data: catagory } = useGetProductsCatagoreQuery(undefined);
  if (!catagory) {
    return <Loding />;
  }
  const option = catagory.data.map((cata: any) => {
    const options = { label: cata, value: cata };

    return options;
  });
  const handleChange = (value: any) => {
    const valueArray = value.map((val: any) => val.value);
    setValues(valueArray);
  };

  return (
    <div>
      <Select
        mode="multiple"
        allowClear
        className="w-10"
        style={{ width: '100%' }}
        labelInValue
        placeholder="Catagory"
        defaultValue={option}
        onChange={handleChange}
        options={option}
      />
    </div>
  );
};

export default SelectsCatagory;
