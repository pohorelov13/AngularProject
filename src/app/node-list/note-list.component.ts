import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatLine} from "@angular/material/core";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Note} from "../note";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NoteService} from "../note.service";
import {catchError, Observable, of, Subject, Subscription, switchMap} from "rxjs";
import {SearchInputComponent} from "../search-input/search-input.component";

@Component({
  selector: 'app-node-list',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLine,
    MatListItem,
    MatNavList,
    MatToolbar,
    NgForOf,
    AsyncPipe,
    NgIf,
    SearchInputComponent
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit{


  constructor(private service: NoteService, public router: Router) {
  }
  searchTerm = new Subject<string>();
  results$: Observable<Note[] | null> = this.searchTerm.pipe(
    switchMap(searchTerm => this.service.getNotesByHeader(searchTerm)),
    catchError(errorResponse => {
      alert("oh no, there was an error when calling the star wars api");
      console.error(errorResponse);
      return of(null);
    })
  );
  notes$: Observable<Note[]> | undefined;

  ngOnInit(): void {
    this.notes$ = this.service.getNotes();
   this.notes$.forEach(e=>console.log(e));
  }

  onTextChange(changedText: string) {
    this.searchTerm.next(changedText);
  }

}
