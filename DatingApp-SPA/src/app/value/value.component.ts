import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  value: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getVlues();
  }
  getVlues()
  {
    this.http.get('https://localhost:5001/api/values').subscribe(response => {
      this.value = response;
    }, error => {
    console.log(error);
    });
  }

}
