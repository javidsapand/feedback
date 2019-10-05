import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';


const TokenAuth = gql`
mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
  }
}
`;




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
    public _apollo: Apollo,
  ) {
    this.form = _fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  async ngOnInit() {

  }

  submit() {
    if (this.form.valid) {
      this._apollo.mutate({
        mutation: TokenAuth,
        variables: {
          username: this.username.value,
          password: this.password.value,
        },
      }).subscribe(
        (outputs: any) => {
          localStorage.setItem('token', 'JWT ' + outputs.data.tokenAuth.token);
          localStorage.setItem('username', this.username.value);
        });
    }

  }
}
