import store from 'warcaby/reducers';
import ACTIONS from 'warcaby/actions';

import Soldier from './Soldier';
import Player from './Player';

class Game {
  static initGame() {
    let board = this.initBoard();
    let soldiers = this.initSoldiers(board);
    let player = this.initPlayer();

    store.dispatch({
      type: ACTIONS.GAME.INIT_GAME,
      data: {
        soldiers: soldiers,
        board: board,
        player: player
      }
    });
  }

  static initBoard() {
    let board = [];
    for(let x=0;x<8;x++){
      board.push([]);
      for(let y=0; y<8;y++){
        board[x].push( { row: x, column: y, id: x*8+y, isBlack: (x*8+y) % 2 !== x%2 } );
      }
    }

    return board;
  };

  static initSoldiers(board) {
    let soldiers = [];
    soldiers = soldiers.concat(this.setInitSoldiers(0, 3, 'black', board));
    soldiers = soldiers.concat(this.setInitSoldiers(5, 8, 'white', board));

    return soldiers;
  }

  static initPlayer() {
    return new Player('white');
  }

  static setInitSoldiers(from, to, color, board) {
    let soldiers = [];
    for(let x=from;x<to;x++){
      for(let y=0; y<8;y++){
        if(board[x][y].isBlack){
          soldiers.push(new Soldier(color, x, y));
        }
      }
    }

    return soldiers;
  }

  // static generateNewSoldiers(soldiers){
  //   let newSoldiers = {};
  //
  //   for(let i in soldiers){
  //     let x = soldiers[]
  //
  //     newSoldiers[`${x}_${y}`] = new Soldier(color, x, y);
  //   }
  // }
}

export default Game;
