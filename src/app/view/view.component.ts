import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  views: any;
  fullDataOrigin: any;
  fullData: any;
  amount: number = 5;
  condition: boolean = false;

  namePage: any;
  id: number = 0;

  loading: boolean = true;

  inputTitle: string = '';
  inputSquare: string = '';
  inputPrice: string = '';

  search1: boolean = false;
  search2: boolean = false;
  search3: boolean = false;

  constructor(private apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params['id']);
    });
    this.onload();
  }

  onload(): void {
    this.loading = true;
    this.fullDataOrigin = [];
    this.apiService.getView(this.id).subscribe(response => {
      this.fullDataOrigin = response.map((item: any, index: number) => {
        return {
          index: index + 1,
          ...item
        };
      });

      let elToAdd = this.fullDataOrigin.length % this.amount ? this.amount - (this.fullDataOrigin.length % this.amount) : 0;
      this.fullDataOrigin = [
        ...this.fullDataOrigin,
        ...Array.from({ length: elToAdd - 1 }, () => ({}))
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
    this.apiService.getNamePage(this.id).subscribe(response => {
      this.namePage = response.name;
    });
  }

  refresh(curPage: number): void {
    let start = (curPage - 1) * this.amount;
    let end = start + this.amount;
    this.views = this.fullData.slice(start, end);
  }

  onInputChange(): void {
    this.fullData = this.fullDataOrigin.filter(
      (item: { title: string; square: string; price: string; }) =>
        (item.title && item.title.includes(this.inputTitle)) &&
        (item.square && item.square.includes(this.inputSquare)) &&
        (item.price && item.price.includes(this.inputPrice))
    );

    let elToAdd = this.fullData.length % this.amount ? this.amount - (this.fullData.length % this.amount) : 0;
    this.fullData = [
      ...this.fullData,
      ...Array.from({ length: elToAdd }, () => ({}))
    ]
    this.condition = true;
    this.refresh(1);
  }

  back() {
    window.history.back();
  }
}
