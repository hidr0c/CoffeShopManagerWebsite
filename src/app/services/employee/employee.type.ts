export interface ICheckin {
  checkinTime: Date;
  type: string;
  value: number;
}

export interface IEmployee {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  isFirstTime: boolean;
  checkins: ICheckin[];
  birthDate: string;
  sex: string;
  address: string;
}
