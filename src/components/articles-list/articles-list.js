import { Alert, Layout, List, Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogServices from '../../services/blog-services';
import ArticleItem from '../article-item';

import './articles-list.scss';

const service = new BlogServices();

function ArticlesList() {
  const dispatch = useDispatch();
  const articlesState = useSelector((state) => state.articlesReducer);
  useEffect(() => {
    dispatch(service.getArticles());
  }, []);
  const data = articlesState.articles;
  if (articlesState.error) {
    return (
      <Layout.Content className="article">
        <Alert message="Error" description={articlesState.error} type="error" showIcon />
      </Layout.Content>
    );
  }
  return (
    <Layout.Content className="articles-list">
      <List
        dataSource={data}
        loading={{
          indicator: <Spin size="large" />,
          spinning: articlesState.loading,
        }}
        pagination={{
          pageSize: 5,
          total: articlesState.articlesCount,
          showSizeChanger: false,
          style: {
            marginBottom: 16,
          },
          align: 'center',
          onChange: (page) => {
            dispatch(service.getArticles(page * 5 - 5));
          },
        }}
        renderItem={(item) => <ArticleItem item={item} />}
      />
    </Layout.Content>
  );
}

export default ArticlesList;
