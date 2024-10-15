import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Name } from './../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  countries: Country[] = [];

  constructor(private countriesService: CountriesService) { }

  searchBycapital(term: string): void {
    this.countriesService.searchCapital(term).subscribe((respCountries) => {
      this.countries = respCountries
      console.log(respCountries);
      
    });

  }

}
