import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';


/*****
 * 注意routes不要定义在装饰器后面，会报错
 */

const routes:Routes=[
  {path:'heroes',component:HeroesComponent},   //注意path不要以'/'开头
  {path:'dashboard',component:DashboardComponent},
  {path:'detail/:id',component:HeroDetailComponent},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'}
]  

@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
