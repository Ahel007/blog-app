import { Layout, Button, Flex, Image } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import avatar from '../../images/user-avatar.svg';
import BlogServices from '../../services/blog-services';
import './header.scss';

const service = new BlogServices();

function Header() {
  const isLoggenIn = useSelector((state) => state.loginReducer.isLoggenIn);
  const user = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggenIn) dispatch(service.getUser());
  }, []);
  return (
    <Layout.Header className="header">
      <Flex align="center" justify="space-between" className="header__flex">
        <Link to="/" className="header__logo">
          Realworld Blog
        </Link>
        <Flex gap={isLoggenIn ? 19 : 27} className="header__buttons-flex">
          {isLoggenIn ? (
            <>
              <Link to="/new-article/">
                <Button className="header__create-article">Create article</Button>
              </Link>
              <Link to="/profile/">
                <div className="header__user">
                  <p>{user.username}</p>
                  <Image
                    src={user.image}
                    fallback={avatar}
                    width="46"
                    height="46"
                    alt="User Avatar"
                    className="header__avatar"
                  />
                </div>
              </Link>
              <Button
                className="header__log-out"
                onClick={() => {
                  dispatch({ type: 'LOG_OUT' });
                  localStorage.removeItem('token');
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/sign_in/">
                <Button className="header__sign-in">Sign In</Button>
              </Link>
              <Link to="/sign_up/">
                <Button className="header__sign-up">Sign Up</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Layout.Header>
  );
}

export default Header;
