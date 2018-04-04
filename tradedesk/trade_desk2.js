// Program a building with lifts

class Lift {
  private _available: bool
  private _currentFloor: number;
  private _goToFloor: number;
  private _isBusy: bool;
  private _engine: LiftEngine;
  private _path: number[];

  constructor() {
      this._engine.onFloorChanged.subscribe(this.onFloorChanged);
      this._engine.onStop.subscribe(this.onStop);
  }

  get available() {
      return this._available;
  }
 
  get currentFloor() {
      return this._currentFloor;
  }

  onFloorChanged(floor) {
      this.currentFloor = floor;
  }
  
  onStop() {
    this._path.shift();
    const nextFloor = this._path[0];
    this.goToInternal(nextFloor);
  }

  goTo(floor) {
    this._path.push(floor);
    this.goToInternal(floor);
  }

  goToInternal(floor: number) {
      this._engine.closeDoors();
      this._isBusy = true;
      this._engine.goTo(floor);
      this._isBusy = false;
      this._engine.openDoors();
  }

  openDoors() {
      this._engine.openDoors();
  }

  closeDoors() {
      this._engine.closeDoors();
  }
  
  setNextStop(floor) {
      this._path.push(floor);
  }
}

class Building {
 private lifts: Lift[];
 private floors: Floor[];
 
 constructor(lifts: Lift[], floors: Floor[]) {
     this.lifts = lifts;
     this.floors = floors;
     for (let i = 0; i < floors.length; i++) {
         const floor = floor[i];
         floor.onLiftButtonPressed.subcribe(() => this.onLiftButtonPressed);
     }
 }

 private onLiftButtonPressed(floor) {
     this.call(floor);
 }

 canLiftGoTo(lift, floor) {
     if (!lift.isBusy) {
         return true;
     }
     if (lift.isBusy && lift.currentFloor < floor) {
         return true;
     }
 }

 private call(floor) {
     for (let i = 0; i < this.lifts.length; i++) {
         if (this.canLiftGoTo(this.lifts[i])) {
             if (!lift.isBusy) {
               lift.goTo(floor);
               return;
             } else {
               lift.setNextStop(floor);
               return;
             }
         }
     }
 }
}


const building = new Building();
