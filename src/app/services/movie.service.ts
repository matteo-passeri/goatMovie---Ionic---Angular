import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  omdbUrl = 'http://www.omdbapi.com';
  omdbApiKey = environment.OMDB_APIKEY;

  utellyUrl = 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com';
  utellyApiKey = environment.UTELLY_APIKEY;

  constructor(private http: HttpClient) { }

  utellySearchData(title: string, type: SearchType) {
    return this.http.get(`${this.utellyUrl}?s=${encodeURI(title)}&type=${type}&apiKey=${this.utellyApiKey}`)
    .pipe(
      map(results => {
        console.log('uTelly: ', results);
        return results['Search'];
      })
    );
  }

  searchData(title: string, type: SearchType): Observable<any> {
    this.utellySearchData(title, type);
    return this.http.get(`${this.omdbUrl}?s=${encodeURI(title)}&type=${type}&apiKey=${this.omdbApiKey}`)
    .pipe(
      map(results => {
        

        console.log('RAW: ', results);
        return results['Search'];
      })
    );
  }

  getDetails(id) {
    return this.http.get(`${this.omdbUrl}?i=${id}&plot=full&apiKey=${this.omdbApiKey}`);
  }

}
