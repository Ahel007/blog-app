export default class BlogServices {
  _apiBase = 'https://blog-platform.kata.academy/api';

  getArticles = (offset = 0) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING' });

      fetch(`${this._apiBase}/articles?limit=5&offset=${offset}`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Articles not found');
          }
        })
        .then((res) => {
          dispatch({ type: 'GET_ARTICLES', payload: res });
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: error.message });
        })
        .finally(() => {
          dispatch({ type: 'STOP_LOADING' });
        });
    };
  };
  getArticle = (slug) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING' });

      fetch(`${this._apiBase}/articles/${slug}`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Article not found');
          }
        })
        .then((res) => {
          dispatch({ type: 'GET_ARTICLE', payload: res });
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: error.message });
        })
        .finally(() => {
          dispatch({ type: 'STOP_LOADING' });
        });
    };
  };
  deleteArticle = (slug) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING' });

      fetch(`${this._apiBase}/articles/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Article not found');
          }
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: error.message });
        })
        .finally(() => {
          dispatch({ type: 'STOP_LOADING' });
        });
    };
  };
  createArticle = (obj) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING' });

      fetch(`${this._apiBase}/articles`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          article: { title: obj.title, description: obj.description, body: obj.text, tagList: obj.tags },
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Article not found');
          }
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: error.message });
        })
        .finally(() => {
          dispatch({ type: 'STOP_LOADING' });
        });
    };
  };
  editArticle = (obj, slug) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING' });

      fetch(`${this._apiBase}/articles/${slug}`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          article: { title: obj.title, description: obj.description, body: obj.text, tagList: obj.tags },
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Article not found');
          }
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: error.message });
        });
    };
  };
  likeArticle = (slug) => {
    return (dispatch) => {
      fetch(`${this._apiBase}/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Article not found');
          }
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: error.message });
        });
    };
  };
  deleteLikeArticle = (slug) => {
    return (dispatch) => {
      fetch(`${this._apiBase}/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Article not found');
          }
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: error.message });
        })
        .finally(() => {
          dispatch({ type: 'STOP_LOADING' });
        });
    };
  };
  logIn = (obj) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING' });

      fetch(`${this._apiBase}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ user: { email: obj.email, password: obj.password } }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Article not found');
          }
        })
        .then((res) => {
          localStorage.setItem('token', res.user.token);
          dispatch({ type: 'LOG_IN' });
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: error.message });
        })
        .finally(() => {
          dispatch({ type: 'STOP_LOADING' });
        });
    };
  };
  register = (obj) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING' });

      fetch(`${this._apiBase}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ user: { username: obj.username, email: obj.email, password: obj.password } }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('An account with such data already exists');
          }
        })
        .then((res) => {
          localStorage.setItem('token', res.user.token);
          dispatch({ type: 'LOG_IN' });
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: error.message });
        })
        .finally(() => {
          dispatch({ type: 'STOP_LOADING' });
        });
    };
  };
  editProfile = (obj) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING' });

      fetch(`${this._apiBase}/user`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          user: { username: obj.username, email: obj.email, password: obj.password, bio: null, image: obj.image },
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('An account with such data already exists');
          }
        })
        .then((res) => {
          localStorage.setItem('token', res.user.token);
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: error.message });
        })
        .finally(() => {
          dispatch({ type: 'STOP_LOADING' });
        });
    };
  };
  getUser = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING' });
      fetch(`${this._apiBase}/user`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('An account with such data already exists');
          }
        })
        .then((res) => {
          dispatch({ type: 'GET_USER_EMAIL', payload: res.user.email });
          fetch(`${this._apiBase}/profiles/${res.user.username}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('An account with such data already exists');
              }
            })
            .then((res) => dispatch({ type: 'GET_USER', payload: res }));
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: error.message });
        })
        .finally(() => {
          dispatch({ type: 'STOP_LOADING' });
        });
    };
  };
}
