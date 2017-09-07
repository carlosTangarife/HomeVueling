export interface IDiscountPassenger {
  data: string,
  discount: number
}

export interface IDiscountListPassengers {
  residentIslaCeuta: IDiscountPassenger,
  famNumGeneral: IDiscountPassenger,
  famNumEspecial: IDiscountPassenger,
  famNumGeneralResident: IDiscountPassenger,
  famNumEspecialResident: IDiscountPassenger
}

export interface IInfoList {
  title: string,
  body: string
}
