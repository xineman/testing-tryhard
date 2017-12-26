import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

class Input extends Component {
  static propTypes = {
    showErrors: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    pattern: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: 'Fill this field',
    };
  }
  handleChange(e) {
    let errorMessage;
    if (e.target.value === '') {
      errorMessage = 'Fill this field';
    } else {
      errorMessage = 'Match requested format';
    }
    this.setState({
      errorMessage,
    });
    this.props.onChange(e);
  }
  render() {
    const {
      type,
      name,
      id,
      value,
      placeholder,
      pattern,
      invalid,
      showErrors,
    } = this.props;
    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          type={type}
          name={name}
          id={id}
          value={value}
          placeholder={placeholder}
          pattern={pattern}
          onChange={e => this.handleChange(e)}
        />
        {showErrors && invalid &&
        <p className={styles.errorMessage}>
          {this.state.errorMessage}
        </p>}
      </div>
    );
  }
}

export default Input;
