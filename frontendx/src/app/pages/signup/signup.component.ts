import { Component, OnInit } from '@angular/core';
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



const SINGUP = gql`
mutation signup($username: String!, $password: String!, $firstName: String!, $lastName: String!, $email: String!) {
  signup(input: {username: $username, password: $password, firstName: $firstName, lastName: $lastName, email: $email}) {
    user {
      username
    }
  }
}
`;






@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  token = null;

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }

  constructor(
    public _fb: FormBuilder,
    public _apollo: Apollo
  ) {
    this.form = _fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],

    });

  }

  ngOnInit() {

  }


  submit() {
    if (this.form.valid) {
      this._apollo.mutate({
        mutation: SINGUP,
        variables: {
          username: this.username.value,
          password: this.password.value,
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          email: this.email.value,

        },
      }).subscribe(
        (outputs: any) => {
          this.login(outputs.data.signup.user.username, this.password.value);
        });

    }

  }


  login(username: String, password: String) {
    this._apollo.mutate({
      mutation: TokenAuth,
      variables: {
        username: username,
        password: password,
      },
    }).subscribe(
      (outputs: any) => {
        localStorage.setItem('token', 'JWT ' + outputs.data.tokenAuth.token);
        localStorage.setItem('username', this.username.value);
      });
  }


}
