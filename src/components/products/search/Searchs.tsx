/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const Searchs = ({ setSearch }: any) => {
  const onSearch: SearchProps['onSearch'] = value => {
    setSearch(value);
  };
  return (
    <div>
      <Space direction="vertical">
        <Search
          placeholder="Products search by name"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Space>
    </div>
  );
};

export default Searchs;
