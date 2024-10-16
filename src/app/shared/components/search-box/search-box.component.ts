import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit {


  private _debouncer = new Subject<string>();

  @ViewChild('txtSearch')
  searchInput!: ElementRef<HTMLInputElement>;

  @Input()
  placeholder: string = ''

  @Output()
  onValue = new EventEmitter<string>();

  @Output()
  onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this._debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }


  emitValue(value: string): void {
    if (!value) return;
    this.onValue.emit(value)
    this.searchInput.nativeElement.value = '';
  }

  //Se ejecuta esperando un tiempo
  onKeyPress(searchTerm: string): void {
    if (!searchTerm) return;
    this._debouncer.next(searchTerm);
  }

}
