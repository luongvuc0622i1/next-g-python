import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  // @ts-ignore
  @Input() fullData;
  // @ts-ignore
  @Input() amount;
  @Output() refresh = new EventEmitter<number>();

  curPage: number = 1;
  numOfPages: number = 1;
  pageNumbers: any[] = [];

  ngOnInit(): void {
    this.numOfPages = Math.floor(this.fullData.length/this.amount);
    this.pageNumbers = Array.from({ length: this.numOfPages }, (_, index) => index + 1);
  }
  
  ngOnChanges(): void {
    this.numOfPages = Math.floor(this.fullData.length/this.amount);
    this.pageNumbers = Array.from({ length: this.numOfPages }, (_, index) => index + 1);
  }

  firstPage() {
    this.curPage = 1;
    this.refresh.emit(this.curPage);
  }

  prevPage() {
    this.curPage -= 1;
    this.refresh.emit(this.curPage);
  }

  choosePage(num: number) {
    this.curPage = num;
    this.refresh.emit(this.curPage);
  }

  nextPage() {
    this.curPage += 1;
    this.refresh.emit(this.curPage);
  }

  lastPage() {
    this.curPage = this.numOfPages;
    this.refresh.emit(this.curPage);
  }
}
