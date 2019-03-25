import { BaseResourceModel } from '../../../shared/model/base-resource.model';

export class Cliente extends BaseResourceModel {
    constructor(
                public id? : number,
                public nome? : string
    ) {
        super();
    }


    static fromJson(jsonData: any): Cliente {
        return Object.assign(new Cliente(), jsonData);
      }
}