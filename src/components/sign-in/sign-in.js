import { Layout, Button, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import BlogServices from '../../services/blog-services';
import './sign-in.scss';

const { Title } = Typography;

const service = new BlogServices();

function SignIn() {
  const dispatch = useDispatch();
  const isLoggenIn = useSelector((state) => state.loginReducer.isLoggenIn);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(service.logIn(values));
    form.resetFields();
  };
  if (isLoggenIn) {
    return <Redirect to="/" />;
  }
  return (
    <Layout.Content className="sign-in">
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Title level={4}>Sign In</Title>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your Email address!' },
            { type: 'email', message: 'Please input your correct Email address!' },
          ]}
          label="Email address"
        >
          <Input placeholder="Email address" type="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          label="Password"
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item className="sign-in__bottom">
          <Button block type="primary" htmlType="submit" className="sign-in__button">
            Login
          </Button>
          Don’t have an account? <Link to="/sign_up">Sign Up.</Link>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
}

export default SignIn;
