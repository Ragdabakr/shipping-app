import { Injectable } from '@angular/core';
import { LookupService } from '../lookup.service/lookup.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  cities:[]
 constructor(private lookupService:LookupService){}

getCities(){
   let data: [];
   this.lookupService.getCitiesList().subscribe(
    res =>{ data = res['data'];
       console.log("data :",data) ;
        return data;
      },
      err =>{
       console.log(err);
       return data;
    }
  )
  //  return data;
}

  ARABIC_REGEX = /[\u0600-\u06FF]/;

  findInArray (arraytosearch : any, key : any,valuetosearch : any) {
    for (let i = 0; i < arraytosearch.length; i++) {
      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }

  isDateBeforeToday(date : any){
    var nowTime  = new Date().getTime();
    var dateTime = new Date(date).getTime();
    var diff = dateTime - nowTime;
    if( diff <= 0 ){
      return true;
    }
    return false;
  }

  hasArabicCharacter(text : string){
    return this.ARABIC_REGEX.test(text)
  }

  addDaysToDate(date : any , days : any){
    var newDate = new Date(date.getTime() + days*(24*60*60*1000));
    return newDate;
  }


  dateFormat = () => {
    return new Date(Date.now()).toLocaleString();
  }

  isNewPasswordEqualConfirm(newPassword : string , confirmPassword : string){
    if(newPassword.toLowerCase() != confirmPassword.toLowerCase())
      return false;
    return true;
  }

  convertJsonToArray(json , key ){
    var arr=[];
    json.forEach(element => {
      if(!key){
        var val = element;
        arr.push(val);
      }else{
        var val = element[key];
        arr.push(parseInt(val));
      }

    });
    return arr;
  }



}
