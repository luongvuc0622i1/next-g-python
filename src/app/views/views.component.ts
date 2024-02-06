import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { TransferService } from '../service/transfer.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.html']
})
export class ViewsComponent {
  views: any;
  fullData: any;
  amount: number = 5;
  condition: boolean = false;

  namePage: any;
  id: number = 0;

  loading: boolean = true;

  constructor (private apiService: ApiService,
               private route: ActivatedRoute,
               private transferService: TransferService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params['id']);
    });
    this.onload();
  }

  onload(): void {
    this.loading = true;
    this.fullData = [];
    this.apiService.getView(this.id).subscribe(response => {
      this.fullData = response.map((item: any, index: number) => {
        return {
          index: index + 1,
          ...item
        };
      });

      let elToAdd = this.fullData.length % this.amount ? this.amount - (this.fullData.length % this.amount) : 0;
      this.fullData = [
        ...this.fullData,
        ...Array.from({ length: elToAdd - 1 }, () => ({}))
      ]
      this.condition = true;
      this.refresh(1);
      this.loading = false;
    }, () => {
      this.fullData = Array.from({ length: this.amount }, () => ({}));
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
    // this.router.navigate(['/']);
    window.history.back();
  }

  openModalSignup() {
    this.transferService.setShowModal(true);
    this.transferService.setShowModalSignup(true);
  }
}