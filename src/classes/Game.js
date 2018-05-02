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

  static findPossibleMoves(soldiers, move, board) {
    let possibleMoves = [];
    let activeSoldier = soldiers.filter((item) => {
      return item.active;
    })[0];

    for(let x=-1;x<=1;x++){
      for(let y=1;y>=-1;y--){
        let newX = activeSoldier.x+x;
        let newY = activeSoldier.y+y
        if(newX >=0 && newY >= 0 && board[newX] && board[newX][newY] &&
          board[newX][newY].isBlack && Soldier.find(newX, newY, soldiers) === null){
          possibleMoves.push({x: newX, y: newY});
        }
      }
    }
    return possibleMoves;
  }

  static makeMove(field, soldiers){
    let activeSoldier = soldiers.filter((item) => {
      return item.active;
    })[0];

    console.log(activeSoldier)
    // let newSoldiers = soldiers.map((item) => {
    //   let newItem = {
    //     ...item
    //   };
    //
    //   return newItem;
    // });
    //
    // store.dispatch({
    //   type: ACTIONS.GAME.REFRESH_SOLDIERS,
    //   soldiers: newSoldiers
    // });
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
