import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }
  login(obj: any) {
    return this.http.post(`${environment.base_url}/login`, obj);
  }
  checkInOut(value:any,empcode:any){
    return this.http.post(`${environment.base_url}/logData/${value}/${empcode}`,{});
  }
  DOB(CompId:any){
    return this.http.get(`${environment.base_url}/DOB/${CompId}`);
  }
  DOJ(CompId:any){
    return this.http.get(`${environment.base_url}/DOJ/${CompId}`);
  }
  register(obj:any){
    return this.http.post(`${environment.base_url}/register`, obj);
  }
  company(obj:any){
    return this.http.post(`${environment.base_url}/Company`, obj);
  }

}
