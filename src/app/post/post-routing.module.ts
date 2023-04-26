import { EditPostComponent } from './list-post/edit-post/edit-post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ListPostComponent } from './list-post/list-post.component';

const routes: Routes = [
     {
      path : "",
      component:PostComponent,
      children : [
           {
            path:"add-post",
            component:AddPostComponent
           },{
            path:"list-posts",
            component:ListPostComponent,
            children : [
               {
                path:"edit-post",
                component:EditPostComponent
               }

            ]
           }

      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
