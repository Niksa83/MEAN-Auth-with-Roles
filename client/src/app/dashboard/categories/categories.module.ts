import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// services
import { CategoriesService } from './categories.service';

// resolves
import { CategoriesResolve } from './containers/categories-dashboard/categories-dashboard.resolve';

// containers
import { CategoriesDashboardComponent } from './containers/categories-dashboard/categories-dashboard';

// components
import { CategoryListComponent } from './components/category-list/category-list.component';

import { AuthGuard } from '../../auth/auth.guard';


export const ROUTES: Routes = [
  {
    path: '',
    component: CategoriesDashboardComponent,
        resolve: {
          categories : CategoriesResolve
        },
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    CategoriesDashboardComponent,
    CategoryListComponent
  ],
  providers : [
    CategoriesService,
    CategoriesResolve
  ]
})
export class CategoriesModule {}
