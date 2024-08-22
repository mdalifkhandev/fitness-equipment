import { useGetProductsCatagoreQuery } from '@/redux/fetures/products/productsApi';
import Loding from '@/utils/Loding';
import { Link } from 'react-router-dom';

const Catagory = () => {
  const { data } = useGetProductsCatagoreQuery(undefined);
  if (!data) {
    return <Loding />;
  }

  return (
    <div>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.data.map((d: any) => (
          <Link to={`/products?catagory=${d}`}>{d}</Link>
        ))
      }
    </div>
  );
};

export default Catagory;
