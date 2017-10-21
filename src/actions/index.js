import axios from 'axios';

const ROOT_URL  = 'http://reduxblog.herokuapp.com/api';
const API_KEY   = '?key=leonardosarmentocastro';

export const FETCH_POSTS = 'FETCH_POSTS';
export function fetchPosts() {
  const url     = `${ROOT_URL}/posts${API_KEY}`;
  const request = axios.get(url);

  const action = {
    type: FETCH_POSTS,
    payload: request
  };
  return action;
}

export const CREATE_POSTS = 'CREATE_POSTS';
export function createPost(values, callback) {
  const url     = `${ROOT_URL}/posts${API_KEY}`;
  const request = axios.post(url, values)
    .then(() => {
      return callback();
    });

  const action = {
    type: CREATE_POSTS,
    payload: request
  };
  return action;
}
