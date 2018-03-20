import React, {Component} from 'react';
// import Dustbin from '../containers/Dustbin/Dustbin';
import Dashboard from '../containers/Dashboard/Dashboard';
import Dustbin from '../components/UI/Dustbin/Dustbin';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Main extends Component{
    render() {
      return (
        <div style={{height: '100%'}}>
          <Dashboard />
        </div>
      );
    }
}

export default DragDropContext(HTML5Backend)(Main);
