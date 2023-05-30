import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  constructor(private userService: UserService){}
  id = localStorage.getItem('id')
  wishlist:any ={}
  ngOnInit():void{
    this.userService.getProfile(this.id).subscribe({
      next: (res)=>{
        this.wishlist={
          wishlist: res.user.wishlist
        }
        console.log(this.wishlist)
      }
    })
  }

}
