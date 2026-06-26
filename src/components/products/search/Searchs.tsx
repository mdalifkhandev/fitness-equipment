/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from 'antd';
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const Searchs = ({ setSearch }: any) => {
  const onSearch: SearchProps['onSearch'] = value => {
    setSearch(value);
  };
  return (
    <div className="w-full pt-1">
      <Search
        placeholder="Search products..."
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        className="rounded-xl overflow-hidden"
      />
    </div>
  );
};

export default Searchs;
