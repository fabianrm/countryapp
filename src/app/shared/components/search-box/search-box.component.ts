import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private _dbouncerSubscription?: Subscription;
  private _debouncer = new Subject<string>();

  @ViewChild('txtSearch')
  searchInput!: ElementRef<HTMLInputElement>;

  @Input()
  placeholder: string = ''
  
  @Input()
  initialValue: string = ''

  @Output()
  onValue = new EventEmitter<string>();

  @Output()
  onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this._dbouncerSubscription = this._debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this._dbouncerSubscription?.unsubscribe();
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
