import store from 'warcaby/reducers';
import ACTIONS from 'warcaby/actions';

import Soldier from './Soldier';
import Player from './Player';

class Game {
  constructor() {
    this.initBoard();
    this.initSoldiers();
    this.initPlayer();

    store.dispatch({
      type: ACTIONS.GAME.INIT_GAME,
      data: {
        soldiers: this._soldiers,
        board: this._board,
        player: this._player,
        game: this
      }
    });
  }

  initBoard() {
    this._board = [];
    for(let x=0;x<8;x++){
      this._board.push([]);
      for(let y=0; y<8;y++){
        this._board[x].push( { row: x, column: y, id: x*8+y, isBlack: (x*8+y) % 2 !== x%2 } );
      }
    }
  }

  initSoldiers() {
    this._soldiers = {};
    this.setInitSoldiers(0, 3, 'black');
    this.setInitSoldiers(5, 8, 'white');
  }

  initPlayer() {
    this._player = new Player('white');
  }

  setInitSoldiers(from, to, color) {
    for(let x=from;x<to;x++){
      for(let y=0; y<8;y++){
        if(this._board[x][y].isBlack){
          this._soldiers[`${x}_${y}`] = new Soldier(color, x, y);
        }
      }
    }
  }
}

export default Game;
