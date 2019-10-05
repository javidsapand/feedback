import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

const GET_USER_BY_ID = gql`
query users($id:String) {
  userById(id:$id) {
    id
    username
    email
    firstName
    lastName
    about
    address
    isStaff
    isSuperuser
    lastLogin
    isActive
    numberOfCertificates
    numberOfCourseApplied
    numberOfThreadCreated
    hourVideoWatched
    hourAudioListened
    hourOfContentViewed
    avatar {
      src
    }
    apppliedCourses: courseSet {
      edges {
        node {
        id
        title
        description
        timestamp
        isApplaid
        isOwner
        myProgress
          modules {
            edges {
              node {
                id
                title
                myProgress
              }
            }
          }
        }
      }
    }
  }
}`;



@Component({
  selector: 'app-instructor-portfolio',
  templateUrl: './instructor-portfolio.component.html',
  styleUrls: ['./instructor-portfolio.component.scss']
})
export class InstructorPortfolioComponent implements OnInit {
  user: any;
  loading: Boolean = false;

  constructor(
    private apollo: Apollo,
    public _actRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this._actRouter.params.subscribe(pram => {
      this.apollo
        .watchQuery({
          query: GET_USER_BY_ID,
          variables: {
            id: pram.user_id
          },
        })
        .valueChanges
        .subscribe(
          (outputs: any) => {
            this.user = outputs.data.userById;
          });
    });
  }
}

