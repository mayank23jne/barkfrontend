import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchdataService } from '../../fetchdata.service';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';
declare var $ : any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
allservices:any;
  model: any = {};
  test:any;
  formData;
  formConfig;
  searchterm:any;

  locationOverride = false;
  showss = false;
  services:any;
//  form1='https://qvffwzgzipuxobq.form.io/q1';
//  form2='https://qvffwzgzipuxobq.form.io/q1'; 
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
			console.log(this.allservices);
		}
		); 
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
	  
  search(event){
  
  this.searchterm=event.target.value;
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
	   console.log(this.services);
  }

onSubmit(event) {
console.log(event.data.email);




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

onRender(event) {
console.log(event);
}

onChange(event) {
console.log(event);
}

onNext(event) {
console.log(event);
}


}
