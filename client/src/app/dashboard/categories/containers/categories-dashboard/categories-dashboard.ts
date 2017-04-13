import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Category } from '../../models/category.interface';
import { CategoriesService } from '../../categories.service';

import { DialogService } from '../../../dialog.service';

//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/pluck';

@Component({
    styleUrls: ['categories-dashboard.scss'],
    template: `
    <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
        <h2 class="text-center text-muted">Create a new category: </h2>

            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="row">
                
                    <form [formGroup]="form" (ngSubmit)="onSubmit()">
                        <div class="col-sm-10 col-xs-8">            
                            <div class="form-group">
                            <input type="text" class="form-control" placeholder="A new category..." formControlName="name">
                        </div>
        
                        </div><!-- /.col-xs-10--> 
                        <div class="col-sm-2 col-xs-4">
                            <button  class="btn btn-info btn-block" [disabled]="form.invalid">ADD</button>
                        </div>
                    </form> 
                </div>
            </div>
            </div> <!-- /.panel -->

            <hr />
            <h3 class="text-center text-muted">All existing categories:</h3>

         <!--   <div class="list-group">
            <p>Total Categories : <strong>{{(categories | async)?.length}}</strong> </p>
                <category-list
                    *ngFor="let category of (categories | async)"
                    [category]="category"                
                ></category-list>
            </div> -->
          <div class="list-group">
            <p>Total Categories : <strong>{{categories?.length}}</strong> </p>
                <category-list
                    *ngFor="let category of categories"
                    [category]="category"
                    (remove)="handleRemove($event)"                
                ></category-list>
            </div> 

        </div><!--/.col-sm-8 col-sm-offset-2-->

    </div><!-- /.row-->

    `
})
export class CategoriesDashboardComponent implements OnInit {

 //   categories: Observable<Category[]> = this.route.data.pluck('categories');
 
    categories : Category[];

    constructor( 
        private fb: FormBuilder,
        private service: CategoriesService,
        private dialogService: DialogService,
        private route: ActivatedRoute){}

    form = this.fb.group({
      name : ['', [Validators.required]]
    });

    ngOnInit(){
        this.route.data
        .subscribe((data: { categories: Category[] }) =>{
            this.categories = data.categories;
        });
    }

    onSubmit(){
      this.service.createCategory(this.form.value)
        .subscribe((data : Category) => {
            this.categories = [data, ...this.categories];
        });
        
        this.form.reset();
    }

    handleRemove(event: Category){
       let confirm = this.dialogService.confirm('Are You sure to delete this category?');

       if(confirm){
            this.service
            .deleteCategory(event)
            .subscribe((data) => {
                this.categories = this.categories.filter((category: Category) => {
                return category._id !== event._id;
                });
            });
       }
    }


}