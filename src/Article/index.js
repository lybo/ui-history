import React, { Component } from 'react';
import Image from '../Image';
import './style.css';
import ArticleForm from '../ArticleForm';


class Article extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
        };
    }

    handleChange(event) {
        const checked = event.currentTarget.checked;

        this.setState({
            editMode: checked,
        });
    }

    handleSubmit(item) {
        const { onUpdate } = this.props;

        onUpdate && onUpdate(item);

        this.setState({
            editMode: false,
        });
    }

    render() {
        const { item } = this.props;
        const { editMode } = this.state;

        if (!item) {
            return (
                <div></div>
            );
        }

        return (
            <div>
                {editMode ? (
                    <ArticleForm
                        item={item}
                        handleSubmit={this.handleSubmit.bind(this)}
                    />
                ) : (
                    <div>
                        <input type="checkbox" onChange={this.handleChange.bind(this)}/>
                        <h2>{item.title}</h2>
                        <Image src={item.image} width="180" />
                        <div dangerouslySetInnerHTML={{__html: item.article}}></div>
                    </div>
                )}
            </div>
        );
    }
}

export default Article;
