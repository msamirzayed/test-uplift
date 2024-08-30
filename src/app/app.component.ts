import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { OperatingCountryService } from './operating-country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  loginBody = {
    userName:"e.saady",
    password:"qqE6)Cxp6>B8",
  }
  opBody = {
    status:1,
  }
  opBodyAdd = {
    operatingCountryName:"testadd",
    countryId:1,
    currencyId:2,

  }
  pagination = {
    pageNo:1,
    pageSize:5
  }
  constructor(private userService: UserService, private router: Router,private operatingCountryService:OperatingCountryService ){}

  ngOnInit(){
    // login

  }

  login():void {
    this.userService.login(this.loginBody).subscribe({
			next: (res) => {
				console.log('login next', res)
			},
			error: (res) => {
        console.log('login error', res)
			},
		})
  }

  getAllOperatingCountries(): void {
    this.operatingCountryService.getAll(this.opBody, this.pagination).subscribe({
			next: (data) => {
        console.log("get next",data)
			},
			error: (res) =>console.log("get error",res),
		})
 
  }

  addOperatingCountry(): void {
    this.operatingCountryService.add(this.opBodyAdd).subscribe({
			next: (data) => {
        console.log("post next",data)
			},
			error: (res) =>console.log("post error",res),
		})
 
  }
}
