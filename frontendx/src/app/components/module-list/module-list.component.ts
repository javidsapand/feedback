
import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

const GET_COOURSE = gql`
  query GET_COOURSE($id:String) {
  courseById(id: $id) {
    modules {
      edges {
        node {
          id
          title
          description
          image{
            src
          }
          myProgress
        }
      }
    }
  }
}
`;



@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  modules: any;
  loading: Boolean = false;

  constructor(
    private apollo: Apollo,
    public _actRouter: ActivatedRoute
    ) { }

  ngOnInit() {
    this._actRouter.params.subscribe(pram => {
    this.apollo
      .watchQuery({
        query: GET_COOURSE,
        variables: {
          id: pram.course_id
        },
      })
      .valueChanges
      .subscribe(
        (outputs: any) => {
          this.modules = outputs.data.courseById.modules;
        });
    });
  }
}

