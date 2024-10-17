import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _apiUrl = 'https://restcountries.com/v3.1';

  cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private http: HttpClient) {
    this._loadFromLocalStorage();
   }

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
    return this._getCountriesRequest(url)
      .pipe(
        tap(countries => {
          this.cacheStore.byCapital = { term: term, countries: countries }
        }),
        tap( () => this._saveToLocalStorage() )
      )
  }


  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this._apiUrl}/region/${region}`;
    return this._getCountriesRequest(url)
      .pipe(
        tap(countries => {
        this.cacheStore.byRegion = {region: region, countries: countries }
        }),
        tap(() => this._saveToLocalStorage())
    )
  }


  searchCountry(term: string): Observable<Country[]> {
    const url = `${this._apiUrl}/name/${term}`;
    return this._getCountriesRequest(url)
      .pipe(
      tap(countries => {
        this.cacheStore.byCountries = { term: term, countries: countries }
      }),
        tap(() => this._saveToLocalStorage())
    )
  }


  private _saveToLocalStorage() {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
   }
  
  private _loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStorage')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!);

  }



}
