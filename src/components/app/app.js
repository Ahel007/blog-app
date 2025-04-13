import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Header from '../header';
import ArticlesList from '../articles-list';
import Article from '../article';
import CreateArticle from '../create-article';
import EditArticle from '../edit-article';
import EditProfile from '../edit-profile';
import SignIn from '../sign-in';
import SignUp from '../sign-up';

import './app.scss';

function App() {
  return (
    <Router>
      <Layout className="app">
        <Header />
        <Switch>
          <Route path="/" component={ArticlesList} exact />
          <Route path="/articles" component={ArticlesList} exact />
          <Route path="/articles/:slug" component={Article} exact />
          <Route path="/new-article" component={CreateArticle} />
          <Route path="/articles/:slug/edit" component={EditArticle} />
          <Route path="/sign_in" component={SignIn} />
          <Route path="/sign_up" component={SignUp} />
          <Route path="/profile" component={EditProfile} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
