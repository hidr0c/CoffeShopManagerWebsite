export interface IMenuItem {
  _id?: string;
  name: string;
  type: string;
  price: number;
  isAvailable: boolean;
}

export interface IMenuResponse {
  result: string;
  message: string;
}

export interface MenuListResponse extends IMenuResponse {
  items: IMenuItem[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
}

export interface MenuGetResponse extends IMenuResponse {
  item: IMenuItem;
}

export interface DeleteMenuResponse {
  result: string;
  item?: object;
  message?: string;
}

export interface MenuAllResponse extends IMenuResponse {
  items: IMenuItem[];
}
