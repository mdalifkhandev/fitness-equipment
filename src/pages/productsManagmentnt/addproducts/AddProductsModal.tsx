/* eslint-disable no-console */
import { useCreateProductsMutation } from '@/redux/fetures/products/productsApi';
import { FileAddOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  Modal,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;
const imageUploadUrl = `https://api.imgbb.com/1/upload`;

type FieldType = {
  productsName: string;
  image: {
    img1: string;
  };
  price: number;
  discreption: string;
  extarDiscreptionHeader: string;
  extarDiscreptionDetails: string;
  catagory: string;
  instock: number;
  discount: number;
};

const AddProductsModal = () => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [createData] = useCreateProductsMutation();

  const uploadImageToImgbb = async (imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append('key', imgbbAPIKey);
      formData.append('image', imageFile);

      const response = await axios.post(imageUploadUrl, formData);
      return response.data.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    try {
      const uploadedImageUrl = await uploadImageToImgbb(file);
      setImageUrl(uploadedImageUrl);
      setLoading(false);
    } catch (error) {
      console.error('Failed to upload image:', error);
      setLoading(false);
    }
    return false;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    if (!imageUrl) {
      return console.error('Please upload an image before submitting.');
    }

    const productData = {
      image: {
        img1: imageUrl,
      },
      name: values.productsName,
      extarDiscreption: {
        header: values.extarDiscreptionHeader,
        details: values.extarDiscreptionDetails,
      },
      price: values.price,
      discreption: values.discreption,
      catagory: values.catagory,
      instock: values.instock,
      discount: values.discount,
    };

    try {
      const res = await createData({ productData });
      console.log(res.data.message);
      toast.success(res.data.message);
      setOpen(false);
    } catch (error) {
      console.error('Failed to submit product data:', error);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };

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
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Products Name"
            name="productsName"
            rules={[
              { required: true, message: 'Please input your Products Name!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input your Price!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item<FieldType>
            label="Discreption"
            name="discreption"
            rules={[
              { required: true, message: 'Please input your Discreption!' },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item<FieldType>
            label="Exter Discreption Header"
            name="extarDiscreptionHeader"
            rules={[
              {
                required: true,
                message: 'Please input your Extra Discreption Header!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Extra Discreption Details"
            name="extarDiscreptionDetails"
            rules={[
              {
                required: true,
                message: 'Please input your Extra Discreption Details!',
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item<FieldType>
            label="Catagory"
            name="catagory"
            rules={[{ required: true, message: 'Please input your Catagory!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Stock"
            name="instock"
            rules={[{ required: true, message: 'Please input your Stock!' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item<FieldType>
            label="Discount"
            name="discount"
            rules={[{ required: true, message: 'Please input your Discount!' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item<FieldType>
            label="Products Image"
            name="image"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={handleImageUpload}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="uploaded image"
                  style={{ width: '100%' }}
                />
              ) : (
                <div>
                  {loading ? <PlusOutlined spin /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" disabled={loading} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProductsModal;
