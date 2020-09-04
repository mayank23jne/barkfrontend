import { Injectable } from '@angular/core';
	import { HttpClient } from '@angular/common/http';
	import { HttpHeaders } from '@angular/common/http';
	import { Observable } from 'rxjs';
	import { environment } from '../environments/environment';
	
	@Injectable({
		providedIn: 'root'
	})
	export class FetchdataService {
		
		constructor(private http: HttpClient) { }
		
		
		
		addData(data: any): Observable<any> {
			
			return this.http.post(environment.url + 'leads/addData', data,{
				headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
			})
		}
		addDataProfessionals(data: any): Observable<any> {
			
			return this.http.post(environment.url + 'professionals/addData', data,{
				headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
			})
		}
		
		addTrsData(data: any): Observable<any> {
			
			return this.http.post(environment.url + 'transactions/addData', data,{
				headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
			})
		}
		login(data: any): Observable<any> {
			
			return this.http.post(environment.url + 'api/login', data,{
				headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
			})
		}
		
		addDataForms(data: any): Observable<any> {
			
			return this.http.post(environment.url + 'forms/addData', data ,{
				headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
			})
		} 
		updateDataForms(data: any): Observable<any> {
			
			return this.http.post(environment.url + 'forms/editData', data ,{
				headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
			})
		}
		
		updateDataProfessional(data: any): Observable<any> {
			
			return this.http.post(environment.url + 'Professionals/editData', data ,{
				headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
			})
		}
		
		
		deleteDataForms(id: number): Observable<any> {
			
			return this.http.delete(environment.url + 'forms/deleteForm/'+id,{
				headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}
			})
		}
		
		
		
		
		
	}
	
		