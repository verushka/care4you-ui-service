/**
 * @author nicaela onofre
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {unsubscribe} from '../../../ssi-shared/utils/unsubscribe.function';
import {Subscription} from 'rxjs';
import {PositionsHttpService} from '../../services/positions-http-service';
import {Position} from '../../api/domain/Position';
import {Ability} from '../../api/domain/Ability';
import {SafetyEquipment} from '../../api/domain/SafetyEquipment';

@Component({
  selector: 'organization-functions',
  templateUrl: './organization-functions.component.html',
  styleUrls: ['./organization-functions.component.scss']
})
export class OrganizationFunctionsComponent implements OnInit, OnDestroy {

  public positions: Position[];
  public abilities: Ability[];
  public equipments: SafetyEquipment[];
  public positionSelected: Position;

  private _positionsSubscription: Subscription;

  constructor(private _positionsHttpService: PositionsHttpService) {
    this.positions = [];
    this.abilities = [];
    this.equipments = [];
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
        this.positions = positions;
        this._setDefaultSelected();
      }
    );
  }

  public onChange(position: Position): void {
    if (position.abilities) {
      this.abilities = position.abilities;
    }

    if (position.equipments) {
      this.equipments = position.equipments;
    }
  }

  private _setDefaultSelected(): void {
    if (this.positions.length > 0) {
      this.positionSelected = this.positions[0];
      this.onChange(this.positionSelected);
    }
  }
}
