import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {

  constructor() { }

  public DOMLoaded = false;

  ngAfterViewInit(): void {
    this.DOMLoaded = true;
  }

  ngOnInit(): void {
  }

}
