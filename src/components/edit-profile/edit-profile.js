import { Layout, Button, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import BlogServices from '../../services/blog-services';
import './edit-profile.scss';

const { Title } = Typography;
const service = new BlogServices();

function EditProfile() {
  const history = useHistory();

  const dispatch = useDispatch();
  const isLoggenIn = useSelector((state) => state.loginReducer.isLoggenIn);
  const user = useSelector((state) => state.loginReducer);

  const onFinish = (values) => {
    dispatch(service.editProfile(values));
    history.push('/');
  };

  if (!isLoggenIn) {
    return <Redirect to="/sign_in/" />;
  }

  if (user.username) {
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
            initialValue={user.username}
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
            initialValue={user.email}
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
          <Form.Item name="avatar-image" label="Avatar image (url)" initialValue={user.image}>
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
}

export default EditProfile;
