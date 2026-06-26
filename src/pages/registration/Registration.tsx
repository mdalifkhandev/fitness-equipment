import { useCreateUserMutation } from '@/redux/fetures/users/userApi';
import { Button, Form, FormProps, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

type FieldType = {
  firstName?: string;
  lestName?: string;
  email?: string;
  password?: string;

};

const Registration = () => {
  const [createRoot, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async values => {
    try {
      const userInfo = {
        firstName: values.firstName,
        lestName: values.lestName, // keeping original typo to avoid backend breakages
        email: values.email,
        password: values.password,
      };

      const res = await createRoot(userInfo).unwrap();
      toast.success(res.message || 'Account created successfully!');
      navigate('/login');
    } catch (error: any) {
      toast.error(`Error: ${error?.data?.message || 'Registration failed'}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Join us to start your fitness journey
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-5"
            requiredMark={false}
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Form.Item<FieldType>
                label={<span className="text-sm font-bold text-slate-700">First Name</span>}
                name="firstName"
                rules={[{ required: true, message: 'First Name required!' }]}
                className="mb-0"
              >
                <Input
                  prefix={<User className="h-4 w-4 text-slate-400 mr-2" />}
                  placeholder="John"
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 hover:bg-white focus:bg-white"
                />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="text-sm font-bold text-slate-700">Last Name</span>}
                name="lestName"
                rules={[{ required: true, message: 'Last Name required!' }]}
                className="mb-0"
              >
                <Input
                  prefix={<User className="h-4 w-4 text-slate-400 mr-2" />}
                  placeholder="Doe"
                  className="h-12 rounded-xl border-slate-200 bg-slate-50 hover:bg-white focus:bg-white"
                />
              </Form.Item>
            </div>

            <Form.Item<FieldType>
              label={<span className="text-sm font-bold text-slate-700">Email Address</span>}
              name="email"
              rules={[
                { required: true, message: 'Email required!' },
                { type: 'email', message: 'Enter a valid email!' }
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
              rules={[{ required: true, message: 'Password required!' }]}
              className="mb-6"
            >
              <Input.Password
                prefix={<Lock className="h-5 w-5 text-slate-400 mr-2" />}
                placeholder="Min. 8 characters"
                className="h-12 rounded-xl border-slate-200 bg-slate-50 hover:bg-white focus:bg-white"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full h-12 rounded-xl bg-slate-900 hover:!bg-brand-primary border-none text-base font-bold text-white shadow-md transition-colors flex items-center justify-center group"
              >
                Create Account
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
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="font-bold text-brand-primary hover:text-brand-primary-hover transition-colors text-base"
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
