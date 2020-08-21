import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  
  constructor() { }

  public DOMLoaded = false;

  ngAfterViewInit(): void {
    this.DOMLoaded = true;
  }


  ngOnInit(): void {
  }

}
