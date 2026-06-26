import ProductCard from '@/components/products/ProductCard';
import PriceRange from '@/components/products/search/proceRange/PriceRange';
import Searchs from '@/components/products/search/Searchs';
import SelectsCatagory from '@/components/products/Selects/SelectsCatagory';
import { useGetProductsQuery } from '@/redux/fetures/products/productsApi';
import Loding from '@/utils/Loding';
import { useState } from 'react';

const Products = () => {
  const [catagory, setCatagory] = useState();
  const [search, setSearch] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const query = {
    catagory,
    search,
    minPrice,
    maxPrice,
  };

  const { data } = useGetProductsQuery(query);

  if (!data) {
    return <Loding />;
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Filter Sidebar */}
        <aside className="col-span-1 lg:col-span-3">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-24 self-start flex flex-col gap-6 text-left">
            <h3 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-3 mb-1 uppercase tracking-tight">
              Filters
            </h3>
            
            {/* Search filter */}
            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                Search Products
              </h4>
              <Searchs setSearch={setSearch} />
            </div>

            {/* Category filter */}
            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                Categories
              </h4>
              <SelectsCatagory setValues={setCatagory} />
            </div>

            {/* Price filter */}
            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                Price Range
              </h4>
              <PriceRange setMixPrice={setMaxPrice} setMinPrice={setMinPrice} />
            </div>
          </div>
        </aside>

        {/* Right Catalog Products List */}
        <main className="col-span-1 lg:col-span-9">
          {/* Catalog header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-5 gap-4">
            <div className="text-left">
              <span className="text-xs font-extrabold tracking-widest text-brand-primary uppercase">
                FIT-EQ CATALOG
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
                All Fitness Gear
              </h1>
            </div>
            
            {/* Count Badge */}
            <span className="bg-brand-primary-light text-brand-primary text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-brand-primary/20 uppercase tracking-wider self-start sm:self-center">
              {data?.data?.length === 1 ? '1 Product Found' : `${data?.data?.length || 0} Products Found`}
            </span>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {// eslint-disable-next-line @typescript-eslint/no-explicit-any
              data?.data?.map((card: any) => (
                <ProductCard key={card._id} card={card} />
              ))}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Products;
