/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdathProductsMutation } from '@/redux/fetures/products/productsApi';
import { Button, Form, FormProps, Input, Modal } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';

type FieldType = {
  name: string;
  image: object;
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
      image: data.image?.img1,
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
    const res = await updath({ id, userInfo }).unwrap();
    toast.success(res.message);

    setOpen(false);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Button onClick={handleModelButton}>Update</Button>

      <Modal
        title="Update Product"
        visible={open}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="updateProductForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ message: 'Please input your Name!' }]}
          >
            <Input placeholder={data.name} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Discount"
            name="discount"
            rules={[{ message: 'Please input your Discount!' }]}
          >
            <Input placeholder={data.discount} type="number" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Catagory"
            name="catagory"
            rules={[{ message: 'Please input your Catagory!' }]}
          >
            <Input placeholder={data.catagory} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Price"
            name="price"
            rules={[{ message: 'Please input your Price!' }]}
          >
            <Input placeholder={data.price} type="number" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Discreption"
            name="discreption"
            rules={[{ message: 'Please input your Discreption!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Stock"
            name="instock"
            rules={[{ message: 'Please input your Stock!' }]}
          >
            <Input placeholder={data.instock} type="number" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Image Link"
            name="image"
            rules={[{ message: 'Please input your Image!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateProductModal;
