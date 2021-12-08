class Connect4 {
  constructor(row, column) {
    
    if (typeof row != "number" || typeof column != "number") {
      throw new Error("Row and Column must be Number!");
    }

    if (row < 6 && column < 7) {
      throw new Error("Row must be greater than 6 and Column must be greater than 7");
    }
    
    this.size = { row, column };
    
    this.board = new Array(column).fill(null)
    .map(i => new Array(row).fill(null));
    
    this.turn = null;

    this.nextTurn = null;
    
    this.lastMove = {
      row: null,
      column: null
    }

    this.isMoved = false;

    this.boardCapacity = row * column;
  }


  reset() {
    this.board = new Array(this.size.column).fill(null)
    .map(i => new Array(this.size.row).fill(null));

    this.turn = null;

    this.nextTurn = null;
    
    this.lastMove = {
      row: null,
      column: null
    }

    this.isMoved = false;

    this.boardCapacity = this.size.row * this.size.column;
  }
  
  isBoardCapacityFull() {
    return this.boardCapacity === 0;
  }

  putRed(column) {

    if (this.nextTurn) {
      if (this.nextTurn !== "red") {
        throw new Error("It's Yellow's turn to play not Red!")
      }
    }

    if (this.boardCapacity === 0) {
      this.isMoved = false;
      return this;
    }

    for (let i = this.size.row - 1; i >= 0; i--) {

      if (!this.board[column][i]) {

        this.board[column][i] = "red";

        this.boardCapacity -= 1;
        
        this.lastMove.row = i;
        
        this.lastMove.column = column;
        
        this.turn = "red";
        
        this.nextTurn = "yellow";

        this.isMoved = true;
        
        return this;
      }
    }

    this.isMoved = false;

    return this;
  }


  
  putYellow(column) {

    if (this.nextTurn) {
      if (this.nextTurn !== "yellow") {
        throw new Error("It's Red's turn to play not Yellow!")
      }
    }

    if (this.boardCapacity === 0) {
      this.isMoved = false;
      return this;
    }

    for (let i = this.size.row - 1; i >= 0; i--) {

      if (!this.board[column][i]) {

        this.board[column][i] = "yellow";

        this.boardCapacity -= 1;
        
        this.lastMove.row = i;
        
        this.lastMove.column = column;
        
        this.turn = "yellow";
        
        this.nextTurn = "red";

        this.isMoved = true;
        
        return this;
      }
    }
    
    this.isMoved = false;
    
    return this;
  }


  static checkWin({...obj}) {
    
    if (!obj.isMoved) {
      return {
        isWin: null,
        winner: null
      }
    }

    const { size, board, turn, lastMove } = obj;

    const { row, column } = lastMove;


    let verticalCounter = 0;
    let horizontalCounter = 0;

    // check vertical
    for (let i = 0; i < size.column; i++) {

      if (board[column][i] === turn) {
        verticalCounter += 1;
      } else {
        verticalCounter = 0;
      }

      if (verticalCounter === 4) {
        return {
          isWin: true,
          winner: turn,
        };
      }     

    }
       
    // check horizontal
    for (let i = 0; i < size.row; i++) {
      
      if (board[i][row] === turn) {
        horizontalCounter += 1;
      } else {
        horizontalCounter = 0;
      }

      if (horizontalCounter === 4) {
        return {
          isWin: true,
          winner: turn,
        };
      }     
    }
    // if ( verticalCounter === 4 
    //   || horizontalCounter === 4) {
    //   return {
    //     isWin: true,
    //     winner: turn,
    //     verticalCounter,
    //     horizontalCounter
    //   };
    // }


    // find diogonals start coordinates

    // Top-Left to Bottom-Right

    let tLbR = null;

    // const LRmaxRowAndCol = size - 4;
    const LRmaxRow = size.row - 4;
    const LRmaxColumn = size.column - 4;

    // r 2
    // c 3
    
    const LRtemp = row < column ? row : column;

    let LRrow = row - LRtemp;
    let LRcolumn = column - LRtemp;

    if (LRrow <= LRmaxRow && LRcolumn <= LRmaxColumn) {
      tLbR = {
        row: LRrow,
        column: LRcolumn
      }
    }

    // check Top-Left to Bottom-Right

    if (tLbR) {

      let countLR = 0;

      while (tLbR.row < size.row && tLbR.column < size.column) {

        if (countLR === 4) {
          break;
        }

        if (board[tLbR.column][tLbR.row] === turn) {
          countLR += 1;
        } else {
          countLR = 0;
        }
        
        tLbR.row++;
        tLbR.column++;
      }

      if (countLR === 4) {
        return {
          isWin: true,
          winner: turn
        }
      }
    }


    // Top-Right to Bottom-Left

    let tRbL = null;

    const RLmaxRow = size.row - 4;
    const RLminColumn = 2;
    
    const x = row + 0;
    const y = (size.column - 1) - column;
    
    const RLtemp = x < y ? x : y;

    let RLrow = row - RLtemp;
    let RLcolumn = column + RLtemp;

    if (RLrow <= RLmaxRow && RLcolumn > RLminColumn) {
      tRbL = {
        row: RLrow,
        column: RLcolumn
      }
    }

    // check Top-Right to Bottom-Left

    if (tRbL) {

      let endRow = tRbL.column;
      let endColumn = tRbL.row;
      
      let countRL = 0;
      
      while (tRbL.row <= endRow && tRbL.column >= endColumn) { 
    
        if (countRL === 4) {
          break;
        }
    
        if (board[tRbL.column][tRbL.row] === turn) {
          countRL += 1;
        } else {
          countRL = 0;
        }
    
        tRbL.row++;
        tRbL.column--;
      }
    
      if (countRL === 4) {
        return {
          isWin: true,
          winner: turn
        }
      }
    }

    return {
      isWin: false,
      winner: null
    }
  }
}
export default Connect4;