import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchdataService } from '../fetchdata.service';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
declare var $ : any;

@Component({
	selector: 'app-all-forms',
	templateUrl: './all-forms.component.html',
	styleUrls: ['./all-forms.component.scss']
})
export class AllFormsComponent implements OnInit {
	
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
		private route: ActivatedRoute,
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
			
		}
		); 
		
		
	}
	
	deleteForm(id) {
		
		if(confirm("Are you sure to delete")) {
			console.log("Implement delete functionality here");
			
			
			this.fetch.deleteDataForms(id).subscribe((res) => {
				let index = this.myforms.findIndex(i => i.id === id);
				this.myforms.splice(index, 1);
				
				$('#myModal').modal('show');
				
			}
			); 
		}
		
	}
	
}




