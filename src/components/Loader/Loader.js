/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";

import style from "./Loader.module.css";

class Loader extends Component {
  static propTypes = {
    abortLoading: PropTypes.func.isRequired
  };

  componentDidMount() {
    document.body.style = " overflow: hidden ";
  }

  componentWillUnmount() {
    document.body.style = " ";
  }

  render() {
    const { abortLoading } = this.props;
    const cssload_inner_one = `${style.cssload_inner} ${style.cssload_one}`;
    const cssload_inner_two = `${style.cssload_inner} ${style.cssload_two}`;
    const cssload_inner_three = `${style.cssload_inner} ${style.cssload_three}`;
    return (
      <>
        <div className={style.overlay}>
          <div className={style.cssload_loader}>
            <div className={cssload_inner_one} />
            <div className={cssload_inner_two} />
            <div className={cssload_inner_three} />
          </div>
          <button
            type="button"
            onClick={abortLoading}
            className={style.abortButton}
          >
            Відмінити
          </button>
        </div>
      </>
    );
  }
}

export default Loader;
