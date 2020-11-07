import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
 
  constructor(private http: HttpClient) {}

  ngOnInit() {
  }
  registerToggler() {
    this.registerMode = !this.registerMode;
  }
  cancelRegisterMode(registerMode: boolean)
  {
    this.registerMode = registerMode;
  }
}