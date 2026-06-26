/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdathProductsMutation } from '@/redux/fetures/products/productsApi';
import { Button, Form, FormProps, Input, InputNumber, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { toast } from 'sonner';

type FieldType = {
  name: string;
  image: string;
  price: number;
  discreption: string;
  catagory: string;
  instock: number;
  discount: number;
};

const UpdateProductModal = ({ data }: any) => {
  const [open, setOpen] = useState(false);
  const [updath] = useUpdathProductsMutation();
  const [form] = Form.useForm();

  const handleModelButton = () => {
    form.setFieldsValue({
      name: data.name,
      discount: data.discount,
      price: data.price,
      catagory: data.catagory,
      discreption: data.discreption,
      instock: data.instock,
      image: data.image?.img1 || data.image,
    });
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    const userInfo = {
      name: values.name,
      price: values.price,
      discount: values.discount,
      image: {
        img1: values.image,
      },
      catagory: values.catagory,
      discreption: values.discreption,
      instock: values.instock,
    };

    const id = data._id as string;
    try {
      const res = await updath({ id, userInfo }).unwrap();
      toast.success(res.message || 'Product updated successfully!');
      setOpen(false);
    } catch (error: any) {
      console.error('Failed to submit product update:', error);
      toast.error(error.data?.message || 'Failed to update product.');
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Button 
        onClick={handleModelButton}
        className="border-gray-200 text-gray-700 hover:text-brand-primary hover:border-brand-primary rounded-lg font-bold"
      >
        Update
      </Button>

      <Modal
        title={
          <div className="text-left pb-3 border-b border-gray-100 mt-2">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Update Product</h2>
            <p className="text-xs text-gray-400 font-medium normal-case mt-0.5">Edit specifications for "{data.name}".</p>
          </div>
        }
        centered
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          name="updateProductForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="pt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
            {/* Left Column */}
            <div className="flex flex-col gap-1">
              <Form.Item<FieldType>
                label={<span className="font-bold text-gray-700 text-sm">Product Name</span>}
                name="name"
                rules={[{ required: true, message: 'Please input your Name!' }]}
              >
                <Input placeholder="Product name" className="rounded-xl h-11" />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item<FieldType>
                  label={<span className="font-bold text-gray-700 text-sm">Price ($)</span>}
                  name="price"
                  rules={[{ required: true, message: 'Please input your Price!' }]}
                >
                  <InputNumber min={0} placeholder="Price" className="w-full rounded-xl h-11 flex items-center" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<FieldType>
                  label={<span className="font-bold text-gray-700 text-sm">Discount (%)</span>}
                  name="discount"
                  rules={[{ required: true, message: 'Please input your Discount!' }]}
                >
                  <InputNumber min={0} max={100} placeholder="Discount" className="w-full rounded-xl h-11 flex items-center" style={{ width: '100%' }} />
                </Form.Item>
              </div>

              <Form.Item<FieldType>
                label={<span className="font-bold text-gray-700 text-sm">Category</span>}
                name="catagory"
                rules={[{ required: true, message: 'Please input your Category!' }]}
              >
                <Input placeholder="Category" className="rounded-xl h-11" />
              </Form.Item>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-2 gap-4">
                <Form.Item<FieldType>
                  label={<span className="font-bold text-gray-700 text-sm">Stock Quantity</span>}
                  name="instock"
                  rules={[{ required: true, message: 'Please input your Stock!' }]}
                >
                  <InputNumber min={0} placeholder="Stock" className="w-full rounded-xl h-11 flex items-center" style={{ width: '100%' }} />
                </Form.Item>
                <div /> {/* Spacer */}
              </div>

              <Form.Item<FieldType>
                label={<span className="font-bold text-gray-700 text-sm">Image Link (URL)</span>}
                name="image"
                rules={[{ required: true, message: 'Please input your Image URL!' }]}
              >
                <Input placeholder="Image URL" className="rounded-xl h-11" />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="font-bold text-gray-700 text-sm">Description</span>}
                name="discreption"
                rules={[{ required: true, message: 'Please input your Description!' }]}
              >
                <TextArea rows={4} placeholder="Product description..." className="rounded-xl p-3" />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 mt-6">
            <Button onClick={() => setOpen(false)} className="rounded-xl h-11 px-6 font-bold text-gray-600">
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="bg-brand-primary hover:bg-brand-primary-hover rounded-xl h-11 px-8 font-bold border-0"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateProductModal;
