import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchdataService } from '../fetchdata.service';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
declare var $ : any;

@Component({
	selector: 'app-edit-form',
	templateUrl: './edit-form.component.html',
	styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
	
	@ViewChild('json') jsonElement?: ElementRef;
	public form: Object = {
		components: []
	};
	formName='';
	formData:any;
	formDisplay:any;
	myforms:any;
	myform:any;
	fdata:any;
	fid:any;
	
	constructor(
		private http: HttpClient,
		private route: ActivatedRoute,
		private router: Router,
		private fetch: FetchdataService
	) { this.router.routeReuseStrategy.shouldReuseRoute = () => false; }
	
	ngOnInit(): void {
		this.fid = this.route.snapshot.params['id'];
		
		
		
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Content-Type', 'application/json');
		headers = headers.append('Access-Control-Allow-Origin', '*');
		this.http.post(environment.url+'forms/getAllForms',{headers})
		.subscribe(res => {
			this.myforms=res;
			var formsData = [];
			
			var self = this; 
			
			$.each(this.myforms,function(i,value){
				if(self.fid !== ''){
					if(value.id == self.fid){
						formsData.push(value);
					}	
				}
			});
			this.myforms = formsData;
			this.fdata=this.myforms[0];
			this.fdata=JSON.parse(this.fdata.form_content);
			this.formName=this.myforms[0].form_name;
			this.formData=this.myforms[0].form_content;
			
		}
		); 
		
		
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
	
    updateForm() {
		
		
		console.log(this.formName);
		console.log(this.formData);
		
		let udata = {
		    "id":this.fid,
		    "form_name":this.formName,
		    "form_content":this.formData,
			
			
		};
		console.log(udata);
		
		this.fetch.updateDataForms(udata).subscribe((res) => {
			$('#myModal').modal('show');
			
		}
		); 
	}
}
