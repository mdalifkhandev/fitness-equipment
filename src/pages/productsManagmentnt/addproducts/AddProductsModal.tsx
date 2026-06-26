/* eslint-disable no-console */
import { useCreateProductsMutation } from '@/redux/fetures/products/productsApi';
import { PlusOutlined, FileAddOutlined } from '@ant-design/icons';
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
  const [form] = Form.useForm();

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
      toast.success('Image uploaded successfully to ImgBB!');
    } catch (error) {
      console.error('Failed to upload image:', error);
      setLoading(false);
      toast.error('Image upload failed.');
    }
    return false;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    if (!imageUrl) {
      toast.error('Please upload a product image first.');
      return;
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
      const res = await createData({ productData }).unwrap();
      toast.success(res.message || 'Product created successfully!');
      form.resetFields();
      setImageUrl(null);
      setOpen(false);
    } catch (error: any) {
      console.error('Failed to submit product data:', error);
      toast.error(error.data?.message || 'Failed to create product.');
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleOpenModal = () => {
    form.resetFields();
    setImageUrl(null);
    setOpen(true);
  };

  return (
    <div>
      <Button 
        type="primary" 
        onClick={handleOpenModal}
        className="bg-brand-primary hover:bg-brand-primary-hover flex items-center gap-2 h-11 px-5 rounded-xl font-bold border-0 shadow-sm transition-all"
      >
        <span>Add Product</span>
        <FileAddOutlined />
      </Button>

      <Modal
        title={
          <div className="text-left pb-3 border-b border-gray-100 mt-2">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Add New Gear</h2>
            <p className="text-xs text-gray-400 font-medium normal-case mt-0.5">Publish new training gear to your public catalog.</p>
          </div>
        }
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={950}
        className="admin-form-modal"
      >
        <Form
          form={form}
          name="addProductForm"
          layout="vertical"
          initialValues={{ discount: 0, instock: 10 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="pt-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-1">
            {/* Left Column: Product Data & Media */}
            <div className="flex flex-col gap-1">
              <Form.Item<FieldType>
                label={<span className="font-bold text-gray-700 text-sm">Product Name</span>}
                name="productsName"
                rules={[{ required: true, message: 'Product Name is required!' }]}
              >
                <Input placeholder="e.g. Commercial Treadmill Elite" className="rounded-xl h-11" />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item<FieldType>
                  label={<span className="font-bold text-gray-700 text-sm">Price ($)</span>}
                  name="price"
                  rules={[{ required: true, message: 'Price is required!' }]}
                >
                  <InputNumber min={0} placeholder="Price" className="w-full rounded-xl h-11 flex items-center" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<FieldType>
                  label={<span className="font-bold text-gray-700 text-sm">Discount (%)</span>}
                  name="discount"
                  rules={[{ required: true, message: 'Discount is required!' }]}
                >
                  <InputNumber min={0} max={100} placeholder="Discount" className="w-full rounded-xl h-11 flex items-center" style={{ width: '100%' }} />
                </Form.Item>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item<FieldType>
                  label={<span className="font-bold text-gray-700 text-sm">Category</span>}
                  name="catagory"
                  rules={[{ required: true, message: 'Category is required!' }]}
                >
                  <Input placeholder="e.g. cardio" className="rounded-xl h-11" />
                </Form.Item>
                <Form.Item<FieldType>
                  label={<span className="font-bold text-gray-700 text-sm">Stock Quantity</span>}
                  name="instock"
                  rules={[{ required: true, message: 'Stock quantity is required!' }]}
                >
                  <InputNumber min={0} placeholder="Stock" className="w-full rounded-xl h-11 flex items-center" style={{ width: '100%' }} />
                </Form.Item>
              </div>

              <Form.Item
                label={<span className="font-bold text-gray-700 text-sm">Product Image</span>}
                required
              >
                <div className="flex items-center gap-4 border border-gray-100 p-4 rounded-2xl bg-gray-50/50">
                  <Upload
                    name="image"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={handleImageUpload}
                    className="avatar-uploader flex-shrink-0"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="uploaded image"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        {loading ? <PlusOutlined spin /> : <PlusOutlined className="text-lg" />}
                        <span className="text-xs mt-1 font-semibold">Upload</span>
                      </div>
                    )}
                  </Upload>
                  <div className="text-xs text-gray-500 text-left">
                    <p className="font-bold text-gray-700 mb-0.5">Image Upload via ImgBB</p>
                    <p className="leading-relaxed">Click card to select media. Supports JPG, PNG, WebP up to 5MB.</p>
                  </div>
                </div>
              </Form.Item>
            </div>

            {/* Right Column: Descriptions */}
            <div className="flex flex-col gap-1">
              <Form.Item<FieldType>
                label={<span className="font-bold text-gray-700 text-sm">Product Summary Description</span>}
                name="discreption"
                rules={[{ required: true, message: 'Summary Description is required!' }]}
              >
                <TextArea rows={4} placeholder="Summarize key features, warranty info, and details..." className="rounded-xl p-3" />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="font-bold text-gray-700 text-sm">Extra Description Header</span>}
                name="extarDiscreptionHeader"
                rules={[{ required: true, message: 'Extra Header is required!' }]}
              >
                <Input placeholder="e.g. Specifications & dimensions" className="rounded-xl h-11" />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="font-bold text-gray-700 text-sm">Extra Description Details</span>}
                name="extarDiscreptionDetails"
                rules={[{ required: true, message: 'Extra Details are required!' }]}
              >
                <TextArea rows={4} placeholder="e.g. Dimensions: 180cm x 80cm, Weight Capacity: 150kg, Motor power..." className="rounded-xl p-3" />
              </Form.Item>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 mt-6">
            <Button onClick={() => setOpen(false)} className="rounded-xl h-11 px-6 font-bold text-gray-600">
              Cancel
            </Button>
            <Button 
              type="primary" 
              disabled={loading} 
              htmlType="submit" 
              className="bg-brand-primary hover:bg-brand-primary-hover rounded-xl h-11 px-8 font-bold border-0"
            >
              Publish Product
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProductsModal;
