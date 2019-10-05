import { Component } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontendx';
  apolloError$: Observable<any> = this.store.select('apolloError');

  onChange: Observable<any>;

  constructor(private store: Store<any>) {
  }

}
