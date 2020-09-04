import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchdataService } from '../fetchdata.service';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
declare var $ : any;

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	@ViewChild('json') jsonElement?: ElementRef;
	public form: Object = {
		components: []
	};
	formName:any;
	formData:any;
	formDisplay:any;
	myforms:any;
	myform:any;
	fdata:any;
	constructor(
		private http: HttpClient,
		private router: Router,
		private fetch: FetchdataService
	) { this.router.routeReuseStrategy.shouldReuseRoute = () => false; }
	
	ngOnInit(): void {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		headers = headers.append('Access-Control-Allow-Origin', '*');
		this.http.post(environment.url+'forms/getAllForms',{headers})
		.subscribe(res => {
			this.myforms=res;
			var formsData = [];
			
			var self = this; 
			
			$.each(this.myforms,function(i,value){
				
				formsData.push(value);
				
				
			});
			this.myforms = formsData;
			this.fdata=this.myforms[0];
			this.fdata=JSON.parse(this.fdata.form_content);
			
		}
		); 
		
		this.form = {display: 'form', components: []};
		
	}
	
	setdisplay(val){
		if(val=='form'){
			this.form = {display: 'form', components: []};
			}else{
			this.form = {display: 'wizard', components: []};
		}
		
	}
	onChange(event) {
		this.formData=JSON.stringify(event.form, null, 4);
		
	}
	
    saveForm() {
		
		
		console.log(this.formName);
		console.log(this.formData);
		
		let udata = {
		    "form_name":this.formName,
			"form_content":this.formData,
			
			
		};
		console.log(udata);
		
		this.fetch.addDataForms(udata).subscribe((res) => {
			this.router.navigate(['/admin/forms']);
			// $('#myModal').modal('show');
		}
		); 
	}
}




