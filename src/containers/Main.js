import React, { Component } from 'react';
import axios from '../axios-dashboard';
import classes from './Main.css';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';

import Snackbar from 'material-ui/Snackbar';
import Spinner from '../components/UI/Spinner/Spinner';

class AppDragDropDemo extends Component {
  state = {
    cards: this.props.cards,
    loading: false,
    showSnackBar: false,
    sortId: 1
  };


  //Load data from DB
    componentWillMount() {
      const queryParams = '?auth=' + this.props.token + '&orderBy= "userId"&equalTo="' + this.props.userId + '"';
      let fetchedData = [];

      this.setState({
        loading: true
      });

      axios.get('/dashboard.json' + queryParams)
        .then(res => {
          if (!!res.data && Object.keys(res.data).length !== 0) {
            const lastKey = Object.keys(res.data).sort().splice(-1)[0];
            for (let key in res.data) {
              if (key === lastKey) {
                fetchedData = res.data[key];
              }
            }

            this.setState({
              cards: fetchedData.cards,
              loading: false
            });

          } else {
            this.setState({
              cards: this.state.cards,
              loading: false
            });
          }
        })
        .catch(err => console.log('ERROR: ', err));
    }

    //Drag events
    onDragStart = (ev, id) => {
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
           cards: [...this.state.cards]
       });

       const postData = {
         cards: this.state.cards,
         userId: this.props.userId,
         sortId: this.state.sortId++
       };

       axios.post('/dashboard.json', postData)
        .then((res) => {

          this.setState({showSnackBar: true})
        }).catch((err) => {
          console.log(err);
        });
    }

    render() {
        var cards = {
            wip: [],
            complete: []
        }

        if (this.state.loading) {
          return (
            <Spinner />
          )
        }

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
                     onDrop={(e)=>this.onDrop(e, 'complete')}>
                  <span className={classes.arrowDown}></span>
                  <span className="card-header"></span>
                  {cards.complete}
                </div>
                <Snackbar
                   open={this.state.showSnackBar}
                   message='Your dashboard has been updated!'
                   autoHideDuration={1500}
                 />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    token: state.token,
    userId: state.userId
   };
}

const mapDispatchToProps = (dispatch) => {
  return  {
    // onOptionChange: () => dispatch({ type: actionTypes.OPTION_CHANGE })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDragDropDemo);
