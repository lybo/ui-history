import React, { Component } from 'react';
import './style.css';


class ArticleForm extends Component {
    handleSubmit(event) {
        event.preventDefault();

        const { handleSubmit, item } = this.props;

        handleSubmit && handleSubmit(Object.assign({}, item, {
            title: this.title.value,
            image: this.image.value,
            article: this.article.value,
        }));
    }

    handleCancel(event) {
        event.preventDefault();

        const { handleCancel } = this.props;

        handleCancel && handleCancel();
    }

    render() {
        const { item } = this.props;

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        defaultValue={item.title}
                        ref={(title) => this.title = title}
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type="text"
                        defaultValue={item.image}
                        ref={(image) => this.image = image}
                    />
                </div>
                <div>
                    <label>Content</label>
                    <textarea
                        cols="100"
                        rows="100"
                        defaultValue={item.article}
                        ref={(article) => this.article = article}>
                    </textarea>
                </div>
                <button>Save</button>
                <a href="/cancel" onClick={this.handleCancel.bind(this)}>Cancel</a>
            </form>
        );
    }
}

export default ArticleForm;
