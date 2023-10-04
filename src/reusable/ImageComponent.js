/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-useless-constructor */
import React, {Component} from 'react';

class ImageComponent extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    let imgStyle = {
      width: 120,
      height: 120,
      borderRadius: 60,
      ...this.props.imgStyle,
    };
    return (
      <div>
        <img style={imgStyle} src={this.props.url} alt="display image" />
      </div>
    );
  }
}

export default ImageComponent;
