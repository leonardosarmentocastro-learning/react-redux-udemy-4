import _ from 'lodash';
import { FETCH_POST, FETCH_POSTS } from './../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      const payload = action.payload;
      const post    = payload.data;
      const id      = post.id;

      /** "{[id]: post}" === "newState[id] = post" */
      const newState = {[id]: post, ...state};
      return newState;
    case FETCH_POSTS:
      const posts         = {normalized: null, unnormalized: null};
      posts.unnormalized  = action.payload.data;

      const key           = 'id';
      posts.normalized    = _.mapKeys(posts.unnormalized, key);

      return posts.normalized;
    // case DELETE_POST:
    //   return state;
    default:
      return state;
  }
}
