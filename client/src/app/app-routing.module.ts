import { InputFormComponent } from './components/input-form/input-form.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'theses', component: DocumentListComponent },
  { path: '', redirectTo: '/theses', pathMatch: 'full' },
  { path: 'addThesis', component: InputFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
