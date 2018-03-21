import React, { Component } from 'react';
import axios from '../axios-dashboard';
import classes from './Main.css';

import Spinner from '../components/UI/Spinner/Spinner';

export default class AppDragDropDemo extends Component {
    state = {
        cards: [
          {name: "Machine", category: "wip", iconClass: "fa fa-cogs"},
          {name: "Database", category: "wip", iconClass: "fa fa-database"},
          {name: "Server", category: "wip", iconClass: "fa fa-server"},
          {name: "Ledger", category: "wip", iconClass: "fa fa-industry"},
          {name: "Factory", category: "wip", iconClass: "fa fa-building"},
          {name: "Hertz", category: "wip", iconClass: "fa fa-bolt"}
        ],
        loading: false
      }

    componentWillMount() {
      let fetchedData = [];

      this.setState({
        loading: true
      });

      axios.get('/dashboard.json')
        .then(res => {
          console.log('RES DATA: ', res.data);
          if (!!res.data) {
            for (let key in res.data) {
              fetchedData = res.data[key];
            }

            this.setState({
              cards: fetchedData,
              loading: false
            });
          } else {
            this.setState({
              loading: false
            })
          }

        })
        .catch(err => console.log('ERROR', err));
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       console.log(id);
       let cards = this.state.cards.filter((card) => {
           if (card.name === id) {
               card.category = cat;
           }
           return card;
       });


       this.setState({
           cards: [...this.state.cards]
       });

       console.log(this.state.cards);
       axios.post('/dashboard.json', this.state.cards)
        .then((res) => {
        }).catch((err) => {
          console.log(err);
        });
    }

    render() {
        var cards = {
            wip: [],
            complete: []
        }

        console.log('STATE ON RENDER:', this.state);

        if (this.state.loading) {
          return (
            <Spinner />
          )
        }

        if (!this.state.loading) {

          this.state.cards.forEach ((t) => {
              cards[t.category].push(
                  <div key={t.name}
                       onDragStart = {(e) => this.onDragStart(e, t.name)}
                       draggable
                       className={classes.draggable}>
                      {t.name}
                      <i className={t.iconClass + ' ' + classes.icon}></i>
                  </div>
              );
          });
        }

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
