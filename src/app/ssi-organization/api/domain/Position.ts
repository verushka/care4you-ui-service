import {Ability} from './Ability';
import {SafetyEquipment} from './SafetyEquipment';

export class Position {
  id: string;
  code: string;
  name: string;
  description: string;
  abilities: Ability[];
  equipments: SafetyEquipment[];

}

export class PositionDTO {

  constructor(code: string, name: string, description: string, abilitiesId: string[], equipmentsId: string[]) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.abilitiesId = abilitiesId;
    this.equipmentsId = equipmentsId;
  }

  code: string;
  name: string;
  description: string;
  abilitiesId: string[];
  equipmentsId: string[];
}
