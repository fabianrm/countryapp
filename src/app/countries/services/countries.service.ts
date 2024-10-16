import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  private _getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }


  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this._apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }


  searchCapital(term: string): Observable<Country[]> {
    const url = `${this._apiUrl}/capital/${term}`;
    return this._getCountriesRequest(url);
  }


  searchRegion(term: string): Observable<Country[]> {
    const url = `${this._apiUrl}/region/${term}`;
    return this._getCountriesRequest(url);
  }


  searchCountry(term: string): Observable<Country[]> {
    const url = `${this._apiUrl}/name/${term}`;
    return this._getCountriesRequest(url);
  }



}
