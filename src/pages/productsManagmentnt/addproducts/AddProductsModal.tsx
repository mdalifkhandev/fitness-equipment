import { FileAddOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';

const AddProductsModal = () => {
  const [open, setOpen] = useState(false); 

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add New
        <FileAddOutlined />
      </Button>
      
      <Modal
        title="Add New Items"
        centered
        open={open} 
        onCancel={() => setOpen(false)}
        footer={null} 
        width={1000}
      >

      </Modal>
    </div>
  );
};

export default AddProductsModal;
