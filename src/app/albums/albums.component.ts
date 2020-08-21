import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor() { }

  public DOMLoaded = false;

  ngAfterViewInit(): void {
    this.DOMLoaded = true;
  }


  ngOnInit(): void {
  }

}
