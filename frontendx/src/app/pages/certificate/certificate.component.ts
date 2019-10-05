
import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

const GET_CERTIFICATE_BY_ID = gql`
query certificateById($id:String) {
  certificateById(id:$id) {
    id
    timestamp
    score
    courseSet{
      edges{
        node{
          id
          title
          description
          instructors{
            edges{
              node{
                id
                firstName
                lastName
                avatar{
                  src
                }
              }
            }
          }
        }
      }
    }
    user{
      id
      firstName
      lastName
      avatar{
        src
      }
    }
  }
}`;



@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  certificate: any;
  loading: Boolean = false;

  constructor(
    private apollo: Apollo,
    public _actRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this._actRouter.queryParams.subscribe(pram => {
      this.apollo
        .watchQuery({
          query: GET_CERTIFICATE_BY_ID,
          variables: {
            id: pram.certificate
          },
        })
        .valueChanges
        .subscribe(
          (outputs: any) => {
            this.certificate = outputs.data.certificateById;
          });
    });
  }
}

