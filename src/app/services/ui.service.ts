import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showEditInfo : boolean = false;
  private subject = new Subject<any>();


  constructor() { }

  toggleEditInfo(): void{
    this.showEditInfo = !this.showEditInfo;
    this.subject.next(this.showEditInfo);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
