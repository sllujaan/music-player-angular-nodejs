import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerApiService {

  constructor(private http: HttpClient) { }

  PRODUCTION = false
  

  PRODUCTION_URL = `http://musicplayerpro.herokuapp.com/`
  LOCAL_URL = `http://localhost:3000/`


  UNIQUE_URL = this.PRODUCTION ?  (this.PRODUCTION_URL) : (this.LOCAL_URL)

  musicsListUrl = this.UNIQUE_URL + 'list/'


  getMusicsList(page) {
    return this.http.get(this.musicsListUrl + page)
  }
  getImageUrl(musicUrl) {
    return (this.UNIQUE_URL + musicUrl)
  }

  

  //child to paretn with routeroutlet communication-----
  private data = new BehaviorSubject({})
  data$ = this.data.asObservable()

  changeData(data: object) {
    this.data.next(data)
  }

  //------------------------

}

