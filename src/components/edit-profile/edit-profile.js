import { Layout, Button, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import BlogServices from '../../services/blog-services';
import './edit-profile.scss';

const { Title } = Typography;
const service = new BlogServices();

function EditProfile() {
  const dispatch = useDispatch();
  const isLoggenIn = useSelector((state) => state.loginReducer.isLoggenIn);
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    dispatch(service.editProfile(values));
  };
  if (!isLoggenIn) {
    return <Redirect to="/sign_in/" />;
  }
  return (
    <Layout.Content className="edit-profile">
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Title level={4}>Edit Profile</Title>
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
            { min: 6, message: 'New Password must be at least 6 characters long!' },
            { max: 40, message: 'New Password must be no more than 40 characters long!' },
          ]}
          label="New password"
        >
          <Input type="password" placeholder="New password" />
        </Form.Item>
        <Form.Item name="avatar-image" label="Avatar image (url)">
          <Input placeholder="Avatar image" />
        </Form.Item>
        <Form.Item className="edit-profile__bottom">
          <Button block type="primary" htmlType="submit" className="edit-profile__button">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
}

export default EditProfile;
