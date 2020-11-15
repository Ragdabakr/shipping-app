import { Injectable } from '@angular/core';
import {Api} from '../api/api';


@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(public api: Api) {}

  getCitiesList(params?: any) {
    return this.api.get('cities/list');
  }
}
