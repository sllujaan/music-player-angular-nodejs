import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  constructor() { }

  public DOMLoaded = false;

  ngAfterViewInit(): void {
    this.DOMLoaded = true;
  }

  ngOnInit(): void {
  }

}
