import { useCreateUserMutation } from '@/redux/fetures/users/userApi';
import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

type FieldType = {
  firstName?: string;
  lestName?: string;
  email?: string;
  password?: string;
  remember?: string;
};

const Registration = () => {
  const [createRoot, { data }] = useCreateUserMutation();
  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    try {
      const userInfo = {
        firstName: values.firstName,
        lestName: values.lestName,
        email: values.email,
        password: values.password,
      };
      createRoot(userInfo);
      toast.success('Account created successfully');
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className=" flex justify-center items-center  ">
      {/* <div className="text-4xl p-3 w-full text-center font-bold">Creaate Your Account</div> */}
      <Form
        className="w-full rounded-xl shadow-2xl p-20 "
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <div className="text-4xl p-5 mb-8 w-full text-center font-bold">
          Creaate Your Account
        </div>
        <Form.Item<FieldType>
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your First Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Lest Name"
          name="lestName"
          rules={[{ required: true, message: 'Please input your Lest Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: 'Please input your Valid Email!' },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password min={8} />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 4, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" className="w-full">
            Creage Account
          </Button>
        </Form.Item>
        {/* <div className=" text-center text-red-600 text-xl">{error?.data?.message} </div> */}
        <div className=" text-center text-green-600 text-xl">
          {data?.message}{' '}
        </div>
        <div className="flex justify-center">
          <Link className="text-[#4CC3AB] " to={`/login`}>
            Alrady have and account
          </Link>
          {/* <Link className="text-[#4CC3AB] " to={`/registration`}>Forgate Password</Link> */}
        </div>
      </Form>
    </div>
  );
};

export default Registration;
