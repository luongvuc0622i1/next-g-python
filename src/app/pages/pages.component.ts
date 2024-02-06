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
  amount: number = 10;
  fullData: any;
  condition: boolean = false;

  private subscription?: Subscription;

  constructor(private apiService: ApiService,
    private router: Router,
    private transferService: TransferService) { }

  ngOnInit(): void {
    this.onload();
    this.subscription = this.transferService.callReload$.subscribe(() => {
      this.onload();
    });
  }

  onload(): void {
    this.apiService.getPages().subscribe(response => {
      this.fullData = response.map((item: any, index: number) => {
        return {
          index: index + 1,
          ...item
        };
      });

      let elToAdd = this.fullData.length % this.amount ? this.amount - (this.fullData.length % this.amount) : 0;
      this.fullData = [
        ...this.fullData,
        ...Array.from({ length: elToAdd }, () => ({}))
      ]
      this.condition = true;
      this.refresh(1);
    }, () => {
      this.fullData = Array.from({ length: this.amount }, () => ({}));
      this.refresh(1);
    });
  }

  refresh(curPage: number): void {
    let start = (curPage - 1) * this.amount;
    let end = start + this.amount;
    this.pages = this.fullData.slice(start, end);
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
}