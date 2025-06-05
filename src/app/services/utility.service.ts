import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }


  parseErrorMessage(error: any): string {
    let result: string;
    if (error.message) {
      result = error.message;
    } else if (error.title) {
      result = error.title;
    } else {
      result = 'Unexpected Error.'
    }
    return result;
  }

}
