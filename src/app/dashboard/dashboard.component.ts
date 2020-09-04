import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FetchdataService } from '../fetchdata.service';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
declare var $ : any;
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	
	public uname:any;
	leads:any;
	leadsData:any;
	
	isLoggedIn=false;
	
	constructor(
		private http: HttpClient,
		private router: Router,
		private fetch: FetchdataService
	) { this.router.routeReuseStrategy.shouldReuseRoute = () => false; }
	
	ngOnInit() {
		if(localStorage.getItem("user_data")!=''){
			let udata=JSON.parse(localStorage.getItem("user_data"));
			if(udata){
				this.uname=udata.name;
				this.isLoggedIn=true; 
			}
		}
		
		if(this.isLoggedIn!=true){
			this.router.navigate(['/home']);
		}
		
		
		this.http.post(environment.url+'professionals/getAllProfessionals','')
		.subscribe(res => {
			this.leads=res;
			var leadsData = [];
			var self = this; 
			$.each(this.leads,function(i,value){
				leadsData.push(value);  
			});
			this.leads = leadsData;
			
		}
		);
		
	}
	
	logout(){
		localStorage.removeItem('user_data');
		// localStorage.clear();
		// sessionStorage.clear(); 
		this.router.navigate(['/home']);
	}
	
}
