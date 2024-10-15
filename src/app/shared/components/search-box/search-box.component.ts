import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @ViewChild('txtSearch')
  searchInput!: ElementRef<HTMLInputElement>;

  @Input()
  placeholder: string = ''

  @Output()
  onValue = new EventEmitter<string>();

  emitValue(value: string): void {
    this.onValue.emit(value)
    this.searchInput.nativeElement.value = '';
  }

}
