import { combineReducers } from 'redux';
import fetchPosts from './reducer_posts';

const rootReducer = combineReducers({
  posts: fetchPosts
});

export default rootReducer;
