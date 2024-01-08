import { Component, ViewChild } from '@angular/core';

interface Player {
  id: number;
  icon: string;
}

@Component({
  selector: 'app-snakeandladdergame',
  templateUrl: './snakeandladdergame.component.html',
  styleUrls: ['./snakeandladdergame.component.scss']
})
export class SnakeAndLadderGameComponent {
  playerCount: number = 4;
  userInput!:number;
  isStarted:boolean=false;
  playerStyles: { [key: number]: { top: string, left: string } } = {};

  num:number=0;
  isAudio:boolean=false;
  newPos!:number;
  @ViewChild('audioPlayer') audioPlayer: any;
  players: Player[] = [
    { id: 1, icon: 'red.png' },
    { id: 2, icon: 'blue.png' },
    { id: 3, icon: 'yellow.png' },
    { id: 4, icon: 'green.png' },

  ];
  currentPlayer: number = 1;
  isRolling: boolean = false;
  playerPositions: { [key: number]: number } = {};
  diceRoll: number = 1;
  gridCells: number[] = this.generateGridCells();
  snakes: { [key: number]: boolean } = {};
  ladders: { [key: number]: boolean } = {};
  victoryMessage: string | null = null;

  constructor() {
    this.generateSnakesAndLadders();
    this.players.forEach(player => {
      this.playerPositions[player.id] = 1;
      this.playerStyles[player.id] = { top: '0px', left: '0px' };
    });
  }

  
  generateGridCells(): number[] {
    let cells: number[] = [];


    for(let i= 100; i > 90; i--){
      cells.push(i);
    }
    for (let i = 81; i <= 90; i++) {
      cells.push(i);
    }
    for(let i= 80; i > 70; i--){
      cells.push(i);
    }
    for (let i = 61; i <= 70; i++) {
      cells.push(i);
    }
    for(let i= 60; i > 50; i--){
      cells.push(i);
    }
    for (let i = 41; i <= 50; i++) {
      cells.push(i);
    }
    for(let i= 40; i > 30; i--){
      cells.push(i);
    }
    
    for (let i = 21; i <= 30; i++) {
      cells.push(i);
    }
    for(let i= 20; i > 10; i--){
      cells.push(i);
    }
    for (let i = 1; i <= 10; i++) {
      cells.push(i);
    }

    return cells;
  }

  generateSnakesAndLadders() {
    const snakeCount = Math.floor(Math.random() * 2) + 6;
    for (let i = 0; i < snakeCount; i++) {
      const snakePosition = Math.floor(Math.random() * 80) + 11;
      this.snakes[snakePosition!==100?snakePosition:99] = true;
    }
  
    const ladderCount = Math.floor(Math.random() * 2) + 7;
    for (let i = 0; i < ladderCount; i++) {
      let ladderPosition;
      do {
        ladderPosition = Math.floor(Math.random() * 85) + 2; // Ensure ladder is not in (91 to 100)
      } while (this.snakes[ladderPosition]); // Avoid overlap with snakes
      this.ladders[ladderPosition] = true;

    }
  }

  rollDice() {
    this.num++;
    this.diceRoll = Math.floor(Math.random() * 6) + 1;
    this.audioPlayer.nativeElement.play();
    this.isRolling = true;
    setTimeout( () =>{
    this.isAudio=true;
    this.isRolling = false;
    this.movePlayer(this.players[this.currentPlayer - 1], this.diceRoll);
  },1500);
    
    this.isAudio=false;
    // Trigger dice roll animation
  //   setTimeout(() => {
  //     this.diceRoll = Math.floor(Math.random() * 6) + 1;
  //     this.audioPlayer.nativeElement.play(); // Play the rolling sound
  // }, 0); // Adjust the duration of the animation

  }

  onButtonClick(){
    this.isStarted=true;
    if(this.userInput==2){
      this.playerCount=2;
      this.players=[
        { id: 1, icon: 'red.png' },
        { id: 2, icon: 'blue.png' },
      ]
    }
    else if(this.userInput==3){
      this.playerCount=3;
      this.players=[
        { id: 1, icon: 'red.png' },
        { id: 2, icon: 'blue.png' },
        { id: 3, icon: 'yellow.png' },
      ]
    }
    else if(this.userInput==4){
      this.playerCount=4;
      this.players=[
        { id: 1, icon: 'red.png' },
        { id: 2, icon: 'blue.png' },
        { id: 3, icon: 'yellow.png' },
        { id: 4, icon: 'green.png' },
      ]
    }
    
  }

  movePlayer(player: Player, steps: number) {
    const currentPosition = this.playerPositions[player.id];
    const newPosition = this.checkSnakesAndLadders(Math.min(currentPosition + steps, 100));
    this.playerPositions[player.id] = newPosition;
  
    
    if (newPosition >= 100) {

      this.victoryMessage = `Player ${player.id} Won the game!`;
    }

    // if (this.snakes[newPosition]) {
    //   this.playerPositions[player.id] = this.snakeEndPositions[newPosition];
    // } else if (this.ladders[newPosition]) {
    //   this.playerPositions[player.id] = this.ladderEndPositions[newPosition];
    // }
    this.newPos=newPosition;
  
    // Switch to the next player
    this.switchPlayer();
  }
  
  

  checkSnakesAndLadders(newPosition: number): number {
    if (this.snakes[newPosition]) {
      
      const newPositionAfterSnake= newPosition-Math.floor((Math.random()*(newPosition-1))+1);
      return Math.max(newPositionAfterSnake, 1);
    } else if (this.ladders[newPosition]) {
      return Math.min(newPosition+Math.floor((Math.random()* 25)+1),95);
    }
    return newPosition;
  }

  switchPlayer() {
    this.currentPlayer = (this.currentPlayer % this.playerCount) + 1;
  }

  getPlayerStyle(player: Player, currentCell: number): any {
    const cell = this.playerPositions[player.id];
  
    // Check if the player is at the current cell
    if (cell === currentCell) {
      const row = Math.ceil(cell / 10);
      const col = (row % 2 === 0) ? 11 - (cell % 10) : (cell % 10);
  
      return {
        top: `${(row - 1) * 1}px`, // Adjust spacing
        left: `${(col - 1) * 1}px` // Adjust spacing
      };
    } else {
      // If the player is not at the current cell, hide the icon
      return {
        display: 'none'
      };
    }
  }
  
}
