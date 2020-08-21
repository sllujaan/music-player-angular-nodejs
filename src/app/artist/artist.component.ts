import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  constructor() { }

  public DOMLoaded = false;

  ngAfterViewInit(): void {
    this.DOMLoaded = true;
  }

  ngOnInit(): void {
  }

}
