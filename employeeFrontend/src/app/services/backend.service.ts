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
  adminLogin(obj:any){
    return this.http.post(`${environment.base_url}/adminLogin`, obj);
  }
  checkInOut(value: any, empcode: any, obj: any) {
    return this.http.post(`${environment.base_url}/logData/${value}/${empcode}`, obj);
  }
  DOB(CompId: any) {
    return this.http.get(`${environment.base_url}/DOB/${CompId}`);
  }
  DOJ(CompId: any) {
    return this.http.get(`${environment.base_url}/DOJ/${CompId}`);
  }
  register(obj: any) {
    return this.http.post(`${environment.base_url}/register`, obj);
  }
  company(obj: any) {
    return this.http.post(`${environment.base_url}/Company`, obj);
  }
  getEmployeesBasedonId(CompId: any) {
    return this.http.get(`${environment.base_url}/getempByRID/${CompId}`);
  }
  taskCreation(CompId: any, empCode: any, obj: any) {
    return this.http.post(`${environment.base_url}/task/${CompId}/${empCode}`, obj)
  }
  gettask(empCode: any) {
    return this.http.get(`${environment.base_url}/gettask/${empCode}`);

  }
  updateStatus(taskId: any,payload:any) {
    return this.http.put(`${environment.base_url}/updatetask/${taskId}`, payload);
  }
  getemployees(empCode: any) {
    return this.http.get(`${environment.base_url}/getemp/${empCode}`);
  }
  getempImage(empCode: any) {
    return this.http.get(`${environment.base_url}/getImage/${empCode}`);
  }
  image(formData: any, empCode: any) {
    return this.http.put(`${environment.base_url}/imageUpload/${empCode}`, formData);
  }
  getCompany(CompId: any) {
    console.log(CompId)
    return this.http.get(`${environment.base_url}/getCompany/${CompId}`);
  }
  feed(empCode: any, obj: any) {
    return this.http.post(`${environment.base_url}/postFeed/${empCode}`, obj);
  }
  getfeed(CompId: any) {
    return this.http.get(`${environment.base_url}/getFeed/${CompId}`);
  }
  // all info about system info, present location ...etc 
  getLocation() {
    return this.http.get('https://ipapi.co/json/');
  }

  AlreadyChekIn(empCode: any) {
    return this.http.get(`${environment.base_url}/checkIn/${empCode}`);
  }
  getattedance(empCode: any, date: any) {

    return this.http.get(`${environment.base_url}/getattendance/${empCode}/${date}`);
  }

  Earnings(CompId: any, obj: any) {
    return this.http.post(`${environment.base_url}/earnings/${CompId}`, obj);

  }
  getEarn(empCode: any) {
    return this.http.get(`${environment.base_url}/getEarn/${empCode}`);
  }
  employeePay(obj: any) {
    return this.http.post(`${environment.base_url}/employeePay`, obj);
  }
  allLeaves(empCode: any) {
    return this.http.get(`${environment.base_url}/getLeaves/${empCode}`);
  }
  applyLeave(empCode: any, obj: any) {
    return this.http.post(`${environment.base_url}/appliedleaves/${empCode}`, obj);

  }
  getappliedLeavesFromEmployees(empCode: any,) {
    return this.http.get(`${environment.base_url}/sendleavesForApproval/${empCode}`);
  }
  UpdateLeaveStatus(leaveid: any, obj: any) {
    return this.http.put(`${environment.base_url}/UpdateLeaveStatus/${leaveid}`, obj);
  }
  getallmyleaves(empCode: any) {
    return this.http.get(`${environment.base_url}/getmyleaves/${empCode}`);
  }
  getAllEmployees(companyId:any) {

    return this.http.get(`${environment.base_url}/getAllEmp/${companyId}`);
  }
  deleteEmployees(empCode: any) {
    return this.http.delete(`${environment.base_url}/deleteEmp/${empCode}`)
  }
  getEmpWithImage() {
    return this.http.get(`${environment.base_url}/getEmployeeDatawithImage`)
  }
  getEmpInfo(empCode: any) {
    return this.http.get(`${environment.base_url}/empInfo/${empCode}`);
  }
  otpGenrator(obj:any){
    return this.http.post(`${environment.base_url}/sendOtp`,obj)
  }
  forgotPasscode(empCode:any,Value:any,obj: any) {
    console.log(empCode,Value)
    return this.http.put(`${environment.base_url}/updatePassword/${empCode}/${Value}`, obj);
  }
  getallholidays(year:any,companyId:any){
    return this.http.get(`${environment.base_url}/allHolidays/${year}/${companyId}`);
  }
  getAssignedTasks(empCode:any,companyId:any){
    return this.http.get(`${environment.base_url}/getalltaskAssign/${empCode}/${companyId}`)
  }

  getOrganizationTree(companyId:any){
    return this.http.get(`${environment.base_url}/orgList/${companyId}`)
  }

  getTotalemployessAttedanceForToday(companyId:any){
    return this.http.get(`${environment.base_url}/getallemployeesAttendance/${companyId}`)
  }

  getAllmasterHolidays(){
    return this.http.get(`${environment.base_url}/getallMasterHolidays`)
  }

  addHolidays(obj:any,CompId:any){
    return this.http.post(`${environment.base_url}/holidays/${CompId}`,obj)
  }

  deleteholiday(CompId:any,id:any){
  
    return this.http.delete(`${environment.base_url}/deleteHoliday/${CompId}/${id}`)
  }
}
