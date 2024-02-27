import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { TransferService } from '../service/transfer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  pages: any;
  amount: number = 10;
  fullDataOrigin: any;
  fullData: any;
  condition: boolean = false;
  
  inputWebsitename: string = '';
  inputWebsiteurl: string = '';

  search1: boolean = false;
  search2: boolean = false;

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
      this.fullDataOrigin = response.map((item: any, index: number) => {
        return {
          index: index + 1,
          ...item
        };
      });

      let elToAdd = this.fullDataOrigin.length % this.amount ? this.amount - (this.fullDataOrigin.length % this.amount) : 0;
      this.fullDataOrigin = [
        ...this.fullDataOrigin,
        ...Array.from({ length: elToAdd }, () => ({}))
      ]
      this.condition = true;
      this.fullData = this.fullDataOrigin;
      this.refresh(1);
    }, () => {
      this.fullDataOrigin = Array.from({ length: this.amount }, () => ({}));
      this.fullData = this.fullDataOrigin;
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
    this.transferService.setShowModalConfig(true);
    this.transferService.setShowModal(true);
  }

  create(): void {
    this.transferService.setId(0);
    this.transferService.setShowModalConfig(true);
    this.transferService.setShowModal(true);
  }

  onInputChange(): void {
    this.fullData = this.fullDataOrigin.filter(
      (item: { website_name: string; website_url: string; }) =>
        (item.website_name && item.website_name.includes(this.inputWebsitename)) &&
        (item.website_url && item.website_url.includes(this.inputWebsiteurl))
    );

    let elToAdd = this.fullData.length % this.amount ? this.amount - (this.fullData.length % this.amount) : 0;
    this.fullData = [
      ...this.fullData,
      ...Array.from({ length: elToAdd }, () => ({}))
    ]
    this.condition = true;
    this.refresh(1);
  }
}
