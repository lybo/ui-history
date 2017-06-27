import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import './style.css';
import './theme.css';
import Article from '../Article';

class TimelineHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItemId: null
        };
    }

    clickHandler(event) {
        const itemId = event.item;

        if (!itemId) {
            return;
        }

        this.setState({
            selectedItemId: itemId
        });


    }

    getSelectedItem() {
        const { items } = this.props;
        const { selectedItemId } = this.state;
        return items.find((i) => i.id === selectedItemId);
    }

    render() {
        const { options, items, onUpdate } = this.props;

        return (
            <div>
                <Timeline
                    options={options}
                    items={items}
                    clickHandler={this.clickHandler.bind(this)}
                />
                <Article
                    item={this.getSelectedItem()}
                    onUpdate={onUpdate}
                />
            </div>
        );
    }
}

export default TimelineHistory;
