import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from './item.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {
  items : Item[] = [
    {id: 0 , name:"Laptop", description:"Brand: Lenovo , Model: HN94", category:"Electronics"},
    {id: 1 , name:"Mobiles", description:"Brand: Samsung , Model: SM940", category:"Electronics"}
  ];
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(this.items);
  
  constructor(private router: Router) { }

  addItem(newItem: Item): void {
    newItem.id  =  this.items.length;
    this.items.push(newItem);
    this.itemsSubject.next(this.items);
  }

  getItems(): Observable<Item[]> {
    return this.itemsSubject.asObservable();
  }

  editItem(item:Item): void {
    let index = this.items.findIndex((_item)=> _item.id == item.id);
    this.items[index] = item;
    this.itemsSubject.next(this.items);
    this.router.navigate(['/list'])
  }

  getById(id: number): Item | undefined {
    return this.items.find(item => item.id == id);
  }

  deleteItem(id:number): void {
    let index = this.items.findIndex((item)=> item.id == id);
    this.items.splice( index,1);
    this.itemsSubject.next(this.items);
  }
}

