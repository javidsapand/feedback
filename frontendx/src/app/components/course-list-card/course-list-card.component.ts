import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-list-card',
  templateUrl: './course-list-card.component.html',
  styleUrls: ['./course-list-card.component.scss']
})
export class CourseListCardComponent implements OnInit {
  @Input() course: any;

  constructor() { }

  ngOnInit() {
  }

}
