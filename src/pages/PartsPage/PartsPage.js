import React, { Component } from "react";
import * as API from "../../api/api";

class PartsPage extends Component {
  state = { imagePreviewUrl: null };

  render() {
    const { imagePreviewUrl } = this.state;

    return (
      <>
        <div>{API}</div>
        <div>{imagePreviewUrl}</div>
      </>
    );
  }
}

export default PartsPage;
