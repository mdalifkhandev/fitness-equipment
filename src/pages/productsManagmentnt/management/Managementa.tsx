/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductsQuery, useGetProductsCatagoreQuery } from '@/redux/fetures/products/productsApi';
import { useState } from 'react';
import Loding from '@/utils/Loding';
import { Table, Space, Select, Input } from 'antd';
import DeleteProducts from '../allproductsmng/DeleteProducts';
import UpdathProducta from '../allproductsmng/UpdathProducta';
import AddProductsModal from '../addproducts/AddProductsModal';
import { Package, DollarSign, AlertTriangle, Tag } from 'lucide-react';

const Managementa = () => {
  const [catagory, setCatagory] = useState<string>();
  const [search, setSearch] = useState<string>();
  const [maxPrice] = useState<number>();
  const [minPrice] = useState<number>();

  const query = {
    catagory,
    search,
    minPrice,
    maxPrice,
  };

  const { data } = useGetProductsQuery(query);
  const { data: categoriesData } = useGetProductsCatagoreQuery(undefined);

  if (!data?.data) {
    return <Loding />;
  }

  // Calculate statistics from current dataset
  const totalProducts = data.data.length;
  const inventoryValue = data.data.reduce(
    (acc: number, item: any) => acc + (item.price || 0) * (item.instock || 0),
    0
  );
  const lowStockCount = data.data.filter((item: any) => (item.instock || 0) < 5).length;
  const averageDiscount = totalProducts
    ? Math.round(
        data.data.reduce((acc: number, item: any) => acc + (item.discount || 0), 0) /
          totalProducts
      )
    : 0;

  const dataSource = data.data.map((product: any, index: number) => ({
    ...product,
    key: product._id || index,
  }));

  const categoriesOptions = categoriesData?.data?.map((cat: string) => ({
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    value: cat,
  })) || [];

  const columns = [
    {
      title: 'Product',
      key: 'product',
      render: (_: any, record: any) => {
        const imageUrl = record.image && typeof record.image === 'object' ? record.image.img1 : record.image;
        return (
          <div className="flex items-center gap-3 text-left">
            <img 
              src={imageUrl} 
              alt={record.name} 
              className="w-10 h-10 rounded-lg object-cover bg-gray-50 border border-gray-100 shrink-0" 
            />
            <span className="font-semibold text-gray-900 line-clamp-1">{record.name}</span>
          </div>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'catagory',
      key: 'catagory',
      render: (cat: string) => (
        <span className="px-2.5 py-1 text-xs font-bold text-gray-600 bg-gray-100 rounded-full uppercase tracking-wider capitalize">
          {cat}
        </span>
      ),
    },
    {
      title: 'Stock Status',
      key: 'stock',
      render: (_: any, record: any) => {
        const stock = record.instock || 0;
        if (stock === 0) {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-red-700 bg-red-50 border border-red-100 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          );
        } else if (stock < 5) {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-100 rounded-full uppercase tracking-wider">
              Low Stock ({stock})
            </span>
          );
        } else {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-green-700 bg-green-50 border border-green-100 rounded-full uppercase tracking-wider">
              In Stock ({stock})
            </span>
          );
        }
      },
    },
    {
      title: 'Price',
      key: 'price',
      render: (_: any, record: any) => {
        const hasDiscount = record.discount > 0;
        const discountPrice = Math.ceil(record.price - (record.price / 100) * record.discount);
        return (
          <div className="flex items-center gap-2 font-bold justify-start">
            <span className="text-gray-900 text-sm">${hasDiscount ? discountPrice : record.price}</span>
            {hasDiscount && (
              <>
                <span className="text-xs text-gray-400 line-through">${record.price}</span>
                <span className="text-[10px] bg-red-50 text-red-600 border border-red-100 px-1.5 py-0.5 rounded-md font-extrabold uppercase">
                  -{record.discount}%
                </span>
              </>
            )}
          </div>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle" className="justify-center flex">
          <UpdathProducta data={record} />
          <DeleteProducts data={record} />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-left">
          <span className="text-xs font-extrabold tracking-widest text-brand-primary uppercase">
            Admin Workspace
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-1">
            Products Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your inventory, monitor stock health, and adjust details.
          </p>
        </div>
        <div className="self-start md:self-center">
          <AddProductsModal />
        </div>
      </div>

      {/* Stats Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat 1: Total Products */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 text-left">
          <div className="w-12 h-12 rounded-xl bg-brand-primary-light flex items-center justify-center text-brand-primary shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Products</p>
            <h3 className="text-2xl font-black text-gray-900 mt-0.5">{totalProducts}</h3>
          </div>
        </div>

        {/* Stat 2: Total Inventory Value */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 text-left">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Inventory Value</p>
            <h3 className="text-2xl font-black text-gray-900 mt-0.5">${inventoryValue.toLocaleString()}</h3>
          </div>
        </div>

        {/* Stat 3: Low Stock Alerts */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 text-left">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Low Stock Alerts</p>
            <h3 className="text-2xl font-black text-gray-900 mt-0.5">{lowStockCount}</h3>
          </div>
        </div>

        {/* Stat 4: Average Discount */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Avg. Discount</p>
            <h3 className="text-2xl font-black text-gray-900 mt-0.5">{averageDiscount}%</h3>
          </div>
        </div>
      </div>

      {/* Control row for filters */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
          <Input.Search
            placeholder="Search products by name..."
            allowClear
            onSearch={(value) => setSearch(value || undefined)}
            onChange={(e) => !e.target.value && setSearch(undefined)}
            style={{ width: 280 }}
            className="rounded-xl overflow-hidden"
          />
          <Select
            placeholder="Filter by Category"
            allowClear
            onChange={(value) => setCatagory(value || undefined)}
            style={{ width: 200 }}
            options={categoriesOptions}
          />
        </div>
        <div className="text-sm font-semibold text-gray-500">
          Showing {dataSource.length} of {totalProducts} items
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-2">
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          pagination={{ defaultPageSize: 10, showSizeChanger: true, className: "px-4" }}
        />
      </div>
    </div>
  );
};

export default Managementa;
