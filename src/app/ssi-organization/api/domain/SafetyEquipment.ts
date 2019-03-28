export class SafetyEquipment {
  id: string;
  code: string;
  description: string;
  name: string;
  stock: number;
}

export class SafetyEquipmentDTO {


  constructor(code: string, description: string, name: string, stock: number) {
    this.code = code;
    this.description = description;
    this.name = name;
    this.stock = stock;
  }

  code: string;
  description: string;
  name: string;
  stock: number;
}
