import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { TransferService } from '../service/transfer.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  accounts: any;
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
    this.apiService.getAccounts().subscribe(response => {
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
    this.accounts = this.fullData.slice(start, end);
  }

  edit(id: string): void {
    this.transferService.setIdSignup(parseInt(id));
    this.transferService.setShowModal(true);
    this.transferService.setShowModalSignup(true);
  }

  create() {
    this.transferService.setIdSignup(0);
    this.transferService.setShowModal(true);
    this.transferService.setShowModalSignup(true);
  }

  delete(id: number) {
    this.apiService.deleteAccount(id).subscribe(response => {
      this.onload();
    });
  }
}