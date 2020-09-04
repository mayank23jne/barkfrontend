import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchdataService } from '../fetchdata.service';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
declare var $ : any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	
	myforms:any;
	fdata:any;
	form:any;
	formConfig;
	constructor(
		private http: HttpClient,
		private router: Router,
		private fetch: FetchdataService
	) { this.router.routeReuseStrategy.shouldReuseRoute = () => false; }
	
	ngOnInit(): void {
		this.formConfig = {
			options: {
				submitMessage: "",
				disableAlerts: true,
				noAlerts: true
			}
		};
		
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		headers = headers.append('Access-Control-Allow-Origin', '*');
		this.http.post(environment.url+'forms/getAllForms',{headers})
		.subscribe(res => {
			this.myforms=res;
			var formsData = [];
			
			var self = this; 
			
			$.each(this.myforms,function(i,value){
				
				
				if(value.id==25){
					formsData.push(value);
				}
				
				
			});
			this.myforms = formsData;
			this.fdata=this.myforms[0];
			this.fdata=JSON.parse(this.fdata.form_content);
			
		}
		); 
	}
	
	
	onSubmit(event) {
		console.log(event.data.email);
		console.log(event.data.password);
		
		
		let udata = {
			"email_address": event.data.email,
			"password": event.data.password,
			
		};

		
		this.fetch.login(udata).subscribe((res) => {
			if(res.status==true){
				
				var userdata=res.data;
				//$('#myModal').modal('hide');
				//	alert('Data Submitted Successfully');
				//	$('#myModal').modal('hide');
				localStorage.setItem('user_data',JSON.stringify(userdata));
				if(res.type=='Leads'){
					this.router.navigate(['/dashboard']);
					}else{
					this.router.navigate(['/sellers/home']);
				}
				
				//console.log(res);
				
				}else{
				
				alert("Invalid Email or Password. Please Try Again..");
			}
			
		})
	}
}
