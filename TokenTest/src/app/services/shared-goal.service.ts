import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class SharedGoalService {
  private sharedGoal$ = new BehaviorSubject<Goal>({} as Goal);
  sharedGoal = this.sharedGoal$.asObservable();
  constructor() { }

  private refreshGoalList$ = new Subject<void>();

  setGoal(goal: Goal){
    this.sharedGoal$.next(goal);
  }

  getRefreshGoalList(){
    return this.refreshGoalList$;
  }

  refreshGoalList(){
    this.refreshGoalList$.next();
  }

}