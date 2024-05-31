import { element } from "prop-types";
import React from "react";
import { useState, useEffect } from "react";



export const Checkers = () => {
  const [countMove, setCountMove] = useState(0);
  const [undoBoardValue, setUndoBoardValue] = useState([]);

  const [boardValue, setBoardValue] = useState([]);
  const [potentialMove, setPotentialMove] = useState({ first: null, second: null, current: null });
  const [playerScore, setPlayerScore] = useState({ player: 0, playerM: 0, player2: 0, player2M: 0 });
  const [lastRecord, setLastRecord] = useState({});

  useEffect(() => {

    initialize_board();

  }, []);


  const initialize_board = () => {

    let reset_board = [{ classN: 'dark_brown', i: 0, checker: 'O' }, { classN: 'dark_brown', type: true, position: 1, checker: 'O', id: 'C1' }];

    for (let i = 2; i < 65; i++) {
      let newObj = {};
      newObj.type = false;
      newObj.checker = '';
      newObj.id = 'C' + i;
      if (reset_board[i - 1].classN == 'dark_brown') {

        if ((i - 1) % 8 == 0) {
          newObj.classN = 'dark_brown';
          newObj.type = true;
          if (i < 24) {
            newObj.checker = 'O';
          }
          if (i > 40) {
            newObj.checker = 'X';
          }

        }

        else {
          newObj.classN = 'light_brown';
        }
      }

      else {

        if ((i - 1) % 8 == 0) {
          newObj.classN = 'light_brown';
        }
        else {
          newObj.classN = 'dark_brown';
          newObj.type = true;
          if (i < 24) {
            newObj.checker = 'O';
          }
          if (i > 40) {
            newObj.checker = 'X';
          }

        }

      }


      newObj.position = i;
      reset_board.push(newObj);

    }
    console.log('This is our board position and data :');
    console.log(reset_board);

    setBoardValue(reset_board);


  }



  function Move_cell(board) {
    let all_sqr = document.querySelectorAll('.possible_move');
    if (all_sqr) {
      for (let i = 0; i < all_sqr.length; i++) {
        all_sqr[i].classList.remove('possible_move');
      }
    }

    let all_current = document.querySelectorAll('.theBoard>div');
    if (all_current) {
      for (let i = 0; i < all_current.length; i++) {
        all_current[i].classList.remove('current_move');

      }
    }

    // check if this attempt is the result of two potential clean moves
   
   
    // Our board is an array of object that store the position of each piece, 
    // everytime you click on a piece we highlight the potential moves and store them in a variable, 
    // later on when you try to move we check if it is one of the potential moves and we update the board but before we do,
    //  we capture the value of the board before change it, therefore when you click on the undo button we can change boardvalue. 
    //  with the UndoboardValue
 
 
 
    if (board.position == potentialMove.first || board.position == potentialMove.second) {
      setLastRecord(playerScore);
      let clone_board = [...boardValue];
      console.log('this is our player score before move :', playerScore);
      console.log('this is our board before move :', boardValue);
      setUndoBoardValue(clone_board);
  

      if (boardValue[potentialMove.current].checker == 'O') {
        clone_board[board.position].checker = 'O';
        clone_board[potentialMove.current].checker = '';
        var clone_player_score = { player: playerScore.player, playerM: playerScore.playerM + 1, player2: playerScore.player2, player2M: playerScore.player2M };
      }

      else {
        clone_board[board.position].checker = 'X';
        clone_board[potentialMove.current].checker = '';
        var clone_player_score = { player: playerScore.player, playerM: playerScore.playerM, player2: playerScore.player2, player2M: playerScore.player2M + 1 };

      }

      setBoardValue(clone_board);
      setPlayerScore(clone_player_score);
      setCountMove(countMove + 1);
      var clone_obj = { first: null, second: null, current: null };
      setPotentialMove(clone_obj);
      console.log('this is our player score after move :', clone_player_score);
      return;

    }


    // check if this move is an attempt to jump your opponent piece
    if (board.position == potentialMove.third) {
      let clone_board = [...boardValue];
      // setUndoBoardValue(clone_board);
      setLastRecord(playerScore);

      if (boardValue[potentialMove.current].checker == 'O') {
        clone_board[board.position].checker = 'O';
        clone_board[potentialMove.current].checker = '';
        clone_board[potentialMove.jump].checker = '';
        var clone_player_score = { player: playerScore.player + 1, playerM: playerScore.playerM + 1, player2: playerScore.player2, player2M: playerScore.player2M };


      } else {


        clone_board[board.position].checker = 'X';
        clone_board[potentialMove.current].checker = '';
        clone_board[potentialMove.jump].checker = '';
        var clone_player_score = { player: playerScore.player, playerM: playerScore.playerM, player2: playerScore.player2 + 1, player2M: playerScore.player2M + 1 };

      }

      setPlayerScore(clone_player_score);
      setCountMove(countMove + 1);
      setBoardValue(clone_board);
      var clone_obj = { first: null, second: null, current: null };
      setPotentialMove(clone_obj);
      return;
    }




    if (boardValue[board.position].checker) {
      if (boardValue[board.position].checker == 'O') {

        first_player_check_move(board);
      }

      else {
        second_player_check_move(board);
      }

    }
  }


  // if(countMove%2==0){
  // if(boardValue[board.position].checker=='O'){
  // first_player(board);
  // }
  // }

  // else{
  //   if(boardValue[board.position].checker=='X'){
  //  second_player(board);
  //   }

  // }



  function first_player_check_move(board) {
    // ne= North East, nw= North West, sw = South West, se= South East
    var clone_obj = { first: null, second: null, current: board.position };

    // check if you have your first clean move
    if (boardValue[board.position + 7].checker == '' && boardValue[board.position + 7].type == true) {
      let nw_spot = board.position + 7;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.first = nw_spot;
    }

    // check if your first potential move is a game
    if (boardValue[board.position + 7].checker == 'X' && boardValue[board.position + 14].checker == '') {
      let nw_spot = board.position + 14;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.third = nw_spot;
      clone_obj.jump = board.position + 7;
    }

    // check if you have a second clean move
    if (boardValue[board.position + 9].checker == '' && boardValue[board.position + 9].type == true) {
      let ne_spot = board.position + 9;
      let get_id = '#C' + ne_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');
      clone_obj.second = ne_spot;

    }


    // check if your second move is a potential game
    if (boardValue[board.position + 9].checker == 'X' && boardValue[board.position + 18].checker == '') {
      let nw_spot = board.position + 18;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.third = nw_spot;
      clone_obj.jump = board.position + 9;
    }

    setPotentialMove(clone_obj);
    console.log('this is the potential move in our state : ', clone_obj);

  }


  function second_player_check_move(board) {

    // ne= North East, nw= North West, sw = South West, se= South East

    var clone_obj = { first: null, second: null, current: board.position };
    // check if our first move is clean
    if (boardValue[board.position - 7].checker == '' && boardValue[board.position - 7].type == true) {
      let ne_spot = board.position - 7;
      let get_id = '#C' + ne_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.first = ne_spot;
      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');
    }


    // check if your first potential move is a game
    if (boardValue[board.position - 7].checker == 'O' && boardValue[board.position - 14].checker == '' && boardValue[board.position - 14].type == true) {
      console.log('check our number and after : ' + nw_spot);
      let nw_spot = board.position - 14;
      console.log('check our number and after : ' + nw_spot);
      let get_id = '#C' + nw_spot;

      console.log('check our number and after : ' + nw_spot);
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.third = nw_spot;
      clone_obj.jump = board.position - 7;

      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');
    }

    // check your second potential move
    if (boardValue[board.position - 9].checker == '' && boardValue[board.position - 9].type == true) {
      console.log('check our number and before : ' + nw_spot);
      let nw_spot = board.position - 9;
      console.log('check our number and after : ' + nw_spot);
      let get_id = '#C' + nw_spot;
      let second_spot = document.querySelector(get_id);
      second_spot.classList.add('possible_move');
      let current_spot = '#C' + board.position;
      let this_spot = document.querySelector(current_spot);
      this_spot.classList.add('current_move');
      clone_obj.second = nw_spot;

    }


    // check if your second potential move is a game
    if (boardValue[board.position - 9].checker == 'O' && boardValue[board.position - 18].checker == '' && boardValue[board.position - 18].type == true) {
      let nw_spot = board.position - 18;
      let get_id = '#C' + nw_spot;
      let first_spot = document.querySelector(get_id);
      first_spot.classList.add('possible_move');
      clone_obj.third = nw_spot;
      clone_obj.jump = board.position - 9;
    }


    setPotentialMove(clone_obj);
    console.log('this is the potential move in our state : ', clone_obj);

  }

  function undo_function() {
    // setBoardValue(undoBoardValue);
    setPlayerScore(lastRecord);
    if (countMove > 0) {
      console.log('this is the previous record : ')
      console.log(boardValue);
      console.log(undoBoardValue);

    }

  }


  return (

    <div class="container d-flex pt-4">
      <div class="theBoard"  >

        {boardValue.slice(1).map((board, ind) =>
          <div key={ind} class={board.classN} id={board.id} onClick={(e) => Move_cell(board, e)}><span>{board.checker}</span></div>

        )}

      </div>

      <div >
        <div className="score_div">
          <h5> Player 1 : {playerScore.player}<br />
            Move: {playerScore.playerM}<br /><br />
            Player 2 : {playerScore.player2}<br />
            Move: {playerScore.player2M}<br /><br /><br />
            Total Move : {countMove}


          </h5>

        </div>

        <button className="btn btn-secondary mt-3 p-3" onClick={() => undo_function()}><i class="fa-solid fa-arrow-rotate-left fa-2xl"></i></button>

      </div>



    </div>

  );

};


