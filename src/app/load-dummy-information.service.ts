import {Injectable, OnDestroy} from '@angular/core';
import {EmployeesHttpService} from './ssi-incident/services/employees-http-service';
import {Subscription} from 'rxjs';
import {Employee, EmployeeDTO} from './ssi-incident/api/domain/Employee';
import {unsubscribe} from './ssi-shared/utils/unsubscribe.function';
import {Incident, IncidentDTO} from './ssi-incident/api/domain/Incident';
import {IncidentTypeEnum} from './ssi-incident/api/enum/incident-type.enum';
import {IncidentSeverityEnum} from './ssi-incident/api/enum/incident-severity.enum';
import {IncidentsHttpService} from './ssi-incident/services/incidents-http-service';
import {SafetyEquipmentsHttpService} from './ssi-organization/services/safety-equipments-http-service';
import {AbilitiesHttpService} from './ssi-organization/services/abilities-http-service';
import {PositionDTO} from './ssi-organization/api/domain/Position';
import {PositionsHttpService} from './ssi-organization/services/positions-http-service';
import {Ability, AbilityDTO} from './ssi-organization/api/domain/Ability';
import {SafetyEquipment, SafetyEquipmentDTO} from './ssi-organization/api/domain/SafetyEquipment';

@Injectable({
  providedIn: 'root'
})
export class LoadDummyInformationService implements OnDestroy {

  private _employeesHttpServiceSubscription: Subscription;
  private _employeesSubscription: Subscription;
  private _incidentsSubscription: Subscription;
  private _positionsSubscription: Subscription;
  private _safetyEquipmentsSubscription: Subscription;
  private _abilitiesSubscription: Subscription;

  private _dummyEmployeesDTO: EmployeeDTO[];
  private _dummyIncidentsDTO: IncidentDTO[];
  private _dummyPositionsDTO: PositionDTO[];
  private _dummyAbilitiesDTO: AbilityDTO[];
  private _dummyEquipmentsDTO: SafetyEquipmentDTO[];

  private _dummyAbilities: Ability[];
  private _dummyEquipments: SafetyEquipment[];

  constructor(private _employeesHttpService: EmployeesHttpService,
              private _incidentHttpService: IncidentsHttpService,
              private _positionsHttpService: PositionsHttpService,
              private _safetyEquipmentsHttpService: SafetyEquipmentsHttpService,
              private _abilitiesHttpService: AbilitiesHttpService) {
    this._dummyAbilities = [];
    this._dummyEquipments = [];
    this._initialize();
  }

  public ngOnDestroy(): void {
    unsubscribe(this._employeesHttpServiceSubscription);
    unsubscribe(this._employeesSubscription);
    unsubscribe(this._incidentsSubscription);
    unsubscribe(this._safetyEquipmentsSubscription);
    unsubscribe(this._abilitiesSubscription);
  }

  private _initialize(): void {
    this._registerDummyEmployees();

    this._registerFunctionsManual();
  }

  private _registerDummyEmployees(): void {
    this._dummyEmployeesDTO = [
      new EmployeeDTO('123456', 'Juan', 'Pinto', 'Av. america', '1234567'),
      new EmployeeDTO('654321', 'Carlos', 'Terrazas', 'Quillacollo', '0987654'),
      new EmployeeDTO('098765', 'Miguel', 'Terceros', 'Vinto', '1029384'),
      new EmployeeDTO('567890', 'Claudia', 'Panozo', 'Av. Suecia', '6574839'),
      new EmployeeDTO('102938', 'Lucia', 'Teran', 'Villa Granado', '1825467'),
      new EmployeeDTO('564738', 'Pedro', 'Perez', 'Av. Blanco Galindo', '9015463'),
    ];

    this._employeesHttpServiceSubscription = this._employeesHttpService.doFindAll().subscribe(
      (employees: Employee[]) => {
        if (employees.length <= 1) {
          this._dummyEmployeesDTO.forEach(
            (employeeDTO: EmployeeDTO) => {
              this._employeesSubscription = this._employeesHttpService.doInsert(employeeDTO).subscribe(
                (employee: Employee) => {
                  this._registerDummyIncidents(employee);
                }
              );
            }
          );
        }
      }
    );
  }

  private _registerFunctionsManual(): void {
    this._abilitiesSubscription = this._abilitiesHttpService.doFindAll().subscribe(
      (abilities: Ability[]) => {
        if (abilities.length <= 1) {
          this._registerDummyAbilities().then(
            () => {
              this._registerDummyEquipments().then(
                () => {
                  this._registerDummyPositions();
                }
              );
            }
          );
        }
      }
    );
  }

  private _registerDummyAbilities(): Promise<void> {
    this._dummyAbilitiesDTO = [
      new AbilityDTO('Be careful', 'Be careful'),
      new AbilityDTO('Good communication', 'Good communication'),
      new AbilityDTO('Ability to follow instructions', 'Ability to follow instructions'),
      new AbilityDTO('Teamwork', 'Teamwork'),
      new AbilityDTO('Attentive', 'Attentive')
    ];

    return new Promise(
      (resolve, reject) => {
        for (let i = 0; i < this._dummyAbilitiesDTO.length; i++) {
          this._abilitiesSubscription = this._abilitiesHttpService.doInsert(this._dummyAbilitiesDTO[i]).subscribe(
            (dummyAbility: Ability) => {
              this._dummyAbilities.push(dummyAbility);
              if (i === this._dummyAbilitiesDTO.length - 1) {
                resolve();
              }
            }
          );
        }
      });
  }


  private _registerDummyEquipments(): Promise<void> {
    this._dummyEquipmentsDTO = [
      new SafetyEquipmentDTO('code 1', 'description 1', 'Helmet', 70),
      new SafetyEquipmentDTO('code 2', 'description 2', 'Gloves', 70),
      new SafetyEquipmentDTO('code 3', 'description 3', 'Vest', 70),
      new SafetyEquipmentDTO('code 4', 'description 4', 'Boots', 70),
      new SafetyEquipmentDTO('code 5', 'description 5', 'Glasses', 70)
    ];

    return new Promise(
      (resolve, reject) => {
        for (let i = 0; i < this._dummyEquipmentsDTO.length; i++) {
          this._safetyEquipmentsSubscription = this._safetyEquipmentsHttpService.doInsert(this._dummyEquipmentsDTO[i]).subscribe(
            (safetyEquipment: SafetyEquipment) => {
              this._dummyEquipments.push(safetyEquipment);

              if (i === this._dummyEquipmentsDTO.length - 1) {
                resolve();
              }
            });
        }
      });
  }

  private _registerDummyPositions(): void {
    this._dummyPositionsDTO = [
      new PositionDTO('code 1', 'Operator', 'description 1', [
        this._dummyAbilities[0].id,
        this._dummyAbilities[1].id
      ], [
        this._dummyEquipments[0].id,
        this._dummyEquipments[1].id
      ]),
      new PositionDTO('code 2', 'Driver', 'description 2', [
        this._dummyAbilities[0].id
      ], [
        this._dummyEquipments[0].id
      ]),
      new PositionDTO('code 3', 'Builder', 'description 3', [
        this._dummyAbilities[3].id
      ], [
        this._dummyEquipments[3].id
      ]),
      new PositionDTO('code 4', 'Machine Operator', 'description 4', [
        this._dummyAbilities[2].id,
        this._dummyAbilities[3].id,
        this._dummyAbilities[4].id
      ], [
        this._dummyEquipments[3].id
      ]),
      new PositionDTO('code 5', 'Assistant', 'description 5', [
        this._dummyAbilities[0].id,
        this._dummyAbilities[1].id,
        this._dummyAbilities[2].id
      ], [])
    ];

    this._dummyPositionsDTO.forEach(
      (positionDTO: PositionDTO) => {
        this._positionsSubscription = this._positionsHttpService.doInsert(positionDTO).subscribe(
          () => {

          }
        );
      }
    );
  }

  private _registerDummyIncidents(employee: Employee): void {
    this._dummyIncidentsDTO = [
      new IncidentDTO(
        'Injury',
        'low Injury in neck',
        new Date(),
        IncidentTypeEnum.SLIGHT_INJURY,
        IncidentSeverityEnum.LOW,
        employee.id),
      new IncidentDTO(
        'Fracture',
        'Arm fracture',
        new Date('2015-01-01'),
        IncidentTypeEnum.FRACTURE,
        IncidentSeverityEnum.HIGH,
        employee.id)
    ];

    this._dummyIncidentsDTO.forEach(
      (dummyIncidentDTO: IncidentDTO) => {
        this._incidentsSubscription = this._incidentHttpService.doInsert(dummyIncidentDTO).subscribe(
          (incident: Incident) => {
          }
        );
      }
    );
  }
}
