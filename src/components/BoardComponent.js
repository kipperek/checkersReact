import React, { Component } from 'react';
import { connect } from 'react-redux';
import FieldComponent from 'warcaby/components/FieldComponent';

class BoardComponent extends Component {
  constructor(props){
    super();
    this.state = {}
  }

  renderRow(row, index) {
    return (
      <div className="row" key={index}>
        {row.map( (field) => <FieldComponent field={field} key={field.id}/>)}
      </div>
    )
  }

  renderBoard() {
    return (
      this.state.board && this.state.board.map(this.renderRow)
    )
  }

  updateItems(props){
    this.setState({
      board: props.board
    });
  }

  componentDidMount() {
    this.updateItems(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateItems(nextProps);
  }

  render() {
    return (
      <div className="board">
        {this.renderBoard()}
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    board: store.gameState.board
  };
}

export default connect(mapStateToProps)(BoardComponent);
