import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category.interface';

@Component({
    selector: 'category-list',
    styleUrls: ['category-list.component.scss'],
    template: `
            <li class="list-group-item">
                <span class="badge" (click)="removeCategory()">X</span>
                {{ category.name }}
            </li>
          <!--  <a [routerLink]="category.slug" class="list-group-item">{{ category.name }} </a>   -->    
    `
})
export class CategoryListComponent implements OnInit {

    @Input()
    category: Category;

    @Output()
    remove: EventEmitter<Category> = new EventEmitter<Category>();

    ngOnInit(){

    }
    
    removeCategory(){
        this.remove.emit(this.category);
    }

}