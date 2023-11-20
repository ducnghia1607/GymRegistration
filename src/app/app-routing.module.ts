import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './components/create-registration/create-registration.component';
import { ListRegistrationComponent } from './components/list-registration/list-registration.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'registration', component: CreateRegistrationComponent },
  { path: 'list', component: ListRegistrationComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'registration/:id', component: CreateRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
