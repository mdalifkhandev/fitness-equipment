/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from 'antd';
import { useState } from 'react';
import img from '@/assets/confirm/confirm.jpg';
import { useDeleteProductsMutation } from '@/redux/fetures/products/productsApi';
import { toast } from 'sonner';
const DeleteProducts = ({ data }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleted] = useDeleteProductsMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const res = await deleted({ id: data._id }).unwrap();
      setIsModalOpen(false);
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Deleted
      </Button>
      <Modal
        title="Confirm Deleted"
        className=" "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img src={img} width={200} className="mx-32" alt="" />
      </Modal>
    </div>
  );
};

export default DeleteProducts;
