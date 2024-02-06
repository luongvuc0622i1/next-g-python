import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { TransferService } from '../service/transfer.service';

@Component({
  selector: 'app-all-views',
  templateUrl: './all-views.component.html',
  styleUrl: './all-views.component.css'
})
export class AllViewsComponent {
  views: any;
  fullDataOrigin: any;
  fullData: any;
  amount: number = 5;
  condition: boolean = false;
  inputValue: string = '';

  loading: boolean = true;

  constructor(private apiService: ApiService,
    private router: Router,
    private transferService: TransferService) { }

  ngOnInit(): void {
    this.onload();
  }

  onload(): void {
    this.loading = true;
    this.fullDataOrigin = [];
    this.apiService.getAll().subscribe(response => {
      // this.fullDataOrigin = response.map((item: any) => {
      //   return {
      //     title: Object.fromEntries(item.websiteDescription.match(/(\w+):\s?([\w,]+)/g).map((pair: string) => pair.split(':').map(item => item.trim())))['title'],
      //     description: Object.fromEntries(item.websiteDescription.match(/(\w+):\s?([\w,]+)/g).map((pair: string) => pair.split(':').map(item => item.trim())))['description'],
      //     sdt: Object.fromEntries(item.websiteDescription.match(/(\w+):\s?([\w,]+)/g).map((pair: string) => pair.split(':').map(item => item.trim())))['SĐT'],
      //     ...item
      //   };
      // });

      this.fullDataOrigin = response.flatMap(item => {
        return item.websiteDescription.map((description: any) => {
          return {
            websiteName: item.websiteName,
            websiteDescription: description,
            websiteId: item.websiteId
          };
        });
      });

      let elToAdd = this.fullDataOrigin.length % this.amount ? this.amount - (this.fullDataOrigin.length % this.amount) : 0;
      this.fullDataOrigin = [
        ...this.fullDataOrigin,
        ...Array.from({ length: elToAdd }, () => ({}))
      ]
      this.condition = true;
      this.fullData = this.fullDataOrigin;
      this.refresh(1);
      this.loading = false;
    }, () => {
      this.fullDataOrigin = Array.from({ length: this.amount }, () => ({}));
      this.fullData = this.fullDataOrigin;
      this.refresh(1);
      this.loading = false;
    });
  }

  refresh(curPage: number): void {
    let start = (curPage - 1) * this.amount;
    let end = start + this.amount;
    this.views = this.fullData.slice(start, end);
  }

  onInputChange(): void {
    this.fullData = this.fullDataOrigin.filter((item: { websiteName: string | string[]; }) => item.websiteName && item.websiteName.includes(this.inputValue));

    let elToAdd = this.fullData.length % this.amount ? this.amount - (this.fullData.length % this.amount) : 0;
    this.fullData = [
      ...this.fullData,
      ...Array.from({ length: elToAdd }, () => ({}))
    ]
    this.condition = true;
    this.refresh(1);
  }

  navi(id: string): void {
    this.router.navigate(['/page', id]);
  }
}