import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.html']
})
export class ViewsComponent {
  views: any;
  fullData: any;
  amount: number = 3;

  pageList: any[] = [];
  curPage: number = 1;
  numOfPages: number = 1;
  pageNumbers: any[] = [];

  namePage: any;
  id: number = 0;
  constructor (private apiService: ApiService,
               private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params['id']);
    });
    this.apiService.getView(this.id).subscribe(response => {
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
    this.apiService.getNamePage(this.id).subscribe(response => {
      this.namePage = response.name;
    });
  }

  refresh(): void {
    this.views = this.fullData.slice(0, this.amount);
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
    this.views = this.fullData.slice(start, end);
  }
}