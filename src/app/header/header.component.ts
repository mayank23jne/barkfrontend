import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	
	
	public uname:any;
	
	isLoggedIn=false;
	constructor(
		private router: Router, 
	) { }
	
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
	}
	
	logout(){
		localStorage.removeItem('user_data');
		// localStorage.clear();
		// sessionStorage.clear(); 
		this.router.navigate(['/home']);
	}
	
}
