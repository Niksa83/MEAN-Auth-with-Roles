import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Category } from '../../models/category.interface';
import { CategoriesService } from '../../categories.service';


@Injectable()
export class CategoriesResolve implements Resolve<Category[]> {

  constructor(private categoryService: CategoriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.categoryService.getCategories();
  }

}