import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getSearchAllItems(page: number, size: number, key: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/search?page=${page}&size=${size}&keyword=${key}`);
  }

  getSearchItem(id: number, page: number, size: number, key: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/search-with-id/${id}?page=${page}&size=${size}&keyword=${key}`);
  }

  // getAllByUser(page: number, size: number): Observable<any> {
  //   return this.http.get<any>(`${API_URL}/list-website-description?page=${page}&size=${size}`);
  // }

  // getViewByUser(id: number, page: number, size: number): Observable<any> {
  //   return this.http.get<any>(`${API_URL}/website-description/${id}?page=${page}&size=${size}`);
  // }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/all`);
  }

  getPages(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/getAll?page=${page}&size=${size}`);
  }

  getPage(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/get/${id}`);
  }

  create(obj: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/add-url`, obj);
  }

  update(obj: any, id: number): Observable<any> {
    return this.http.put<any>(`${API_URL}/update/${id}`, obj);
  }

  updateNoFile(obj: any, id: number): Observable<any> {
    return this.http.put<any>(`${API_URL}/update-no-file/${id}`, obj);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/delete/${id}`);
  }

  getNamePage(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/getName/${id}`);
  }

  getView(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/getAllData/${id}`);
  }

  getAccounts(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/list-user?page=${page}&size=${size}`);
  }

  getAccount(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/user-info/${id}`);
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/delete-user/${id}`);
  }
}
