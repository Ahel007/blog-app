import { Button, Flex, Form, Input, Layout, Space, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import BlogServices from '../../services/blog-services';
import './edit-article.scss';

const { Title } = Typography;

const service = new BlogServices();

function EditArticle() {
  const isLoggenIn = useSelector((state) => state.loginReducer.isLoggenIn);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const slug = useLocation().pathname.split('/')[2];
  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleDeleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  const onFinish = (values) => {
    dispatch(service.editArticle({ ...values, tags }, slug));
    form.resetFields();
  };

  if (!isLoggenIn) {
    return <Redirect to="/sign_in/" />;
  }
  return (
    <Layout.Content className="edit-article">
      <Form
        name="login"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        className="edit-article__form"
      >
        <Title level={4} className="edit-article__title">
          Edit article
        </Title>
        <Form.Item name="title" rules={[{ required: true, message: 'Please input your Title!' }]} label="Title">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Please input your Description!' }]}
          label="Short description"
        >
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item name="text" rules={[{ required: true, message: 'Please input your Text!' }]} label="Text">
          <Input.TextArea placeholder="Text" className="edit-article__text-input" />
        </Form.Item>
        <Form.Item label="Tags" className="edit-article__tags">
          <Flex gap={18}>
            <Flex vertical gap={5}>
              {tags.map((tag, index) => (
                <Space key={index} align="baseline" size={17}>
                  <Input placeholder="Tag" value={tag} onChange={(e) => handleTagChange(index, e.target.value)} />
                  <Button danger onClick={() => handleDeleteTag(index)}>
                    Delete
                  </Button>
                </Space>
              ))}
            </Flex>
            <Button onClick={handleAddTag} className={'edit-article__button-add'}>
              Add tag
            </Button>
          </Flex>
        </Form.Item>
        <Form.Item className="edit-article__bottom">
          <Button block type="primary" htmlType="submit" className="edit-article__button-send">
            Send
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
}

export default EditArticle;
