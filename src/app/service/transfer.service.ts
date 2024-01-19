import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private functionCallSource = new Subject<void>();
  private _sharedData = new BehaviorSubject<any>(
    {
      'id': 0,
      'showModal': false
    }
  );

  callReload$ = this.functionCallSource.asObservable();

  callReload() {
    this.functionCallSource.next();
  }

  sharedData$ = this._sharedData.asObservable();

  setId(i: number) {
    let val = this._sharedData.value;
    val.id = i;
    this._sharedData.next(val);
  }

  setShowModal(boo: boolean) {
    let val = this._sharedData.value;
    val.showModal = boo;
    this._sharedData.next(val);
  }
}
