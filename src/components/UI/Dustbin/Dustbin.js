import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import classes from './Dustbin.css';
import Box from '../Box/Box';

const dustbinTarget = {
	drop(props, monitor) {
		props.onDrop(monitor.getItem());
	},
}

function collect(connect, monitor){
    return{
        connectDropTarget: connect.dropTarget(),
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop()
    }
}

class Dustbin extends Component {

	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool,
		canDrop: PropTypes.bool,
		accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
		droppedItems: PropTypes.array,
		onDrop: PropTypes.func.isRequired,
	}

	render() {
		const {
			kind,
			accepts,
			isOver,
			canDrop,
			connectDropTarget,
			droppedItems,
		} = this.props;

		const isActive = isOver && canDrop;

		let backgroundColor = ''

		if (this.props.kind === 'Options') {
			backgroundColor = 'lightgray';
		} else {
			backgroundColor = 'darkcyan'
		}

		if (isActive) {
			backgroundColor = '#00CDCD'
		}

		return connectDropTarget(
			<div className={classes.dropTarget} style={{backgroundColor }}>
				<span className={classes.arrowDown}></span>
				<span style={{display: 'block', padding: '40px'}}>
					{isActive
						? 'Release to drop'
						: 'Drag items to target'}
				</span>
				{this.props.droppedItems.length > 0
					? this.props.droppedItems.map(({ name, type, iconClass }, index) => {
						return (
							<Box key={index}
								   name={name}
									 type={type}
									 iconClass={iconClass}/>
							 )
						 })
					: null}
			</div>,
		)
	}
}

export default DropTarget('box', dustbinTarget, collect)(Dustbin)
