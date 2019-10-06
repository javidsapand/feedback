import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';



import * as fromUserActions from '../../actions/user.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  constructor(
    public _fb: FormBuilder,
    private store: Store<any>
  ) {


  }

  ngOnInit() {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.store.dispatch(fromUserActions.login(this.form.value));
  }
}
