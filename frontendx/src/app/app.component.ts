import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectActiveLayout } from './selectors/app.selector';
import { Layouts } from './interfaces/app.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  apolloError$: Observable<any> = this.store.select('apolloError');
  layout$: Observable<Layouts>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.layout$ = this.store.select(selectActiveLayout);
  }

}
