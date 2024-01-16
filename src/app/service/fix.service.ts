import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FixService {
  pages = {
    'data': [
      {
        'id': 1,
        'name': 'A',
        'url': 'a.com',
        'spider': 'url1'
      },
      {
        'id': 2,
        'name': 'B',
        'url': 'b.com',
        'spider': 'url2'
      },
      {
        'id': 3,
        'name': 'C',
        'url': 'c.com',
        'spider': 'url3'
      },
      {
        'id': 4,
        'name': 'D',
        'url': 'd.com',
        'spider': 'url4'
      },
      {
        'id': 5,
        'name': 'E',
        'url': 'e.com',
        'spider': 'url5'
      }
    ]
  }
  views = {
    'data': [
      {
        'title': 'Item1',
        'description': 'Des1',
        'phone': '001'
      },
      {
        'title': 'Item2',
        'description': 'Des2',
        'phone': '002'
      },
      {
        'title': 'Item3',
        'description': 'Des3',
        'phone': '003'
      },
      {
        'title': 'Item4',
        'description': 'Des4',
        'phone': '004'
      },
      {
        'title': 'Item5',
        'description': 'Des5',
        'phone': '005'
      }
    ]
  }

  constructor() { }

  getPages(): any {
    return this.pages.data
  }

  getPage(id: number): any {
    return this.pages.data.find(item => item.id === id);
  }

  getNamePage(id: number): any {
    return this.pages.data.find(item => item.id === id)?.name;
  }

  getView(): any {
    return this.views.data
  }
}
