export interface ICheckin {
    checkinTime: Date;
    type: string;
    value: number;
}

export interface IEmployee {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    password: string;
    isActive: boolean;
    isVerified: boolean;
    isFirstTime: boolean;
    checkins: ICheckin;
}
