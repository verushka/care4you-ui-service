/**
 * @author nicaela onofre
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {unsubscribe} from '../../../ssi-shared/utils/unsubscribe.function';
import {Subscription} from 'rxjs';
import {PositionsHttpService} from '../../services/positions-http-service';
import {Position} from '../../api/domain/Position';

@Component({
  selector: 'organization-functions',
  templateUrl: './organization-functions.component.html',
  styleUrls: ['./organization-functions.component.scss']
})
export class OrganizationFunctionsComponent implements OnInit, OnDestroy {

  public infoPositions: Position[];
  public abilities: any;
  public equipments: any;
  public selectedItem: any;

  private _positionsSubscription: Subscription;

  constructor(private _positionsHttpService: PositionsHttpService) {
    this.infoPositions = [];
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    unsubscribe(this._positionsSubscription);
  }

  private _initialize(): void {
    this._positionsSubscription = this._positionsHttpService.doFindAll().subscribe(
      (positions: Position[]) => {
        this.infoPositions = positions;
      }
    );
  }

  public onChange(event): void {
    console.log('this.abilities');
    //console.log(event);
    console.log(this.selectedItem);
    this.infoPositions.forEach(function (position) {
      if (position.id === event) {
        console.log(position);
        this.abilities = position.abilities;
        this.equipments = position.equipments;
        console.log(this.abilities);
      }
    });
  }

  public getAbilities(arrayId): any {

  }

  public getEquipments(arrayId): any {

  }

}
