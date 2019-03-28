/**
 * @author nicaela onofre
 */
import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../boostrap/base-http-service';
import {Position, PositionDTO} from '../api/domain/Position';
import {Ability, AbilityDTO} from '../api/domain/Ability';


@Injectable()
export class AbilitiesHttpService extends BaseHttpService<Ability, AbilityDTO> {

  protected path(): string {
    return '/abilities';
  }
}
