// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-player',
//   templateUrl: './player.component.html',
//   styleUrl: './player.component.scss'
// })
// export class PlayerComponent {
//   @Input() player!: Player;
//   playerColors: string[] = ['red', 'blue', 'green', 'yellow'];
//   getPlayerColor(): string {
//     return this.playerColors[this.player.id - 1];
//   }
// }

// interface Player {
//   id: number;
//   position: number;
// }


import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input() player!: Player;
  playerImages: string[] = ['1-solid.svg', '2-solid.svg', '3-solid.svg', '4-solid.svg'];

  getPlayerImage(): string {
    return `assets/${this.playerImages[this.player.id - 1]}`;
  }
}

interface Player {
  id: number;
  position: number;
}
