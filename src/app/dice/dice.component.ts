import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent {
  @Input() diceValue !: number;
  @Input() rolling: boolean = false;


}
