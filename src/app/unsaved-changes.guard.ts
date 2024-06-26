import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { NoteEditComponent } from './note-edit/note-edit.component';
@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<NoteEditComponent> {
  canDeactivate(component: NoteEditComponent): boolean {
    if (component.hasUnsavedChanges()) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
}
