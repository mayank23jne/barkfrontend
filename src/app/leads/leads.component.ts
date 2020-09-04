import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchdataService } from '../fetchdata.service';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
declare var $ : any;
@Component({
	selector: 'app-leads',
	templateUrl: './leads.component.html',
	styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
	
	leads:any;
	ans:any;
	showss = false;
	creditremain:any;
	credittotal:any;
	totalleads:any;
	singlelead:any;
	myphone:any;
	myemail:any;
	myforms:any;
	fdata:any;
	form:any;
	pid:any;
	formConfig;
	
	constructor(
		private http: HttpClient,
		private router: Router,
		private fetch: FetchdataService
	) { this.router.routeReuseStrategy.shouldReuseRoute = () => false; }
	
	
	ngOnInit() {
		
		if(localStorage.getItem("user_data")!=''){
			let udata=JSON.parse(localStorage.getItem("user_data"));
		
			if(udata){
				this.pid=udata.id;
			}
		}
		
		this.formConfig = {
			options: {
				submitMessage: "",
				disableAlerts: true,
				noAlerts: true
			}
		};
	  	this.http.post(environment.url+'leads/getAllLeads','')
		.subscribe(res => {
			this.leads=res;
			var leadsData = [];
			var self = this; 
			$.each(this.leads,function(i,value){
				leadsData.push(value);  
			});
			this.leads = leadsData;
			this.totalleads=this.leads.length;
			this.singlelead=this.leads[0];
			this.myphone =this.singlelead.phone;
			this.myemail =this.singlelead.email_address;
			
			this.myemail = this.myemail.substring(this.myemail.length - 4,4);
			this.myemail = "****"+this.myemail;
			
			this.myphone = this.myphone.substring(this.myphone.length - 4,4);
			this.myphone =  "****"+this.myphone;
			
			
			const myObjStr=this.singlelead.answers_json;
            this.ans=JSON.parse(myObjStr);
			
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
				if(value.id==27){
					formsData.push(value);
				} 
			});
			this.myforms = formsData;
			this.fdata=this.myforms[0];
			this.fdata=JSON.parse(this.fdata.form_content);
		}
		); 
		
		this.form = {display: 'form', components: []};
		
		
	  	this.http.post(environment.url+'professionals/getProfessionalById/'+this.pid,{headers})
		.subscribe(res => {
			this.creditremain=res['credits_remaining'];
			this.credittotal=res['total_credits_purchased'];
		}
		); 
		
		
	}
	
	showPurchase(){
		$('#myModal').modal('hide');
		$('#myModalp').modal('show');
	}
	setval(val){
		
		var searchData =[];
		
		$.each(this.leads,function(i,value){
            if(val !== ''){
				
				if(value.id == val){
					searchData.push(value);
				}
				
			}
			
		});
		this.singlelead = searchData[0];
		this.myphone =this.singlelead.phone;
		this.myemail =this.singlelead.email_address;
		
		this.myemail = this.myemail.substring(this.myemail.length - 4,4);
		this.myemail = "****"+this.myemail;
		
		
		this.myphone = this.myphone.substring(this.myphone.length - 4,4);
		this.myphone =  "****"+this.myphone;
		const myObjStr=this.singlelead.answers_json;
		this.ans=JSON.parse(myObjStr);
		
		

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
		    "professional_id": this.pid,
		    "payment_amount":60,
		    "credits_purchased":50,
		    "create_time": new Date(),
		    "card_type":"Card",
		    "expiration":event.data.expiryDate,
			"last_four_digits": event.data.cardNumber,
			"token": pass,
			
		};

		
		this.fetch.addTrsData(udata).subscribe((res) => {
			
			$('#myModalp').modal('hide');
			alert('50 Credit Added To Your Account Successfully');
			
		});
		
		let pudata = {
		    "id": this.pid,
		    "total_credits_purchased":+this.credittotal+ +50,
		    "credits_remaining":+this.creditremain+ +50,
			
		};
		this.fetch.updateDataProfessional(pudata).subscribe((res) => {
			
		}); 
		
		
		
	}
	
	
}
