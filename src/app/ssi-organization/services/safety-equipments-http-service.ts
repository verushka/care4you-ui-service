/**
 * @author nicaela onofre
 */
import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../boostrap/base-http-service';
import {Position, PositionDTO} from '../api/domain/Position';
import {SafetyEquipment, SafetyEquipmentDTO} from '../api/domain/SafetyEquipment';


@Injectable()
export class SafetyEquipmentsHttpService extends BaseHttpService<SafetyEquipment, SafetyEquipmentDTO> {

  protected path(): string {
    return '/safetyEquipments';
  }
}
