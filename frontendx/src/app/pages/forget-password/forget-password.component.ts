import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';


const TokenAuth = gql`
mutation forgetpassword($email:String!) {
  forgetPassword(input: {email: $email}) {
    user {
      id
      secret
    }
  }
}

`;




@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  form: FormGroup;
  link = '';


  get email() { return this.form.get('email'); }

  constructor(
    public _fb: FormBuilder,
    public _apollo: Apollo,
  ) {
    this.form = _fb.group({
      email: ['', Validators.required],
    });

  }

  ngOnInit() {

  }

  submit() {
    if (this.form.valid) {
      this._apollo.mutate({
        mutation: TokenAuth,
        variables: {
          email: this.email.value,
        },
      }).subscribe(
        (outputs: any) => {
          this.link += outputs.data.forgetPassword.user.secret;
          console.log(outputs);
        });
    }

  }
}
