import { ProvinceInterface } from './province.interface';

export interface CityResponseInterface {
  id: number;
  name: string;
  province: ProvinceInterface;
}
