import store from 'warcaby/reducers';
import ACTIONS from 'warcaby/actions';

import Soldier from './Soldier';

class Game {

  static initGame() {
    let board = this.initBoard();
    let soldiers = this.initSoldiers(board);

    store.dispatch({
      type: ACTIONS.GAME.INIT_GAME,
      data: {
        soldiers: soldiers,
        board: board,
        move: 'white'
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

  static findBeat(soldiers, soldierOnField, activeSoldier, board){
    let possibleMoves = [];
    let newX = soldierOnField.x + (soldierOnField.x-activeSoldier.x);
    let newY = soldierOnField.y + (soldierOnField.y-activeSoldier.y);

    if(newX >=0 && newY >= 0 && board[newX] && board[newX][newY] &&
      board[newX][newY].isBlack){
        Soldier.find(newX, newY, soldiers) === null && possibleMoves.push({x: newX, y: newY, beating: soldierOnField.id });
    }

    return possibleMoves;
  }

  static findPossibleMoves(soldiers, moveColor, board, isBeatingMove, activeSoldier) {
    activeSoldier = activeSoldier || soldiers.filter((item) => {
      return item.active;
    })[0];


    let nonBeatingMoves = [];
    let beatingMoves = [];

    let getBeatingMoves = (soldierOnField) => {
      if(soldierOnField && soldierOnField.color !== moveColor){
        beatingMoves.push.apply(beatingMoves, this.findBeat(soldiers, soldierOnField, activeSoldier, board));
      }
    };

    let getNonBeatingMoves = (soldierOnField, x, newX, newY) => {
      if(soldierOnField === null && ((moveColor === 'white' && x ===-1) || (moveColor === 'black' && x === 1)) && !isBeatingMove)
       nonBeatingMoves.push({x: newX, y: newY});
   };


    for(let y=1;y>=-1;y--){
      for(let x=1;x>=-1;x--){
        let newX = activeSoldier.x+x;
        let newY = activeSoldier.y+y
        if(newX >=0 && newY >= 0 && board[newX] && board[newX][newY] &&
          board[newX][newY].isBlack){
            let soldierOnField = Soldier.find(newX, newY, soldiers);
            getNonBeatingMoves(soldierOnField, x, newX, newY);
            getBeatingMoves(soldierOnField);
        }
      }
    }

    return beatingMoves.length > 0 ? beatingMoves : nonBeatingMoves;
  }

  static makeMove(field, soldiers, activeSoldier, board, color){
    color = color || 'white';

    activeSoldier = activeSoldier || soldiers.filter((item) => {
      return item.active;
    })[0];

    let newSoldiers = soldiers.filter((item)=>{
      return field.beating !== item.id;
    }).map((item) => {
      return {
        ...item,
        active: field.beating !== undefined && item.id === activeSoldier.id,
        x: item.id === activeSoldier.id ? field.x : item.x,
        y: item.id === activeSoldier.id ? field.y : item.y
      }
    });

    let newPossibleMoves = field.beating === undefined ?
      [] : this.findPossibleMoves(newSoldiers, color, board, true);

    if(newPossibleMoves.length === 0 && field.beating !== undefined){
      newSoldiers = newSoldiers.map((item) => {
        return {
          ...item,
          active: false
        }
      });
    }

    let nextMove = {
      possibleMoves: newPossibleMoves,
      isBeating: newPossibleMoves.length > 0
    };

    store.dispatch({
      type: ACTIONS.GAME.REFRESH_SOLDIERS,
      soldiers: newSoldiers,
      changeMove: !nextMove.isBeating
    });

    if(color === 'white'){
      store.dispatch({
        type: ACTIONS.GAME.SHOW_POSSIBLE_MOVES,
        ...nextMove
      });
    }else{
      return {
        ...nextMove,
        soldiers: newSoldiers
      };
    }
  }

  static makeComputerMove(board, soldiers, moveThis, moves){
    let mySoldiers, withMove;
    if(!moveThis){
      mySoldiers = soldiers.filter((item)=>{
        return item.color === 'black';
      });

      withMove = mySoldiers.filter((item)=>{
        return Game.findPossibleMoves(soldiers, 'black', board, false, item).length > 0;
      });
    }

    moveThis = moveThis || withMove[0];
    moves = moves || Game.findPossibleMoves(soldiers, 'black', board, false, moveThis);

    let computerMove = () => {

      let moveMade = Game.makeMove(moves[0], soldiers, moveThis, board, 'black');

      if(moveMade.isBeating){
        Game.makeComputerMove(board, moveMade.soldiers, moveThis, moveMade.possibleMoves);
      }else{

      }
    };

    if(moveThis){
      setTimeout(computerMove,500);
    }
  }
}

export default Game;
