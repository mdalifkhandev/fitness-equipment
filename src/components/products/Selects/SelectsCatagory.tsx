/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductsCatagoreQuery } from '@/redux/fetures/products/productsApi';
import Loding from '@/utils/Loding';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const SelectsCatagory = ({ setValues }: any) => {
  const navigate = useNavigate();
  const { data: catagory } = useGetProductsCatagoreQuery(undefined);
  if (!catagory) {
    return <Loding />;
  }
  const option = catagory.data.map((cata: any) => {
    const options = { label: cata, value: cata };

    return options;
  });
  const handleChange = (value: any) => {
    setValues(value.value);
    navigate(`?catagory=${value.value}`);
  };

  return (
    <div>
      <Select
        style={{ width: '100%' }}
        labelInValue
        defaultValue="Catagory"
        onChange={handleChange}
        options={option}
      />
    </div>
  );
};

export default SelectsCatagory;
