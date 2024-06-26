import {Routes} from '@angular/router';
import {NoteListComponent} from "./node-list/note-list.component";
import {UnsavedChangesGuard} from "./unsaved-changes.guard";

export const routes: Routes = [
  {path: '', component: NoteListComponent},
  {
    path: 'note/:id',
    loadComponent: () => import('./note-detail/note-detail.component').then(m => m.NoteDetailComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./note-edit/note-edit.component').then(m => m.NoteEditComponent),
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'new', loadComponent: () => import('./note-edit/note-edit.component').then(m => m.NoteEditComponent),
    canDeactivate: [UnsavedChangesGuard]
  }
];
