import { Component, OnInit } from '@angular/core';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_COOURSE = gql`
  query GET_COOURSE {
  course {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        title
        description
        timestamp
        isApplaid
        isOwner
        myProgress
        image {
          src
        }
        modules {
          edges {
            node {
              id
            }
          }
        }
        applied {
          edges {
            node {
              id
              user {
                username
                firstName
                lastName
                numberOfCertificates
                numberOfCourseApplied
                numberOfThreadCreated
              }
            }
          }
        }
        instructors {
          edges {
            node {
              id
              username
              firstName
              lastName
            }
          }
        }
      }
    }
  }
}`;



@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: any;
  loading: Boolean = false;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_COOURSE,
      })
      .valueChanges
      .subscribe(
        outputs => {
          this.loading = outputs.loading;
          console.log(outputs);
          this.courses = outputs;
        });
  }
}

