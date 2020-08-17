import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchdataService } from '../fetchdata.service';
import { environment } from '../../environments/environment';

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
  jsonObject: any;
  jsonString: any;
  resultobj: any;
  addressData;
  caseId;
  visitedPageArr = [];
  modalDataObj: any;
  modalDataArr: any;
  paymentInfo;
  arrangementInfo;
  visitCaseData;
  caseAlerts;
  currLang: any;
  currLat: any;
  visitOutcome;
  distance;
  locationOverride = false;
  tomiles = 1609.34;
  linked = [];
  linked_cases_to_visit = [];
  private services = [];
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
			this.allservices=res["data"];
			console.log(this.allservices);
		}
		); 
  }
  

  
  search(){
  
  var searchData = [];
  var self = this; 
    
      $.each(this.allservices,function(i,value){
            if(self.model.searchterm !== ''){

              if(value.name.toUpperCase().match(self.model.searchterm.toUpperCase())){
                  searchData.push(value);
                }
				
           }
           else{
            //searchData.push(value);
           } 
  
      });
      this.model.services = searchData;
  }

onSubmit(event) {
console.log(event);
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
