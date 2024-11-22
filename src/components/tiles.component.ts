import { Component, EventEmitter, Input, Output } from "@angular/core";
import {CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonModule } from "@angular/common";
import { TileComponent } from './tile.component';
import { getRandomElement, pickAndRemove, shuffleArray } from "../helpers/functions";
import { GameState } from "../main";
import { trigger, transition, style, animate, query, stagger } from "@angular/animations";

export type Tile = {
    title: string;
    clues: string[];
}

// const listAnimation = trigger('listAnimation', [
//   transition('* <=> *', [
//     query(':enter',
//       [style({ opacity: 0 }), stagger('1000ms', animate('1000ms ease-out', style({ opacity: 1 })))],
//       { optional: true }
//     ),
//     query(':leave',
//       animate('2.00ms', style({ opacity: 0 })),
//       { optional: true}
//     )
//   ])
// ]);

@Component({
    standalone: true,
    imports: [CdkDrag, CdkDropList, CommonModule, TileComponent],
    styleUrl: "tiles.component.scss",
    selector: "dec-tiles",
    templateUrl: "tiles.component.html",
  //   animations: [
  //     listAnimation,
  //     trigger("fadeInOut", [
  //         transition(":enter", [
  //           style({ opacity: 0 }),
  //           animate("1000ms 1000ms", style({ opacity: 1 }))
  //         ]),
  //         transition(":leave", [animate(1000, style({ opacity: 0 }))])
  //       ])
  // ]
})
export class TilesComponent {
  @Input()
  gameState: GameState | null = null;

  @Output()
  setGameState = new EventEmitter<GameState>();
  
    causeOfDeath = getCauseOfDeath();
    randomLocation = getLocation();
    allClueTiles = clueTiles();
    firstFourCluesTiles =  pickAndRemove(this.allClueTiles, 4);

    constructor() {
      console.log(this.allClueTiles);
      console.log(this.firstFourCluesTiles)
    }

    get gameHasStarted(): boolean {
      return this.gameState !== null && this.gameState !== GameState.AddPlayers;
    }

    get canReplaceOneTile(): boolean {
      return this.gameState === GameState.ReplaceFirstClueTile || this.gameState === GameState.ReplaceSecondClueTile;
    }

    onReplaceTile(tileToBeReplaced: Tile): void {

      this.firstFourCluesTiles = this.firstFourCluesTiles.filter(item => item !== tileToBeReplaced);

      setTimeout(() => {

        this.firstFourCluesTiles = [...this.firstFourCluesTiles, ...pickAndRemove(this.allClueTiles, 1)];
  
        if (this.gameState === GameState.ReplaceFirstClueTile) {
          this.setGameState.emit(GameState.SecondRound);
        } else if (this.gameState === GameState.ReplaceSecondClueTile) {
          this.setGameState.emit(GameState.ThirdRound);
        }
      }, 1000);
    }
}



function getCauseOfDeath(): Tile {
return {
    title: "Cause of death",
    clues: [
      "Suffocation",
      "Severe Injury",
      "Loss of Blood",
      "Illness / Disease",
      "Poisoning",
      "Accident"
    ]
  }
}

function getLocation(): Tile {
    const locations: Tile[] = [
        {
          title: "Location of crime",
          clues: [
            "Pub",
            "Bookstore",
            "Restaurant",
            "Hotel",
            "Hospital",
            "Building Site"
          ]
        },
        {
          title: "Location of crime",
          clues: [
            "Living Room",
            "Bedroom",
            "Storeroom",
            "Bathroom",
            "Kitchen",
            "Balcony"
          ]
        },
        {
          title: "Location of crime",
          clues: [
            "Playground",
            "Classroom",
            "Dormitory",
            "Cafeteria",
            "Elevator",
            "Toilet"
          ]
        },
        {
          title: "Location of crime",
          clues: [
            "Vacation Home",
            "Park",
            "Supermarket",
            "School",
            "Woods",
            "Bank"
          ]
        }
      ];

      return getRandomElement(locations)
}

function clueTiles(): Tile[] {
    const tiles: Tile[] = [
        {
          "title": "Sudden incident",
          "clues": ["Power Failure", "Fire", "Conflict", "Loss of Valuables", "Scream", "Nothing"]
        },
        {
          "title": "Victim's clothes",
          "clues": ["Neat", "Untidy", "Elegant", "Shabby", "Bizarre", "Naked"]
        },
        {
          "title": "Trace at the scene",
          "clues": ["Fingerprint", "Footprint", "Bruise", "Blood Stain", "Bodily Fluid", "Scar"]
        },
        {
          "title": "Murderer's personality",
          "clues": ["Arrogant", "Despicable", "Furious", "Greedy", "Forceful", "Perverted"]
        },
        {
          "title": "Victim's expression",
          "clues": ["Peaceful", "Struggling", "Frightened", "In Pain", "Blank", "Angry"]
        },
        {
          "title": "Hint on corpse",
          "clues": ["Head", "Chest", "Hand", "Leg", "Partial", "All-over"]
        },
        {
          "title": "In progress",
          "clues": ["Entertainment", "Relaxation", "Assembly", "Trading", "Visit", "Dining"]
        },
        {
          "title": "Social relationship",
          "clues": ["Relatives", "Friends", "Colleagues", "Employer/Employee", "Lovers", "Strangers"]
        },
        {
          "title": "Noticed by bystander",
          "clues": ["Sudden sound", "Prolonged sound", "Smell", "Visual", "Action", "Nothing"]
        },
        {
          "title": "General impression",
          "clues": ["Common", "Creative", "Fishy", "Cruel", "Horrible", "Suspenseful"]
        },
        {
          "title": "Day of crime",
          "clues": ["Weekday", "Weekend", "Spring", "Summer", "Autumn", "Winter"]
        },
        {
          "title": "Weather",
          "clues": ["Sunny", "Stormy", "Dry", "Humid", "Cold", "Hot"]
        },
        {
          "title": "Evidence left behind",
          "clues": ["Natural", "Artistic", "Written", "Synthetic", "Personal", "Unrelated"]
        },
        {
          "title": "Time of death",
          "clues": ["Dawn", "Morning", "Noon", "Afternoon", "Evening", "Night"]
        },
        {
          "title": "Duration of crime",
          "clues": ["Instantaneous", "Brief", "Gradual", "Prolonged", "Few Days", "Unclear"]
        },
        {
          "title": "State of the scene",
          "clues": ["Bits and Pieces", "Ashes", "Water Stain", "Cracked", "Disorderly", "Tidy"]
        },
        {
          "title": "Victim's occupation",
          "clues": ["Boss", "Professional", "Worker", "Student", "Unemployed", "Retired"]
        },
        {
          "title": "Victim's build",
          "clues": ["Large", "Thin", "Tall", "Short", "Disfigured", "Fit"]
        },
        {
          "title": "Victim's identity",
          "clues": ["Child", "Young Adult", "Middle-Aged", "Senior", "Male", "Female"]
        },
        {
          "title": "Corpse condition",
          "clues": ["Still Warm", "Stiff", "Decayed", "Incomplete", "Intact", "Twisted"]
        },
        {
          "title": "Motive of crime",
          "clues": ["Hatred", "Power", "Money", "Lovers", "Jealousy", "Justice"]
        }
      ];

    return shuffleArray(tiles);
}

