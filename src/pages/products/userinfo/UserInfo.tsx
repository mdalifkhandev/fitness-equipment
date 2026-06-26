/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, FormProps, Input, Modal } from 'antd';
import { MapPin, Plus, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export type FieldUserType = {
  phonNumber?: string;
  division?: string;
  distric?: string;
  upzelea?: string;
  address?: string;
  email?: string;
  name: string;
};

const onFinishFailed: FormProps<FieldUserType>['onFinishFailed'] = errorInfo => {
  // eslint-disable-next-line no-console
  console.log('Failed:', errorInfo);
};

const UserInfo = ({ setUserInfo }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldUserType>['onFinish'] = values => {
    const userInfo = {
      email: values.email,
      name: values.name,
      phonNumber: values.phonNumber,
      division: values.division,
      distric: values.distric,
      upzelea: values.upzelea,
      address: values.address,
    };

    setUserInfo(userInfo);
    setIsModalVisible(false);
    toast.success('Delivery address added successfully');
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        className="inline-flex h-11 items-center gap-2 rounded-xl border-0 bg-brand-primary px-5 font-black"
      >
        <Plus className="h-4 w-4" />
        Add Delivery Address
      </Button>

      <Modal
        title={
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4 text-left">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-primary-light text-brand-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-950">
                Delivery Address
              </h2>
              <p className="text-xs font-semibold text-gray-500">
                Fill in your delivery and contact information.
              </p>
            </div>
          </div>
        }
        centered
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={760}
      >
        <Form
          form={form}
          name="deliveryAddressForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="pt-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
            <Form.Item<FieldUserType>
              label={<span className="font-bold text-gray-700">Name</span>}
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder="Your full name" className="h-11 rounded-xl" />
            </Form.Item>

            <Form.Item<FieldUserType>
              label={<span className="font-bold text-gray-700">Email</span>}
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="you@example.com" className="h-11 rounded-xl" />
            </Form.Item>

            <Form.Item<FieldUserType>
              label={
                <span className="font-bold text-gray-700">Phone Number</span>
              }
              name="phonNumber"
              rules={[
                { required: true, message: 'Please input your phone number!' },
              ]}
            >
              <Input placeholder="Phone number" className="h-11 rounded-xl" />
            </Form.Item>

            <Form.Item<FieldUserType>
              label={<span className="font-bold text-gray-700">Division</span>}
              name="division"
              rules={[
                { required: true, message: 'Please input your division!' },
              ]}
            >
              <Input placeholder="Division" className="h-11 rounded-xl" />
            </Form.Item>

            <Form.Item<FieldUserType>
              label={<span className="font-bold text-gray-700">District</span>}
              name="distric"
              rules={[
                { required: true, message: 'Please input your district!' },
              ]}
            >
              <Input placeholder="District" className="h-11 rounded-xl" />
            </Form.Item>

            <Form.Item<FieldUserType>
              label={<span className="font-bold text-gray-700">Upazila</span>}
              name="upzelea"
              rules={[
                { required: true, message: 'Please input your upazila!' },
              ]}
            >
              <Input placeholder="Upazila" className="h-11 rounded-xl" />
            </Form.Item>

            <Form.Item<FieldUserType>
              label={
                <span className="font-bold text-gray-700">
                  Detailed Address
                </span>
              }
              name="address"
              rules={[
                { required: true, message: 'Please input your address!' },
              ]}
              className="md:col-span-2"
            >
              <Input.TextArea
                rows={3}
                placeholder="House, road, area and nearby landmark"
                className="rounded-xl p-3"
              />
            </Form.Item>
          </div>

          <div className="mt-2 flex justify-end gap-3 border-t border-gray-100 pt-5">
            <Button
              onClick={() => setIsModalVisible(false)}
              className="h-11 rounded-xl px-5 font-bold"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="inline-flex h-11 items-center gap-2 rounded-xl border-0 bg-brand-primary px-6 font-black"
            >
              <Send className="h-4 w-4" />
              Save Address
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UserInfo;
