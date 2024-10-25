/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useCreateUserInfoMutation } from '@/redux/fetures/users/userApi';
import { Button, Form, FormProps, Input, Modal } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';

export type FieldUserType = {
  phonNumber?: string;
  division?: string;
  distric?: string;
  upzelea?: string;
  address?: string;
  email?:string
  name:string
};

const onFinishFailed: FormProps<FieldUserType>['onFinishFailed'] = errorInfo => {
  // eslint-disable-next-line no-console
  console.log('Failed:', errorInfo);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserInfo = ({setUserInfo}:any) => {
  // const { userId, email } = props.modalData;
  // const [updathUserIifo] = useCreateUserInfoMutation();

  const onFinish: FormProps<FieldUserType>['onFinish'] = values => {
    const userInfo = {
      email:values.email,
      name:values.name,
      phonNumber: values.phonNumber,
      division: values.division,
      distric: values.distric,
      upzelea: values.upzelea,
      address: values.address,
    };
    // updathUserIifo(userInfo).unwrap();
    console.log(userInfo);
    setUserInfo(userInfo)
    toast.success('user info created successfully');
  };

  const [isModalVisible, setIsModalVisible] = useState(true);

  // Functions to open and close the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div>
        {/* Trigger modal with a div */}
        <div style={{ cursor: 'pointer', color: 'blue' }} onClick={showModal}>
          Please Provide your Delevery address
        </div>

        {/* Ant Design Modal without OK and Cancel buttons */}
        <Modal
          title="Provide your Delevery address"
          visible={isModalVisible}
          onCancel={handleClose}
          footer={null}
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
            <Form.Item<FieldUserType>
              label="Name"
              name="name"
              rules={[
                { required: true, message: 'Please input your Name!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldUserType>
              label="Phone Number"
              name="phonNumber"
              rules={[
                { required: true, message: 'Please input your Phone Number!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldUserType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your Email!' },
              ]}
            >
              <Input />
            </Form.Item>


            <Form.Item<FieldUserType>
              label="Division"
              name="division"
              rules={[
                { required: true, message: 'Please input your Division!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldUserType>
              label="Distric"
              name="distric"
              rules={[
                { required: true, message: 'Please input your Distric!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldUserType>
              label="Upzela"
              name="upzelea"
              rules={[{ required: true, message: 'Please input your Upzela!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldUserType>
              label="Address"
              name="address"
              rules={[
                { required: true, message: 'Please input your Address!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button onClick={handleSubmit} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default UserInfo;
