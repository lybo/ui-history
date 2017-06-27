import React, { Component } from 'react';
import Image from '../Image';
import './style.css';


class Article extends Component {
    render() {
        const { item } = this.props;

        return (
            <div>
                {item ? (
                    <div>
                        <h2>{item.title}</h2>
                        <Image src={item.image} width="180" />
                        <div dangerouslySetInnerHTML={{__html: item.article}}></div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}

export default Article;
