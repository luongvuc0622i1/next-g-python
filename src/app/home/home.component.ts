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

  input: string = '';

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
    this.fullData = this.fullDataOrigin.filter((item: { websiteDescription: { title: string | string[]; detail: string | string[]; square: string | string[]; price: string | string[]; }; }) => {
      if (item.websiteDescription && item.websiteDescription.title && item.websiteDescription.detail && item.websiteDescription.square && item.websiteDescription.price) {
        return (
          item.websiteDescription.title.includes(this.input) ||
          item.websiteDescription.detail.includes(this.input) ||
          item.websiteDescription.square.includes(this.input) ||
          item.websiteDescription.price.includes(this.input)
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

  navi(id: string): void {
    this.router.navigate(['/page', id]);
  }

  getTableStyle() {
    // Kiểm tra chiều cao màn hình
    const height = window.innerHeight;
    
    // Nếu chiều cao màn hình >= 880, bảng sẽ hiển thị giữa khung hình
    if (height >= 880) {
      return {
        'padding-top': (height - 880)/2 + 80 + 'px' // Để hiển thị giữa khung hình
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
