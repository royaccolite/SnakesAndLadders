import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent {
  @Input() diceValue !: number;
  @Input() rolling: boolean = false;

  // playClickSound(): void {
  //   const audio = new Audio('assets\rpg-dice-rolling-95182.mp3');
  //   audio.play();
  // }

  // onClick(): void {
  //   this.playClickSound();
  // }


}
