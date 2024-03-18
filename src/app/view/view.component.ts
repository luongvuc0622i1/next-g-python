import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  loading: boolean = true;

  fullData: any;
  amount: number = 5;

  key: string = '';

  id: number = 0;

  totalPages: number = 0;
  currentPage: number = 0;

  role: string = this.tokenService.getUserRole();

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params['id']);
    });
    this.onload(1, this.key);
  }

  onload(curPage: number, key: string): void {
    this.loading = true;
    this.currentPage = curPage;
    this.apiService.getSearchItem(this.id, this.currentPage - 1, this.amount, key).subscribe(response => {
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
    this.onload(1, this.key);
  }
}
