import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  pages: any;
  fullData: any;
  amount: number = 5;
  id: number = 0;
  showModalConfig: boolean = false;

  pageList: any[] = [];
  curPage: number = 1;
  numOfPages: number = 1;
  pageNumbers: any[] = [];

  constructor (private apiService: ApiService,
               private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.getPages().subscribe(response => {
      let elToAdd = this.amount - (response.length % this.amount);
      this.fullData = [
        ...response,
        ...Array.from({ length: elToAdd }, () => ({}))
      ]
      this.numOfPages = Math.floor(response.length/this.amount) + 1;
      this.pageNumbers = Array.from({ length: this.numOfPages }, (_, index) => index + 1);
      this.refresh();
    }, () => {
      this.fullData = Array.from({ length: this.amount }, () => ({}));
      this.refresh();
    });
  }

  refresh(): void {
    this.pages = this.fullData.slice(0, this.amount);
  }

  closeModal(): void {
    this.id = 0;
    this.showModalConfig = false;
  }

  navi(id: string): void {
    this.router.navigate(['/page', id]);
  }

  config(id: string): void {
    this.id = parseInt(id);
    this.showModalConfig = true;
  }

  handleClose(event: MouseEvent): void {
    this.id = 0;
    if (!(event.target as HTMLElement).closest('.modal-content')) {
      this.showModalConfig = false;
    }
  }

  create(): void {
    this.showModalConfig = true;
  }

  // paging
  firstPage() {
    this.curPage = 1;
    this.loadRows();
  }

  prevPage() {
    this.curPage -= 1;
    this.loadRows();
  }

  choosePage(num: number) {
    this.curPage = num;
    this.loadRows();
  }

  nextPage() {
    this.curPage += 1;
    this.loadRows();
  }

  lastPage() {
    this.curPage = this.numOfPages;
    this.loadRows();
  }

  loadRows() {
    let start = (this.curPage - 1)*this.amount;
    let end = start + this.amount;
    this.pages = this.fullData.slice(start, end);
  }
}