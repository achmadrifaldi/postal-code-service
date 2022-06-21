import { BaseResponseInterface } from './base-response.interface';

export class BaseResponse {
  public message: string;
  public data: any;

  constructor(response: BaseResponseInterface) {
    this.message = response.message;
    this.data = response.data;
  }
}
