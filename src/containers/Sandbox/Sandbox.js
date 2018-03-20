import React, {Component} from 'react';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import ReactDOM from 'react-dom';
import ReactDnDHTML5Backend from 'react-dnd-html5-backend';
import EventEmitter from 'event-emitter';
import Box from '../components/UI/Box/Box';

import styles from  './Sandbox.css';

const cardStyle = {
  userSelect: 'none',
  margin: '22px',
  width: '150px',
  height: '150px',
  textAlign: 'center',
  boxShadow: '0 2px 3px #ccc',
  padding: '0.5rem 1rem',
  display: 'inline',
  cursor: 'move',
  color: 'black'
}

let classnames = styles;
let data = [
  {
    icebox: false,
    type: 'Icebox',
    content: [{
    id: 100,
    name: 'Database',
    iconClass: 'fa fa-industry'
  }, {
    id: 101,
    name: 'Machine',
    iconClass: 'fa fa-cogs'
  }]
  },
  {
    type: 'done',
    content: [{
    id: 104,
    name: 'Server',
    iconClass: 'fa fa-server'
  }]
}]

let newId = 0
let listener = new EventEmitter()


let mutateData = (id, value, currentType, type, iconClass) => {
  console.log('DATASTART', data);
  data = data.map(obj => {
    let rObj = obj
    if(rObj.type === currentType) {
      // We have to remove the element
      rObj.content = rObj.content.filter(obj => {
        return obj.id !== id
      })
      console.log('Content: ', rObj.content)
    }
    if(rObj.type === type) {
      console.log('Value: ', value)
      rObj.content.push({
        id,
        name: value
      })
    }
    return rObj
  })
  //data defines both targets
  console.log('DATA', data);
  listener.emit('moved')
}

//ReactDnDHTML5Backend

let itemTypes = {
  CARD: 'card'
}


class CardDrop extends Component {
  render() {
    let { type, connectDropTarget, isOver, children } = this.props
    console.log(this.props);
    return connectDropTarget (

        <div>
          <div className="drop-area" style={this.props.type === 'done' ? {backgroundColor: 'white'} : {backgroundColor: 'teal'}}>
            {children}
        </div>
      </div>
    )
  }
}

let cardTarget = {
  drop(props, monitor) {
    const items = monitor.getItem()
    let {type} = props
    let {currentType, value, id, iconClass} = items
    console.log('[ITEMS]:', items);

    // Mutate data
    console.log('Item: ', value, id)
    mutateData(id, value, currentType, type, )
  }
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

CardDrop = DropTarget(itemTypes.CARD, cardTarget, collectDrop) (CardDrop)

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false
    }
  }


  render() {
    let {value, isDragging, empty, connectDragSource, newItem, pos, id, iconClass} = this.props
    console.log(this.props)
    return connectDragSource(
      <div>
        <Box />
      </div>
    )
  }
}

let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const cardSource = {
  beginDrag(props) {
    console.log('Props: ', props)
    return {
      value: props.value,
      currentType: props.type,
      id: props.id,
      iconClass: props.iconClass
    }
  }
}

Card = DragSource(itemTypes.CARD, cardSource, collect) (Card)



class CardDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data
    }
    listener.on('moved', changes => {
      console.log(data)
      this.setState({
        data: data
      })
    })
  }

  renderCards() {
    console.log('Updated data: ', this.state.data)
    return this.state.data.map(obj => {

      console.log('Content: ', obj)
      return (
        <div>

          <CardDrop type={obj.type}>
             {obj.content.map((val, idx) => {
              let empty = val.name === ''
              let newItem = val.id === newId
              console.log(val.iconClass);
              console.log('name: ', val.name)
              return (
                <Card iconClass={val.iconClass} key={idx} style={{display: 'inline'}, cardStyle} empty={empty} type={obj.type} pos={idx} id={val.id} value={val.name} newItem={newItem}/>
              )
              })}

          </CardDrop>
        </div>
      )
    })
  }
  render() {
    return (
      <div className="tag-wrapper">

        {this.renderCards()}
     </div>
     )
  }
}

class Container extends Component {
  render() {
    return (
      <CardDeck/>
    )
  }
}

export default Container;
