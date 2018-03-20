import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import classes from './Box.css';

const boxSource = {
	beginDrag(props) {
		return {
			...props,
		}
	},
};

function collection(connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
				connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}

class Box extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		isDropped: PropTypes.bool,
		iconClass: PropTypes.string
	};

	render() {
		const { name, isDropped, isDragging, connectDragSource } = this.props;
		const opacity = isDragging ? 0.4 : 1;
		const display = isDropped ? 'none' : 'visible';

		return connectDragSource(
			<div className={classes.Box} style={{ opacity, display }}>
				<div>
					<p>
						{name}
					</p>
				</div>
				<i className={`${this.props.iconClass } ${classes.icon}`}></i>
			</div>,
		)
	}
}

export default DragSource('box', boxSource, collection)(Box);
