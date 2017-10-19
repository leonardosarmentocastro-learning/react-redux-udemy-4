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
