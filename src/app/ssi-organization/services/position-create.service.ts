import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class PositionCreateService {

  private _positionSubject: BehaviorSubject<Position[]>;

  constructor() {
    this._positionSubject = new BehaviorSubject<Position[]>(undefined);
  }

  get subject(): Subject<Position[]> {
    return this._positionSubject;
  }

}
