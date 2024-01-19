import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { TransferService } from '../service/transfer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  pages: any;
  fullData: any;
  amount: number = 5;

  pageList: any[] = [];
  curPage: number = 1;
  numOfPages: number = 1;
  pageNumbers: any[] = [];

  private subscription?: Subscription;

  constructor (private apiService: ApiService,
               private router: Router,
               private transferService: TransferService) {
  }

  ngOnInit(): void {
    this.onload();
    this.subscription = this.transferService.callReload$.subscribe(() => {
      console.log(1);
      this.onload();
    });
  }

  onload(): void {
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

  navi(id: string): void {
    this.router.navigate(['/page', id]);
  }

  config(id: string): void {
    this.transferService.setId(parseInt(id));
    this.transferService.setShowModal(true);
  }

  create(): void {
    this.transferService.setId(0);
    this.transferService.setShowModal(true);
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