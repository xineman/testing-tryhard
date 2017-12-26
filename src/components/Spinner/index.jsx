import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './styles.css';

const Spinner = props => (
  <ReactCSSTransitionGroup
    transitionName="spinner"
    transitionAppear
    transitionAppearTimeout={500}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}
  >
    {props.show &&
      <div key="spinner" className={styles.overlay}>
        <div className={styles.wrapper}>
          <div className={`${styles.loader} ${props.dots && styles.dots} ${styles.first}`}>Loading...</div>
          <div className={`${styles.loader} ${props.dots && styles.dots} ${styles.second}`}>Loading...</div>
          <div className={`${styles.loader} ${props.dots && styles.dots}`}>Loading...</div>
        </div>
      </div>
    }
  </ReactCSSTransitionGroup>
);

Spinner.propTypes = {
  show: PropTypes.bool,
  dots: PropTypes.bool,
};

Spinner.defaultProps = {
  show: false,
  dots: false,
};

export default Spinner;
