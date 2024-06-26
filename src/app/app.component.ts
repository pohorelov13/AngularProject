import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Note} from "./note";
import {MatToolbar} from "@angular/material/toolbar";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, MatToolbar, MatFormField, FormsModule, MatInput, MatNavList, MatListItem, MatIcon, MatLine, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'frontend';
  message = '';
  filteredNotes:Note[] = []

  constructor(private readonly http: HttpClient) {
  }


}
