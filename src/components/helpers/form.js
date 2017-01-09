import React, { Component, Children, cloneElement } from 'react';
import { type } from './';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      inputs: {}
    };
  }
  renderChildren() {
    const { children, onSubmit } = this.props;
    return Children
      .map(children, (child) => {
        const childComponent = type({ function: child.type })
          ? child.type(child.props)
          : child;
        // console.log('childComponent: ', childComponent);


        if (childComponent.type === 'input') {
          // console.log('input type: ', childComponent.props);
          const name = childComponent.props.name;
          // console.log('component name: ', name);
          return cloneElement(
            childComponent,
            {
              ...childComponent.props,
              onChange: (ev) => {
                childComponent.props.onChange && childComponent.props.onChange(ev);
                this.handleChange(ev);
              },
              // value: this.state.inputs[name],
              'data-name': name
            }
          );
        }
        if (childComponent.props.type === 'submit') {
          const stdOnClick = childComponent.props.onClick;
          const onClick = (ev) => {
            ev.preventDefault();
            stdOnClick && stdOnClick(ev);
            onSubmit(this.state.inputs);
            this.setState({ inputs: {} });
          };
          // console.log('submit button: ', child);
          return cloneElement(
            childComponent,
            {
              ...childComponent.props,
              onClick
            }
          );
        }
        return childComponent;
      });
  }
  handleSubmit = (ev) => {
    // send all input
    console.log('Form handleSubmit: ', ev.target);
    this.props.onSubmit(this.state.inputs);
  }
  handleChange = (ev) => {
    const { checked, value, dataset } = ev.target;
    console.log('checked: %o, value: %o, dataset: %o', checked, value, dataset);
    const inputVal = checked || value;
    const inputName = dataset.name;
    const inputs = this.state.inputs;
    inputs[inputName] = inputVal;
    this.setState({ inputs });
  }
  render() {
    const { className } = this.props;
    return (
      <form className={className}>
        {this.renderChildren()}
      </form>
    );
  }
}

Form.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.element,
  onSubmit: React.PropTypes.func.isRequired
};

export default Form;
