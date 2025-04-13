import { Layout, Button, Form, Input, Typography, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import BlogServices from '../../services/blog-services';
import './sign-up.scss';

const { Title } = Typography;

const service = new BlogServices();

function SignUp() {
  const dispatch = useDispatch();
  const isLoggenIn = useSelector((state) => state.loginReducer.isLoggenIn);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    if (values.agree === undefined) values.agree = true;
    console.log('Received values of form: ', values);
    dispatch(service.register(values));
    form.resetFields();
  };
  if (isLoggenIn) {
    return <Redirect to="/" />;
  }
  return (
    <Layout.Content className="sign-up">
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Title level={4}>Create new account</Title>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please input your Username!' },
            { min: 3, message: 'Username must be at least 3 characters long!' },
            { max: 20, message: 'Username must be no more than 20 characters long!' },
          ]}
          label="Username"
        >
          <Input placeholder="Username" />
        </Form.Item>
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
          rules={[
            { required: true, message: 'Please input your Password!' },
            { min: 6, message: 'Password must be at least 6 characters long!' },
            { max: 40, message: 'Password must be no more than 40 characters long!' },
          ]}
          label="Password"
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
          label="Repeat Password"
        >
          <Input type="password" placeholder="Password" id="Repeat Password" />
        </Form.Item>
        <Form.Item name="agree" valuePropName="checked" noStyle>
          <Checkbox defaultChecked={true}>I agree to the processing of my personal information</Checkbox>
        </Form.Item>
        <Form.Item className="sign-up__bottom">
          <Button block type="primary" htmlType="submit" className="sign-up__button">
            Create
          </Button>
          Already have an account? <Link to="/sign_in">Sign In.</Link>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
}

export default SignUp;
