import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  standalone: true,
  imports: [
    MatFormField,
    MatInput
  ],
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {

  @Input() initialValue: string = '';
  @Input() debounceTime = 300;

  @Output() textChange = new EventEmitter<string>();

  inputValue = new Subject<string>();
  trigger = this.inputValue.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  subscriptions: Subscription[] = [];

  constructor() {
  }

  ngOnInit() {
    const subscription = this.trigger.subscribe(currentValue => {
      this.textChange.emit(currentValue);
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onInput(e: any) {
    this.inputValue.next(e.target.value);
  }
}
