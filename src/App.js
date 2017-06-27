import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import TimelineHistory from './TimelineHistory';
import TimelineItem from './TimelineItem';

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

// jsx
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
        };
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
            });
    }

    render() {
        return (
            <div className="App">
                <TimelineHistory options={this.getOptions()}/>
            </div>
        );
    }
}

export default App;
