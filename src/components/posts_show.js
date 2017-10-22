import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const props = this.props;

    const route   = {params: null};
    route.params  = props.match.params;

    const { id } = route.params;
    props.fetchPost(id);
  }

  onDeleteClick = () => {
    const props   = this.props;
    const route   = {params: null};
    route.params  = props.match.params;

    const id        = route.params.id;
    const callback  = () => {
      props.history.push('/');
    };
    props.deletePost(id, callback);
  }

  render() {
    const props     = this.props;
    const { post }  = props;

    const hasFinishedFetchingPost = Boolean(post);
    if (!hasFinishedFetchingPost) {
      const template = (
        <div>
          Loading...
        </div>
      );

      return template;
    }

    const template = (
      <div>
        <Link to="/">Back to index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}>
          Delete post
        </button>

        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );

    return template;
  }
}

function mapStateToProps(state, ownProps) {
  const { posts } = state;
  const postId    = ownProps.match.params.id;
  const post      = posts[postId];

  const props = { post };
  return props;
}

const actionCreators  = { fetchPost, deletePost };
const Container       = connect(mapStateToProps, actionCreators)(PostsShow);
export default Container;
