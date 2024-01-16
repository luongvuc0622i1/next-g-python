import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  pages: any;
  id: number = 0;
  showModalConfig: boolean = false;
  constructor (private apiService: ApiService,
               private router: Router) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.apiService.getPages().subscribe(response => {
      this.pages = response;
    });
  }

  closeModal(): void {
    this.id = 0;
    this.showModalConfig = false;
  }

  navi(id: string): void {
    this.router.navigate(['/page', id]);
  }

  config(id: string): void {
    this.id = parseInt(id);
    this.showModalConfig = true;
  }

  handleClose(event: MouseEvent): void {
    this.id = 0;
    if (!(event.target as HTMLElement).closest('.modal-content')) {
      this.showModalConfig = false;
    }
  }

  create(): void {
    this.showModalConfig = true;
  }
}