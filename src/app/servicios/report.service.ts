import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../util/AppConstant';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUrl:string = AppConstant.URL_BASE;

  constructor(private http: HttpClient) { }

  generateReport(initDate : Date, finalDate: Date){

    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
    };
    return this.http.post<any>(this.baseUrl + 'generateReport', {
      initDate: initDate,
      finalDate: finalDate
    }, httpOptions);
  }


}
