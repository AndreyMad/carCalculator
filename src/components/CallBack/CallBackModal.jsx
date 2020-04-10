import React, { Component } from "react";
import style from "./CallBack.module.css";

class CallBackModal extends Component {
  state = {
    formValues: ""
  };

  render() {
    const { formValues } = this.state;
    return (
      <>
        <div className={style.containerDelivery}>{formValues}</div>
      </>
    );
  }
}

export default CallBackModal;
