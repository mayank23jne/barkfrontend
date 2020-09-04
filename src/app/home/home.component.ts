import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchdataService } from '../fetchdata.service';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
declare var $ : any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	allservices:any;
	model: any = {};
	test:any;
	formData;
	formConfig;
	searchterm:any;
	myforms:any;
	fdata:any;
	form:any;
	
	locationOverride = false;
	showss = false;
	services:any;
	formlink='';
	
	constructor(
		private http: HttpClient,
		private router: Router,
		private fetch: FetchdataService
	) { this.router.routeReuseStrategy.shouldReuseRoute = () => false; }
	
	
	ngOnInit() {
		
		
		this.formConfig = {
			options: {
				language: 'en',
				i18n: {
					en: {
						cancel: 'Abort',
						previous: 'Back',
						next: 'Continue',
						submit: 'Get Quotes'
					}
				},
				alerts: {
					submitMessage: 'Thank you for submitting the form.'
				},
				errors: {
					message: 'Error while submitting the form. Please try again.'
				}
			}
		};
		
		var device:any;
		document.addEventListener("deviceready", function() { alert(device.platform); }, false); 
		this.http.get(environment.url+'api/getData')
		.subscribe(res => {
			this.allservices=res;
			
		}
		); 
		
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		headers = headers.append('Access-Control-Allow-Origin', '*');
		this.http.post(environment.url+'forms/getAllForms',{headers})
		.subscribe(res => {
			this.myforms=res;
			var formsData = [];
			
			var self = this; 
			
			$.each(this.myforms,function(i,value){
				
				
				if(value.id==23){
					formsData.push(value);
				}
				
				
			});
			this.myforms = formsData;
			this.fdata=this.myforms[0];
			this.fdata=JSON.parse(this.fdata.form_content);
			
		}
		); 
		
		this.form = {display: 'form', components: []};
	}
	
	
	setval(val){
		
		
		this.searchterm=val;
		this.services='';
		this.showss=false;
		if(this.searchterm=='Web Designing'){
			
			this.formlink='https://qvffwzgzipuxobq.form.io/q1'; 
		}
		else if(this.searchterm=='Debt Recovery & Collection'){
			
			this.formlink='https://qvffwzgzipuxobq.form.io/q2'; 
			}else{
			
			this.formlink='';
		}
		
	}
	
	search(){
		console.log(this.searchterm);
		var searchData = [];
		this.formlink='';
		var self = this; 
		
		$.each(this.allservices,function(i,value){
            if(self.searchterm !== ''){
				
				if(value.name.toUpperCase().match(self.searchterm.toUpperCase())){
					searchData.push(value);
				}
				
			}
			else{
				//searchData.push(value);
			} 
			
		});
		this.services = searchData;
		this.showss=true;

	}
	
	onSubmit(event) {
		console.log(event.data.email);
		
		
		var pass = ''; 
		var i = 1; 
		var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +  
		'abcdefghijklmnopqrstuvwxyz0123456789@#$'; 
		
		for (i = 1; i <= 8; i++) { 
			var char = Math.floor(Math.random() 
			* str.length + 1);  
			
			pass += str.charAt(char) 
		} 
		
		
		let udata = {
		    "lead_cost_credits":"0",
		    "create_time":"0",
		    "num_professionals_emailed":"0",
		    "professional_hired_id":"0",
		    "form_id":"0",
		    "answers_json":JSON.stringify(event.data),
			"email_address": event.data.email,
			"name": event.data.name,
			"phone": event.data.phoneNumber,
			"password": pass,
			
		};
		console.log(udata);
		
		this.fetch.addData(udata).subscribe((res) => {
			$('#myModal').modal('hide');
			alert('Data Submitted Successfully');
			$('#myModal').modal('hide');
			localStorage.setItem('user_data',JSON.stringify(udata));
			this.router.navigate(['/dashboard']);
			//console.log(res);
		}) 
	}
	
	
	
}
