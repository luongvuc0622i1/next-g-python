import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.html']
})
export class ViewsComponent {
  views: any;
  namePage: any;
  id: number = 0;
  constructor (private apiService: ApiService,
               private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = parseInt(params['id']);
    });
    this.apiService.getView(this.id).subscribe(response => {
      this.views = response;
    });
    this.apiService.getNamePage(this.id).subscribe(response => {
      this.namePage = response.name;
    });
  }
}