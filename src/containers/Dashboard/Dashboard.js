import React, { Component } from 'react';
import classes from './Dashboard.css';

export default class AppDragDropDemo extends Component {
    state = {
        cards: [
            {name:"Machine",category:"wip", iconClass: "fa fa-cogs"},
            {name:"Database", category:"wip", iconClass:"fa fa-database"},
            {name:"Server", category:"wip", iconClass:"fa fa-server"}
          ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       let cards = this.state.cards.filter((card) => {
           if (card.name === id) {
               card.category = cat;
           }
           return card;
       });

       this.setState({
           ...this.state,
           cards
       });
    }

    render() {
        var cards = {
            wip: [],
            complete: []
        }
        console.log(this.state);

        this.state.cards.forEach ((t) => {
            cards[t.category].push(
                <div key={t.name}
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className={classes.draggable}
                >
                    {t.name}
                    <i className={t.iconClass + ' ' + classes.icon}></i>
                </div>
            );
        });

        return (
            <div className={classes.containerDrag}>
                <div className={classes.wip}
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "wip")}}>
                    <span className="card-header"></span>
                    {cards.wip}
                </div>
                <div className={classes.droppable}
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="card-header"></span>
                     {cards.complete}
                </div>


            </div>
        );
    }
}
