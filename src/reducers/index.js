import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import fetchPosts from './reducer_posts';


const rootReducer = combineReducers({
  form: formReducer,
  posts: fetchPosts
});

export default rootReducer;
