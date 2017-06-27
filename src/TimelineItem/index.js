import React, { Component } from 'react';
import Image from '../Image';
import './style.css';


class TimelineItem extends Component {
    render() {
        const { title, image } = this.props.item;

        return (
            <div>
                <b>{title}</b>
                <br/>
                <Image src={image} width="50" />
            </div>
        );
    }
}

export default TimelineItem;
