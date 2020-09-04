import { Component, OnInit } from '@angular/core';
	import { HttpClient } from '@angular/common/http';
	import { HttpHeaders } from '@angular/common/http';
	import { Router } from '@angular/router';
	import { FetchdataService } from '../fetchdata.service';
	import { environment } from '../../environments/environment';
	import { NgForm } from '@angular/forms';
	declare var $ : any;
	
	@Component({
		selector: 'app-sellers',
		templateUrl: './sellers.component.html',
		styleUrls: ['./sellers.component.scss']
	})
	export class SellersComponent implements OnInit {
		
		allservices:any;
		model: any = {};
		test:any;
		formData;
		formConfig;
		searchterm:any;
		
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
		}
		
		
		setval(val){
			
			
			this.searchterm=val;
			this.services='';
			this.showss=false;
			if(this.searchterm=='Web Designing'){
				
				this.formlink='';
			}
			else if(this.searchterm=='Debt Recovery & Collection'){
				
				this.formlink='https://qvffwzgzipuxobq.form.io/professionals'; 
				}else{
				
				this.formlink='';
			}
			
		}
		
		search(){
			
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
				"total_credits_purchased":"0",
				"credits_remaining":"0",
				"company_name":event.data.companyName,
				"name": event.data.name,
				"phone": event.data.phoneNumber,
				"email_address": event.data.email,
				"brief_description": '',
				"create_time": new Date(),
				"password":pass,
				
			};
			
			
			this.fetch.addDataProfessionals(udata).subscribe((res) => {
				$('#myModal').modal('hide');
				alert('Data Submitted Successfully');
				$('#myModal').modal('hide');
				localStorage.setItem('user_data',JSON.stringify(udata));
				this.router.navigate(['/sellers/home']);
				//console.log(res);
			}) 
		}
		
		
		
	}
	
		