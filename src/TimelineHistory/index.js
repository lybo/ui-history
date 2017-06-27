import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import { items } from './data.js';
import moment from 'moment';
import './style.css';
import './theme.css';
import Article from '../Article';

function getMappedItems(items) {
    return items.map((item, i) => {
        return Object.assign({}, item, {
            id: i + 1,
            start: moment(item.start, 'DD/MM/YYYY HH:mm'),
        });
    });
}

const mappedItems = getMappedItems(items);

class TimelineHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: null
        };
    }

    clickHandler(event) {
        const itemId = event.item;
        if (!itemId) {
            return;
        }

        const item = mappedItems.find((i) => i.id === itemId);

        if (!item) {
            return;
        }

        this.setState({
            selectedItem: item
        });
    }

    render() {
        const { options } = this.props;
        const { selectedItem } = this.state;

        return (
            <div>
                <Timeline
                    options={options}
                    items={mappedItems}
                    clickHandler={this.clickHandler.bind(this)}
                />
                <Article item={selectedItem} />
            </div>
        );
    }
}

export default TimelineHistory;
