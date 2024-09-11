// import { toast } from "@/components/ui/use-toast";
import { useLoginMutation } from '@/redux/fetures/auth/authApi';
import { setUser } from '@/redux/fetures/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { verifyToken } from '@/utils/verifyToken';
import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type FieldType = {
  firstName?: string;
  lestName?: string;
  email?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [Login] = useLoginMutation();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    try {
      const userInfo = {
        email: values.email,
        password: values.password,
      };
      const res = await Login(userInfo).unwrap();
      toast.success('Login Successfully');
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate('/');
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = (error as { data: { message: string } }).data;
        toast.error(`Error: ${errorData.message}`);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <div className=" flex justify-center items-center  ">
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
          <div className="text-4xl p-3 w-full text-center font-bold">
            Login Your Account
          </div>
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
              Login
            </Button>
          </Form.Item>

          <div className="flex justify-between">
            <Link className="text-[#4CC3AB] " to={`/registration`}>
              Create and account
            </Link>
            <Link className="text-[#4CC3AB] " to={`/registration`}>
              Forgate Password
            </Link>
          </div>
          {/* <div className='text-red-600 flex justify-center p-5'>
              {error?.data?.message}
            </div> */}
        </Form>
      </div>
    </div>
  );
};

export default Login;
