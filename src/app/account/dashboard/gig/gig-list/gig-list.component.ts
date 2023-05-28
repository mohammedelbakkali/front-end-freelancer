import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Gig } from 'src/app/models/gig.model';
import { GigService } from 'src/app/services/gig.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},

];

@Component({
  selector: 'app-gig-list',
  templateUrl: './gig-list.component.html',
  styleUrls: ['./gig-list.component.scss']
})
export class GigListComponent {

  constructor(private  gigservice: GigService){
    this.gitAllgigs();
  }
  gigTable:any[] = [];

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  



  
  gig:Gig = {
    gigtitle:"",
    CategoryId:"",
    photo:"",
    subCategoryId:"",
    Positivekeywords:[]
  };



  gitAllgigs(){
       this.gigservice.getAllGigsOFUser().subscribe({
          next:(res)=>{
              // console.log(res.user.posts)
              for(let i = 0 ; i < res.user.posts.length ; i++){
                      const a = {
                          gittitle : res.user.posts[i].gigtitle,
                          description : res.user.posts[i].description,
                          status : res.user.posts[i].status,
                          createdAt:res.user.posts[i].createdAt.slice(0,10),
                          range:i+1
                      }
                      // console.log(res.user.posts[i].createdAt.slice(0,10))
                      this.gigTable.push(a);
                       
              }

          },
          error:()=>{}
       })
    }
}
