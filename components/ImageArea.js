import React, { Component } from 'react';

class ImageArea extends Component {
  render() {
    return (
      <img src="https://picsum.photos/1200/600" style={this.props.style} />
    );
  }
}

export default ImageArea;