import { Component } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';

import { TilesComponent } from './components/tiles.component';
import { PlayersComponent } from './components/players.component';

export enum GameState {
  AddPlayers = 0,
  FirstRound = 1,
  ReplaceFirstClueTile = 2,
  SecondRound = 3,
  ReplaceSecondClueTile = 4,
  ThirdRound = 5
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TilesComponent, PlayersComponent],
  template: `
    <div style="display: flex; gap: 0.5rem;">
      <dec-players [gameState]="gameState" (setGameState)="updateGameState($event)"></dec-players>
      <dec-tiles [gameState]="gameState" (setGameState)="updateGameState($event)"></dec-tiles>
    </div>
  `
})
export class App {
  gameState: GameState = GameState.AddPlayers;

  updateGameState(state: GameState): void {
    this.gameState = state; // TODO Validate the value?
  }
}

    bootstrapApplication(App, {
        providers: [
          provideAnimations()
        ]
     })
