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

  fullData: any;
  amount: number = 5;

  key: string = '';

  totalPages: number = 0;
  currentPage: number = 1;

  constructor(private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.onload(1, this.key);
  }

  onload(curPage: number, key: string): void {
    this.loading = true;
    this.currentPage = curPage;
    this.apiService.getSearchAllItems(this.currentPage - 1, this.amount, key).subscribe(response => {
      this.totalPages = response.totalPages;

      let elToAdd = response.size - response.numberOfElements;
      this.fullData = [
        ...response.content,
        ...Array.from({ length: elToAdd }, () => ({}))
      ]
      this.loading = false;
    }, () => {
      this.fullData = Array.from({ length: this.amount }, () => ({}));
      this.loading = false;
    });
  }

  refresh(curPage: number): void {
    this.onload(curPage, this.key);
  }

  onInputChange(): void {
    this.onload(1, this.key)
  }

  navi(id: string): void {
    this.router.navigate(['/page', id]);
  }
}
