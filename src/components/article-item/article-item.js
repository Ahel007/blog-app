import { List, Typography, Tag, Flex, Image } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

const { Title } = Typography;

const service = new BlogServices();

import BlogServices from '../../services/blog-services';
import avatar from '../../images/user-avatar.svg';
import './article-item.scss';

function ArticleItem({ item }) {
  const dispatch = useDispatch();
  const isLoggenIn = useSelector((state) => state.loginReducer.isLoggenIn);
  return (
    <List.Item className="article-item">
      <Flex justify="space-between" gap="85px" className="article-item__flex">
        <div>
          <Title level={4} className="article-item__title">
            <Link to={`/articles/${item.slug}`}>{item.title}</Link>{' '}
            {item.favorited ? (
              <HeartFilled
                style={{ color: 'red' }}
                onClick={() => {
                  if (isLoggenIn) dispatch(service.deleteLikeArticle(item.slug));
                }}
              />
            ) : (
              <HeartOutlined
                onClick={() => {
                  if (isLoggenIn) dispatch(service.likeArticle(item.slug));
                }}
              />
            )}{' '}
            <span>{item.favoritesCount}</span>
          </Title>
          {item.tagList.map((tag, i) => (
            <Tag key={i} className="article-item__tag">
              {tag}
            </Tag>
          ))}
          <p className="article-item__description">{item.description}</p>
        </div>
        <Flex gap={12}>
          <div className="article-item__info">
            <p className="article-item__name">{item.author.username}</p>
            <p className="article-item__date">{format(item.createdAt, 'MMMM d, yyyy')}</p>
          </div>
          <Image
            src={item.author.image}
            fallback={avatar}
            width="46"
            height="46"
            alt="User Avatar"
            className="article-item__avatar"
          />
        </Flex>
      </Flex>
    </List.Item>
  );
}

export default ArticleItem;
