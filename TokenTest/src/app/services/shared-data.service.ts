import { Injectable } from '@angular/core';
import { Data } from '../models/data.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private sharedData$ = new BehaviorSubject<Data>({} as Data);
  sharedData = this.sharedData$.asObservable();
  constructor() { }

  private refreshDataList$ = new Subject<void>();

  setData(data: Data){
    this.sharedData$.next(data);
  }

  getRefreshDataList(){
    return this.refreshDataList$;
  }

  refreshDataList(){
    this.refreshDataList$.next();
  }
}
