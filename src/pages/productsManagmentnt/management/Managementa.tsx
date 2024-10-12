/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductsQuery } from '@/redux/fetures/products/productsApi';
import { useState } from 'react';
import Loding from '@/utils/Loding';
import { Card, Space, Table } from 'antd';
import DeleteProducts from '../allproductsmng/DeleteProducts';
import UpdathProducta from '../allproductsmng/UpdathProducta';
import AddProductsModal from '../addproducts/AddProductsModal';

const Managementa = () => {
  const [catagory] = useState();
  const [search] = useState();
  const [maxPrice] = useState();
  const [minPrice] = useState();
  const query = {
    catagory,
    search,
    minPrice,
    maxPrice,
  };
  const { data } = useGetProductsQuery(query);
  if (!data?.data) {
    return <Loding />;
  }

  const dataSource = data.data.map((product: any, index: number) => ({
    ...product,
    key: product._id || index,
  }));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Catagory',
      dataIndex: 'catagory',
      key: 'catagory',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: '_id',
      render: (_: any, record: any) => {
        return (
          <Space size="small" className="justify-center flex">
            <DeleteProducts data={record} />
            <UpdathProducta data={record} />
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Card title="Products List " extra={<AddProductsModal />}>
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
};

export default Managementa;
