import React, { Component } from 'react';
import './style.css';


class Image extends Component {
    render() {
        const { src, width } = this.props;

        return (
            <div>
                {src ? (
                    <img src={src} width={width} alt="" />
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}

export default Image;
