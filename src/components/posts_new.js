import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  render() {
    const template = (
      <form>
        <Field name="title" component={this.renderTitleField} />
      </form>
    );

    return template;
  }

  renderTitleField(field) {
    const properties  = field.input;
    const template    = (
      <div>
        <input type="text" {...properties}/>
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
const options   = {
  form: 'PostsNewForm' // Unique so the state is not shared between different forms.
};
const Container = reduxForm(options)(PostsNew);
export default Container;
