import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StarsService } from 'src/app/services/stars.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarsComponent {

  @Input('rating') public rating: number = 0;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'red';
  @Output() public ratingUpdated = new EventEmitter();

  public snackBarDuration: number = 2000;
  public ratingArr:any = [];
  valueForm! : any;
  id = localStorage.getItem('id')
  itemId!: string;
  rating2:number =this.rating
  constructor(
    private snackBar: MatSnackBar,
    private starsService: StarsService,
    private route: ActivatedRoute ,
     ) {
      
  }
  

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      // Perform additional actions based on the item ID
    });
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {
    console.log(rating)
    this.rating2 = rating
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.rating=rating;
    this.ratingUpdated.emit(true);
    return false;
  }
  
  
  showIcon(index: number) {
    if (this.rating2!=0){
      const obj = {
        rating:this.rating,
        userId: this.id,
        gigId: this.itemId
      }
      this.starsService.addreview(obj)
      this.rating2 = 0;
    }
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      
      return 'star_border';
    }
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
