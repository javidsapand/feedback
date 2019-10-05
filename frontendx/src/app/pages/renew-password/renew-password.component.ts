
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';


const RenewPassword = gql`
mutation renewPassword($password:String!, $secret:String!) {
  renewPassword(input: {password:$password , secret:$secret}) {
    user {
      secret
    }
  }
}
`;




@Component({
  selector: 'app-renew-password',
  templateUrl: './renew-password.component.html',
  styleUrls: ['./renew-password.component.scss']
})
export class RenewPasswordComponent implements OnInit {
  form: FormGroup;
  secret: String;

  get passwordretype() { return this.form.get('passwordretype'); }
  get password() { return this.form.get('password'); }

  constructor(
    public _fb: FormBuilder,
    public _apollo: Apollo,
    public _actRouter: ActivatedRoute
  ) {
    this.form = _fb.group({
      passwordretype: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  ngOnInit() {
    this._actRouter.queryParams.subscribe(pram => {
      this.secret = pram.secret;
    });
  }

  submit() {
    if (this.passwordretype.value === this.password.value) {
      this._apollo.mutate({
        mutation: RenewPassword,
        variables: {
          password: this.password.value,
          secret: this.secret,
        },
      }).subscribe(
        (outputs: any) => {

        });
    }



  }
}
