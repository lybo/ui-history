import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import TimelineHistory from './TimelineHistory';
import TimelineItem from './TimelineItem';
import { items } from './data.js';
import moment from 'moment';

// http://visjs.org/docs/timeline/#Configuration_Options
const DEFAULT_OPTIONS = {
    width: '100%',
    height: '500px',
    stack: true,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 1000,
    zoomMax: 100000000000,
    type: 'background',
    start: new Date(1789, 1, 1),
    end: new Date(1793, 12, 12),
    format: {
        minorLabels: {
            minute: 'h:mma',
            hour: 'ha'
        }
    },
    template: function (item, element, data) {
        return ReactDOM.render(<TimelineItem item={item} />, element);
    },
};

const DATE_FORMAT = 'DD/MM/YYYY HH:mm';

function getMappedItems(items) {
    return items.map((item, i) => {
        return Object.assign({}, item, {
            id: i + 1,
            start: moment(item.start, DATE_FORMAT),
        });
    });
}

// jsx
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: true,
            items: getMappedItems(items),
        };
    }

    onUpdate(item) {
        const { items } = this.state;
        const newItems = items.map((i) => {
            if (i.id === item.id) {
               return Object.assign({}, i, item);
            }

            return i;
        });

        this.setState({
            items: [...newItems]
        });
    }

    getItems(items) {
        this.setState({
            items: [...items]
        });
        console.log(items.map((item) => {
            return Object.assign({}, item, {
                start: moment(item.start).format(DATE_FORMAT),
            });
        }));
    }

    getOptions() {
        const { editMode } = this.state;
        return !editMode ?
            DEFAULT_OPTIONS :
            Object.assign({}, DEFAULT_OPTIONS, {
                editable: {
                    add: true,
                    updateTime: true,
                    updateGroup: true,
                    remove: true
                },
                onAdd: function (item, callback) {
                    const title = prompt('Title', '');
                    if (title) {
                        delete item.content;
                        const mappedItem = Object.assign({}, item, {
                            title,
                            image: '',
                            article: '',
                            type: 'box',
                            start: moment(item.start),
                        });
                        this.getItems([...this.state.items, mappedItem]);
                    }
                }.bind(this),
                onMove: function (item, callback) {
                    this.getItems(this.state.items.map((i) => {
                        if (item.id === i.id) {
                            i.start = moment(item.start);
                        }
                        return i;
                    }));
                    callback(item);
                }.bind(this),
            });
    }

    render() {
        const { items } = this.state;

        return (
            <div className="App">
                <TimelineHistory
                    options={this.getOptions()}
                    items={items}
                    onUpdate={this.onUpdate.bind(this)}
                />
            </div>
        );
    }
}

export default App;
