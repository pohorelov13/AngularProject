import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Note} from "./note";
import {SimpleMessage} from "./simple-message";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl = 'https://demo-latest-zim3.onrender.com'

  constructor(private http: HttpClient) {
  }

  getNoteById(id: number) {
    return this.http.get<Note>(this.baseUrl + '/notes/' + id);
  }

  deleteNote(id?: number) {
    return this.http.delete<SimpleMessage>(this.baseUrl + '/notes/' + id);
  }

  saveNote(note: Note) {
    return this.http.post<SimpleMessage>(this.baseUrl +'/notes/add', note );
  }

  getNotes() {
   return this.http.get<Note[]>(this.baseUrl +'/notes');
  }
  getNotesByHeader(header: string) {
    return this.http.get<Note[]>(this.baseUrl +'/notes/find?header=' + header);
  }
}
