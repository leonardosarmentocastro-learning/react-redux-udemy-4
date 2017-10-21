import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect }          from 'react-redux';
import { createPost }       from '../actions';

class PostsNew extends Component {
  onSubmit = (values) => {
    const props = this.props;

    /**
     * The "react-router-dom" library injects a bunch of properties into our
     * component's props.
     * To navigate to a route manually, we can make use of the "history" property.
     */
    const navigate    = {callback: null};
    navigate.callback = () => {
      const history     = props.history;
      const route       = {posts: {list: null}};
      route.posts.list  = '/';

      history.push(route.posts.list);
    };

    /**
     * We pass the "navigate" function as a callback, so the action creator can
     * navigate to the given route after succesfully creating a post.
     */
    props.createPost(values, navigate.callback);
  }

  render() {
    /**
     * The "handleSubmit" function is injected by the "reduxForm's connect" at the
     * at the bottom of the file.
     * It is a function that passes by the specified "validate" function and determines
     * if the form can be submitted or not.
     * And we pass our "onSubmit" function, which is the one who treats of really submitting
     * things to the back-end.
     */
    const props             = this.props;
    const { handleSubmit }  = props;
    const onSubmit          = this.onSubmit;

    const template = (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field label="Title for post" name="title" component={this.renderField} />
        <Field label="Categories" name="categories" component={this.renderField} />
        <Field label="Post content" name="content" component={this.renderField} />

        <Link to="/" className="btn btn-danger">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );

    return template;
  }

  renderField(field) {
    /**
     * Gets the field "DOM state", which means, properties that tells if the
     * input has already been focused or it has errors, etc.
     */
    const meta                = field.meta;
    const { error, touched }  = meta;

    /**
     * Conditionally apply CSS classes to change the input/label color.
     */
    const shouldDisplayError  = Boolean(touched && error);
    const className           = `
      form-group
      ${shouldDisplayError ? 'has-danger': ''}
    `;

    /**
     * @name properties
     * Holds all the "reduxForm" boilerplate properties that needs to be attached to the input
     * in order to make it watched and validated by the "reduxForm".
     *
     * @name label
     * Custom "property" set by ourselves.
     * It could be named anything, like "potatoes".
     */
    const { label, input: properties }  = field;
    const template                      = (
      <div className={className}>
        <label>{label}</label>
        <input className="form-control" type="text" {...properties}/>

        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );

    return template;
  }
}


/**
 * @name reduxForm
 * Gives the component the ability to communicate directly
 * with reducers and the state generated by this component.
 */
const validate  = (values) => {
  /** console.log(values); -> {title: 'asdas', content: 'asdsa', ...} */
  const errors = {};

  /** Validate the inptus from 'values'. */
  const {title, categories, content} = values;

  const hasTitle = Boolean(title);
  if (!hasTitle) {
    errors.title = "Enter a title";
  }

  const hasCategories = Boolean(categories);
  if (!hasCategories) {
    errors.categories = "Enter some categories";
  }

  const hasContent = Boolean(content);
  if (!hasContent) {
    errors.content = "Enter some content, please.";
  }

  /** If errors is empty, the form is fine to submit. */
  /** If errors has *any* properties, redux form assusmes form is invalid. */
  return errors;
};
const options   = {
  form: 'PostsNewForm', // Unique so the state is not shared between different forms.
  validate
};
const createForm = reduxForm(options);

const actionCreators    = { createPost };
let Container           = connect(null, actionCreators)(PostsNew);
Container               = createForm(Container);

export default Container;
