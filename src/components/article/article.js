import { useEffect } from 'react';
import { Typography, Tag, Flex, Layout, Button, Popconfirm, Image, Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import BlogServices from '../../services/blog-services';
import avatar from '../../images/user-avatar.svg';
import './article.scss';

const { Title } = Typography;

const service = new BlogServices();

function Article() {
  const slug = useLocation().pathname.split('/').pop();
  const history = useHistory();

  const dispatch = useDispatch();

  const isLoggenIn = useSelector((state) => state.loginReducer.isLoggenIn);
  const article = useSelector((state) => state.articlesReducer.article.article);
  const articlesState = useSelector((state) => state.articlesReducer);

  useEffect(() => {
    dispatch(service.getArticle(slug));
  }, []);

  if (articlesState.loading) {
    return (
      <Layout.Content className="article" style={{ textAlign: 'center', paddingTop: 100 }}>
        <Spin size="large" />
      </Layout.Content>
    );
  }

  if (article) {
    return (
      <Layout.Content className="article">
        <Flex justify="space-between" gap="85px" className="article__flex">
          <div>
            <Title level={4} className="article__title">
              {article.title}{' '}
              {article.favorited ? (
                <HeartFilled
                  style={{ color: 'red' }}
                  onClick={() => {
                    if (isLoggenIn) dispatch(service.deleteLikeArticle(slug));
                  }}
                />
              ) : (
                <HeartOutlined
                  onClick={() => {
                    if (isLoggenIn) dispatch(service.likeArticle(slug));
                  }}
                />
              )}{' '}
              <span>{article.favoritesCount}</span>
            </Title>
            {article.tagList.map((tag, i) => (
              <Tag key={i} className="article__tag">
                {tag}
              </Tag>
            ))}
            <p className="article__description">{article.description}</p>
          </div>
          <Flex vertical gap={30}>
            <Flex>
              <div className="article__info">
                <p className="article__name">{article.author.username}</p>
                <p className="article__date">{format(article.createdAt, 'MMMM d, yyyy')}</p>
              </div>
              <Image
                src={article.author.image}
                fallback={avatar}
                width="46"
                height="46"
                alt="User Avatar"
                className="article__avatar"
              />
            </Flex>
            {isLoggenIn ? (
              <Flex gap={12}>
                <Popconfirm
                  placement="rightTop"
                  title={'Are you sure to delete this article?'}
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => {
                    dispatch(service.deleteArticle(slug));
                    history.push('/');
                  }}
                >
                  <Button className="article__delete">Delete</Button>
                </Popconfirm>
                <Link to={`${slug}/edit/`}>
                  <Button className="article__edit">Edit</Button>
                </Link>
              </Flex>
            ) : null}
          </Flex>
        </Flex>
        <p className="article__content">{article.body}</p>
      </Layout.Content>
    );
  }
  if (articlesState.error) {
    return (
      <Layout.Content className="article">
        <Alert message="Error" description={articlesState.error} type="error" showIcon />
      </Layout.Content>
    );
  }
}

export default Article;
