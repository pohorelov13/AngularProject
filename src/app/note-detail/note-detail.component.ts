import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Note} from "../note";
import {NoteService} from "../note.service";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatButton,
    NgIf
  ],
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  note?: Note;

  constructor(private route: ActivatedRoute, private router: Router, private noteService: NoteService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.noteService.getNoteById(id)
      .subscribe({
        next: value => this.note = value,
        error: err => console.log(err)
      });
  }

  editNote() {
    if (this.note) {
      this.router.navigate(['/edit', this.note.id]);
    }
  }

  deleteNote() {
    if (this.note) {
      this.noteService.deleteNote(this.note.id).subscribe({
        next: value => {
          this.snackBar.open(value.message, 'Close', {
            duration: 3000
          });
        }, error: err => console.log(err)
      });
      this.router.navigate(['/']);

    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
