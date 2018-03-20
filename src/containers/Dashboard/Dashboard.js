import React, { Component } from 'react';
import update from 'immutability-helper';
import { DropTarget } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';

import Dustbin from '../../components/UI/Dustbin/Dustbin';
import Box from '../../components/UI/Box/Box';
import ItemTypes from '../../components/ItemTypes';
import classes from './Dashboard.css';

import axios from '../../axios-dashboard';

const dashboardTarget = {
	drop(props, monitor) {
		props.onDrop(monitor.getItem());
	},
};

function collect(connect, monitor) {
	return{
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	}
}

// let ois = '';
// let sis = '';

class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			targets: [
				// { kind: 'Options', accepts: [ItemTypes.OPTION1,ItemTypes.OPTION2,ItemTypes.OPTION3,
				// 						ItemTypes.OPTION4,ItemTypes.OPTION5,ItemTypes.OPTION6], droppedItems: [] },
				{ kind: 'Selected', accepts: [ItemTypes.OPTION1,ItemTypes.OPTION2,ItemTypes.OPTION3,
										ItemTypes.OPTION4,ItemTypes.OPTION5,ItemTypes.OPTION6], droppedItems: [] },
			],
			boxes: [
				{ name: 'Server', type: ItemTypes.OPTION1, iconClass: '' },
				{ name: 'Database', type: ItemTypes.OPTION2, iconClass: ''},
				{ name: 'Ledger', type: ItemTypes.OPTION3, iconClass: ''},
				{ name: 'Machine', type: ItemTypes.OPTION4, iconClass: '' },
				{ name: 'Factory', type: ItemTypes.OPTION5, iconClass: '' },
				{ name: 'Hertz', type: ItemTypes.OPTION6, iconClass: '' },
			],
			droppedBoxNames: [],
			optionItems: [],
			selectedItems: []
		}
	}

	componentDidMount() {
		axios.get('/dashboard-settings.json')
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}

	componentDidUpdate() {
		console.log(this.state);
	}

	isDropped(boxName) {
   return this.state.droppedBoxNames.indexOf(boxName) > -1
	}

	// isSelected(boxName) {
  //  return this.state.selectedItems.indexOf(boxName) > -1
	// }

	// isOption(boxName) {
  //  return this.state.optionItems.indexOf(boxName) > -1
	// }

	getIconClass(name) {
		switch (!!name !== '') {
			case name === 'Server':
				name = 'fa fa-server'
				break;
			case name === 'Database':
				name = 'fa fa-database'
				break;
			case name === 'Ledger':
				name = 'fa fa-industry'
				break;
			case name === 'Machine':
				name = 'fa fa-cogs'
				break;
			case name === 'Factory':
				name = 'fa fa-building'
				break;
			case name === 'Hertz':
				name = 'fa fa-bolt'
				break;
			default:
			name = 'fa fa-chevron-down'
		}
		return name;
	}

	render() {

		const { boxes, targets } = this.state;

		return (
			<div className={classes.wrapper}>
				<div className={classes.top} style={{ overflow: 'hidden', clear: 'both' }}>
					{boxes.map(({ name, type, icon }, index) => {
						return (
							<Box
								name={name}
								type={type}
								key={index}
								isDropped={this.isDropped(name)}
								iconClass={this.getIconClass(name)}
							/>
						)
					}
				)}
				</div>
				<div style={{ overflow: 'hidden', clear: 'both', height: '100%' }}>
					{targets.map(({ accepts, droppedItems, kind }, index) => (
							<Dustbin
								accepts={accepts}
								kind={kind}
								droppedItems={droppedItems}
								key={index}
								onDrop={item => this.handleDrop(index, item, kind)}
						/>
					))}
				</div>
			</div>
		)
	}

	handleDrop(index, item, kind) {
		const name = item.name;
		const droppedBoxNames = name ? { $push: [name] } : {}

		// if (kind === 'Options') {
		// 	const optionItems = name ? { $push: [name] } : {}
		//
		// 	if (this.state.optionItems.length >= 0 ) {
		// 		ois = this.state.optionItems.find(dbn => {
		// 			return dbn === item.name
		// 		})
		// 	}
		// 		if (this.state.optionItems.length >= 0 && item.name !== ois && kind === 'Options') {
		// 			this.setState(
		// 				update(this.state, {
		// 					targets: {
		// 						[0]: {
		// 							droppedItems: {
		// 								$push: [item]
		// 							},
		// 						},
		// 					},
		// 					optionItems,
		// 					droppedBoxNames
		// 				}),
		// 			);
		// 		}
		//
		//
		//
		// }

		// if (kind === 'Selected') {
		// 	const selectedItems = name ? { $push: [name] } : {}
		// 	if (this.state.selectedItems.length >= 0 ) {
		// 		sis = this.state.selectedItems.find(dbn => {
		// 			console.log(dbn);
		// 			return dbn === item.name
		// 		})
		// 	}
		//
		// 	if (this.state.selectedItems.length >= 0 && item.name !== sis && kind === 'Selected') {
		// 		this.setState(
		// 			update(this.state, {
		// 				targets: {
		// 					[0]: {
		// 						droppedItems: {
		// 							$push: [item]
		// 						},
		// 					},
		// 				},
		// 				selectedItems,
		// 				droppedBoxNames
		// 			}),
		// 		);
		// 	}
		// }

		const obj = this.state.selectedItems.reduce(function(acc, cur, i) {
		  acc[i] = cur;
		  return acc;
		}, {});

		axios.post('/dashboard-settings.json', obj)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		}

}

export default DropTarget('box', dashboardTarget, collect)(Dashboard)
