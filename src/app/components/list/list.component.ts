import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Item } from 'src/app/pages/items/item.model';
import { ItemsService } from 'src/app/pages/items/items.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  items!: Item[];
  dataSource = new MatTableDataSource<Item>(this.items);

  constructor(private itemService: ItemsService, private router: Router) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.itemService.getItems().subscribe((items:any) => {
      this.items = items;
      this.dataSource =  new MatTableDataSource<Item>(this.items);
    }, error => {
    });
  }

  editItem(item: Item): void {
    this.router.navigate(['/list/'+item.id]);
  }

  deleteItem(item: Item): void {
    this.itemService.deleteItem(item.id);
  }

}
