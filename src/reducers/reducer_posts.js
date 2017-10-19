import _ from 'lodash';
import { FETCH_POSTS } from './../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      const posts         = {normalized: null, unnormalized: null};
      posts.unnormalized  = action.payload.data;

      const key           = 'id';
      posts.normalized    = _.mapKeys(posts.unnormalized, key);

      return posts.normalized;
    default:
      return state;
  }
}
