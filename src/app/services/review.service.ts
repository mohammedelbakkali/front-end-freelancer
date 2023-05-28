// review.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewSubmittedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reviewSubmitted$ = this.reviewSubmittedSubject.asObservable();

  submitReview() {
    this.reviewSubmittedSubject.next(true);
  }
}
