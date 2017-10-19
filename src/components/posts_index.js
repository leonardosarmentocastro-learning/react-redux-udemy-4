import _                      from 'lodash';
import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts }         from './../actions';


class PostsIndex extends Component {
  componentDidMount() {
    /**
     * Since the "fetchPosts" action modifies the "posts" state object,
     * the component will be rendered again, firing the "render" method
     * with the new "posts" values inside "props".
     */
    const props = this.props;
    props.fetchPosts();
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        <ul className='list-group'>
          { this.renderPosts() }
        </ul>
      </div>
    );
  }

  renderPosts() {
    const props   = this.props;
    const object  = props.posts;
    const fn      = (post) => {
      const template = (
        <li
          key={post.id}
          className="list-group-item">
          {post.title}
        </li>
      );

      return template;
    };

    return _.map(object, fn);
  }
}

const mapStateToProps = (state) => {
  const posts = state.posts;
  const props = {posts};

  return props;
}

/** @name APPROACH 1 */
// const mapDispatchToProps  = (dispatch) => {
//   const actionCreators    = { fetchPosts };
//   const props             = bindActionCreators(actionCreators, dispatch);
//
//   return props;
// }
//
// const Container = connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
// export default Container;

/** @name APPROACH 2 */
const actionCreators  = { fetchPosts };
const Container       = connect(mapStateToProps, actionCreators)(PostsIndex);
export default Container;
