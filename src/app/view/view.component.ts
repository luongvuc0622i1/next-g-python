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

  input: string = '';

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

  back() {
    window.history.back();
  }

  onInputChange(): void {
    this.fullData = this.fullDataOrigin.filter((item: { title: string | string[]; detail: string | string[]; square: string | string[]; price: string | string[]; }) => {
      if (item.title && item.detail && item.square && item.price) {
        return (
          item.title.includes(this.input) ||
          item.detail.includes(this.input) ||
          item.square.includes(this.input) ||
          item.price.includes(this.input)
        );
      }
      return false; // Nếu không thỏa mãn điều kiện, loại bỏ phần tử
    });

    let elToAdd = this.fullData.length ? (this.fullData.length % this.amount ? this.amount - (this.fullData.length % this.amount) : 0) : this.amount;
    this.fullData = [
      ...this.fullData,
      ...Array.from({ length: elToAdd }, () => ({}))
    ]
    this.condition = this.fullData.length ? true : false;
    this.refresh(1);
  }

  getTableStyle() {
    // Kiểm tra chiều cao màn hình
    const height = window.innerHeight;
    
    // Nếu chiều cao màn hình >= 895, bảng sẽ hiển thị giữa khung hình
    if (height >= 895) {
      return {
        'padding-top': (height - 895)/2 + 80 + 'px' // Để hiển thị giữa khung hình
      };
    } else {
      // Nếu chiều cao màn hình < 1000, bảng sẽ cách lề trên 100px
      return {
        'padding-top': '100px',
        'padding-bottom': '20px'
      };
    }
  }
}
