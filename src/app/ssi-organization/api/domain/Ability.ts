export class Ability {
  id: string;
  name: string;
  description: string;
}

export class AbilityDTO {

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  name: string;
  description: string;
}
