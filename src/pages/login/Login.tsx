import { useLoginMutation } from '@/redux/fetures/auth/authApi';
import { setUser } from '@/redux/fetures/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { verifyToken } from '@/utils/verifyToken';
import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Lock, Mail, ArrowRight } from 'lucide-react';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [Login, { isLoading }] = useLoginMutation();
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

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Sign in to access your fitness journey
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-6"
            requiredMark={false}
          >
            <Form.Item<FieldType>
              label={<span className="text-sm font-bold text-slate-700">Email Address</span>}
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
              className="mb-4"
            >
              <Input 
                prefix={<Mail className="h-5 w-5 text-slate-400 mr-2" />} 
                placeholder="john@example.com" 
                className="h-12 rounded-xl border-slate-200 bg-slate-50 hover:bg-white focus:bg-white"
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={<span className="text-sm font-bold text-slate-700">Password</span>}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              className="mb-4"
            >
              <Input.Password 
                prefix={<Lock className="h-5 w-5 text-slate-400 mr-2" />}
                placeholder="••••••••" 
                className="h-12 rounded-xl border-slate-200 bg-slate-50 hover:bg-white focus:bg-white"
              />
            </Form.Item>

            <div className="flex items-center justify-between mb-6">
              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                noStyle
              >
                <Checkbox className="text-sm text-slate-600 font-medium">Remember me</Checkbox>
              </Form.Item>

              <div className="text-sm">
                <a href="#" className="font-bold text-brand-primary hover:text-brand-primary-hover transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={isLoading}
                className="w-full h-12 rounded-xl bg-slate-900 hover:!bg-brand-primary border-none text-base font-bold text-white shadow-md transition-colors flex items-center justify-center group"
              >
                Sign In
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500 font-medium">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link 
                to="/registration" 
                className="font-bold text-brand-primary hover:text-brand-primary-hover transition-colors text-base"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
