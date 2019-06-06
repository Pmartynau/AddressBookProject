import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './MaterialOutlineInput.module.css';
import Form from 'react-bootstrap/Form';
import classNames from 'classnames';
/**
 * ### Google Material Design Input Style 2.0
 * These components place labels below
 * their inputs. The labels are absolute positioned inside of the input and
 * behave like a placeholder. The labels use CSS transforms to place the labels
 * on top of the input when a user focuses on the input or adds a value.
 *
 * @class MaterialOutlineInput
 * @extends {PureComponent}
 */
class MaterialOutlineInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      hasFocus: props.defaultValue || false
    };
    // Extracting custom props in order to pass restOfProps
    // to child components.
    const { controlId, feedback, invalidFeedback, ...restOfProps } = props;
    this.deconstructedProps = restOfProps;
  }
  /**
   * The event handler sets the hasFocus state to true, which has the side
   * effect of keeping the label hoisted on top of the input
   *
   * @param {Event} event The event object passed.
   * @return {void}
   * @memberof MaterialOutlineInput
   * @public
   */
  onFocus = event => {
    this.setState({ hasFocus: true });
  };
  /**
   * The event handler is attached to the input. When onblur is fired,
   * this checks to see if the input has a value. If it doesn't it sets the
   * focus state to false, which allows the label to reposition in the center
   * of the input
   *
   * @param {Event} event The event object passed.
   * @return {void}
   * @memberof MaterialOutlineInput
   * @public
   */
  onBlur = event => {
    if (!event.target.value) {
      this.setState({ hasFocus: false });
    }
  };
  /**
   * For the label, when we render, we need to know which size we are in order
   * to apply the right styles.
   *
   * @param {String} propSize The size passed in by the prop.
   * @return {String} sm or lg
   * @memberof MaterialOutlineInput
   * @public
   */
  getSizeClass(propSize) {
    let defaultSize = '';
    switch (propSize) {
      case 'lg':
        defaultSize = styles.lg;
        break;
      case 'sm':
        defaultSize = styles.sm;
        break;
      default:
        break;
    }
    return defaultSize;
  }
  render() {
    const labelClasses = classNames(
      styles.outline,
      this.state.hasFocus ? styles.active : '',
      this.getSizeClass(this.props.size),
      this.props.disabled ? styles.disabled : '',
      this.props.isInvalid ? styles.isInvalid : '',
      this.props.isValid ? styles.isValid : ''
    );
    const inputClasses = classNames(
      styles.outline,
      this.props.disabled ? styles.disabled : '',
      this.props.isInvalid ? styles.isInvalid : '',
      this.props.isValid ? styles.isValid : ''
    );
    return (
      <div className={styles.outline}>
        <Form.Control
          className={inputClasses}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          id={this.props.controlId}
          {...this.deconstructedProps}
        />
        <Form.Label className={labelClasses} htmlFor={this.props.controlId}>
          {this.props.label}
        </Form.Label>
        <Form.Control.Feedback>{this.props.feedback}</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {this.props.invalidFeedback}
        </Form.Control.Feedback>
      </div>
    );
  }
}

MaterialOutlineInput.propTypes = {
  /**
   * Maps to the input#id and its corresponding label#for. #ADARequired
   * @type {String}
   */
  controlId: PropTypes.string.isRequired,
  /**
   * The HTML text describing what the input is for. #ADARequired
   * @type {String}
   */
  label: PropTypes.string.isRequired
};

export default MaterialOutlineInput;
