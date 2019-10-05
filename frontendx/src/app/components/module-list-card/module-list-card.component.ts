import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-module-list-card',
  templateUrl: './module-list-card.component.html',
  styleUrls: ['./module-list-card.component.scss']
})
export class ModuleListCardComponent implements OnInit {
  @Input() module: any;

  constructor() { }

  ngOnInit() {
  }

}
