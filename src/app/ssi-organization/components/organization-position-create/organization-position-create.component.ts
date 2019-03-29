/**
 * @author nicaela onofre
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {unsubscribe} from '../../../ssi-shared/utils/unsubscribe.function';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PositionsHttpService} from '../../services/positions-http-service';
import {Position, PositionDTO} from '../../api/domain/Position';
import {AbilitiesHttpService} from '../../services/abilities-http-service';
import {Ability} from '../../api/domain/Ability';
import {SafetyEquipment} from '../../api/domain/SafetyEquipment';
import {SafetyEquipmentsHttpService} from '../../services/safety-equipments-http-service';

@Component({
  selector: 'organization-position-create',
  templateUrl: './organization-position-create.component.html',
  styleUrls: ['./organization-position-create.component.scss']
})
export class OrganizationPositionCreateComponent implements OnInit, OnDestroy {

  public positionFormGroup: FormGroup;
  public position: Position;
  public abilities: Ability [];
  public equipments: SafetyEquipment [];


  public submitted: boolean;

  private _positionsSubscription: Subscription;
  private _abilitiesSubscription: Subscription;
  private _equipmentsSubscription: Subscription;

  constructor(private _positionsHttpService: PositionsHttpService,
              private _abilitiesHttpService: AbilitiesHttpService,
              private _equipmentsHttpService: SafetyEquipmentsHttpService,
              private _formBuilder: FormBuilder,
              private _router: Router) {
    this._initForm();
    this.abilities = [];
    this.equipments = [];
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    unsubscribe(this._positionsSubscription);
    unsubscribe(this._abilitiesSubscription);
    unsubscribe(this._equipmentsSubscription);
  }

  public onSubmit(): void {
    this.submitted = true;

    if (!this.positionFormGroup.valid) {
      return;
    }

    const positionDTO: PositionDTO = this.positionFormGroup.value;
    console.log(positionDTO);
    this._positionsSubscription = this._positionsHttpService.doInsert(positionDTO).subscribe(
      (position: Position) => {
        this.position = position;
        this._router.navigate(['/organization/position']);
      }
    );
  }

  private _initForm(): void {
    this.positionFormGroup = this._formBuilder.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null],
      abilitiesId: [[]],
      equipmentsId: [[]]
    });
  }


  private _initialize(): void {
    this._abilitiesSubscription = this._abilitiesHttpService.doFindAll().subscribe(
      (abilities: Ability []) => {
        this.abilities = abilities;
      }
    );

    this._equipmentsSubscription = this._equipmentsHttpService.doFindAll().subscribe(
      (equipments: SafetyEquipment []) => {
        this.equipments = equipments;
      }
    );
  }


}
