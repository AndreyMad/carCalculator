import React, { Component } from "react";
import * as API from "../../api/api";

class PartsPage extends Component {
  state = { imagePreviewUrl: null };

  handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    const { file } = this.state;
    API.sendFile(file);
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imagePreviewUrl } = this.state;

    return (
      <div>
        <div className="previewComponent">
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              className="fileInput"
              type="file"
              onChange={e => this.handleImageChange(e)}
            />
            <button
              className="submitButton"
              type="submit"
              onClick={e => this.handleSubmit(e)}
            >
              Upload Image
            </button>
          </form>
          <div className="imgPreview">
            {imagePreviewUrl ? <img src={imagePreviewUrl} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default PartsPage;
