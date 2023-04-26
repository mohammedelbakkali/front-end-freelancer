import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { EditPostComponent } from './list-post/edit-post/edit-post.component';


@NgModule({
  declarations: [
    PostComponent,
    AddPostComponent,
    ListPostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
