import { Button, Flex, Form, Input, Layout, Space, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import BlogServices from '../../services/blog-services';
import './create-article.scss';

const { Title } = Typography;

const service = new BlogServices();

function CreateArticle() {
  const isLoggenIn = useSelector((state) => state.loginReducer.isLoggenIn);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [tags, setTags] = useState([]);
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
    dispatch(service.createArticle({ ...values, tags }));
    form.resetFields();
  };
  if (!isLoggenIn) {
    return <Redirect to="/sign_in/" />;
  }
  return (
    <Layout.Content className="create-article">
      <Form
        name="login"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        className="create-article__form"
      >
        <Title level={4} className="create-article__title">
          Create new article
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
          <Input.TextArea placeholder="Text" className="create-article__text-input" />
        </Form.Item>
        <Form.Item label="Tags" className="create-article__tags">
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
            <Button onClick={handleAddTag} className={'create-article__button-add'}>
              Add tag
            </Button>
          </Flex>
        </Form.Item>
        <Form.Item className="create-article__bottom">
          <Button block type="primary" htmlType="submit" className="create-article__button-send">
            Send
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
}

export default CreateArticle;
