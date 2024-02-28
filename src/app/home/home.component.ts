import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loading: boolean = true;

  fullDataOrigin: any;
  fullData: any;
  views: any;
  amount: number = 5;
  condition: boolean = false;
  inputWebsite: string = '';
  inputTitle: string = '';
  inputSquare: string = '';
  inputPrice: string = '';

  search1: boolean = false;
  search2: boolean = false;
  search3: boolean = false;
  search4: boolean = false;

  constructor(private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.onload();
  }

  onload(): void {
    this.loading = true;
    this.fullDataOrigin = [];
    this.apiService.getAll().subscribe(response => {
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
    this.fullData = this.fullDataOrigin.filter(
      (item: { websiteName: string | string[]; websiteDescription: { title: string; square: string; price: string }; }) =>
        (item.websiteName && item.websiteName.includes(this.inputWebsite)) &&
        (item.websiteDescription.title && item.websiteDescription.title.includes(this.inputTitle)) &&
        (item.websiteDescription.square && item.websiteDescription.square.includes(this.inputSquare)) &&
        (item.websiteDescription.price && item.websiteDescription.price.includes(this.inputPrice))
    );

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
