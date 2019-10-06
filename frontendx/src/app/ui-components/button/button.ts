import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';





@Component({
  selector: 'button',
  encapsulation: ViewEncapsulation.None,
  template: ``,
  styleUrls: ['./button.scss'],
  host: {
    '[class.btn]': 'true',

    '[class.btn-sm]': 'size === "sm"',
    '[class.btn-md]': 'size === "md"',
    '[class.btn-lg]': 'size === "lg"',

    '[class.btn-primary]' : 'color === "primary" && !outline',
    '[class.btn-secondary]' : 'color === "secondary" && !outline',
    '[class.btn-success]' : 'color === "success" && !outline',
    '[class.btn-danger]' : 'color === "danger" && !outline',
    '[class.btn-warning]' : 'color === "warning" && !outline',
    '[class.btn-info]' : 'color === "info" && !outline',
    '[class.btn-light]' : 'color === "light" && !outline',
    '[class.btn-dark]' : 'color === "dark" && !outline',

    '[class.btn-outline-primary]' : 'color === "primary" && outline',
    '[class.btn-outline-secondary]' : 'color === "secondary" && outline',
    '[class.btn-outline-success]' : 'color === "success" && outline',
    '[class.btn-outline-danger]' : 'color === "danger" && outline',
    '[class.btn-outline-warning]' : 'color === "warning" && outline',
    '[class.btn-outline-info]' : 'color === "info" && outline',
    '[class.btn-outline-light]' : 'color === "light" && outline',
    '[class.btn-outline-dark]' : 'color === "dark" && outline',


    '[class.active]': 'active',
    '[class.disabled]': 'disabled || loading',
    '[class.focus]': 'focused' ,
    '(focus)': 'focused = true',
    '(blur)': 'focused = false',
    '[innerHTML]': 'loading ? LOADING_TEMPLATE:label',
    '[attr.type]': 'type'
  }
})
export class ButtonComponent implements OnInit {
   LOADING_TEMPLATE;


  @Input() label = 'Submit';
  @Input() active = false;
  @Input() disabled = false;
  @Input() outline = false;
  @Input() color: string =
    'primary' ||
    'secondary' ||
    'success' ||
    'danger' ||
    'warning' ||
    'info' ||
    'light' ||
    'dark';

  @Input() type: string = 'button' || 'submit' || 'reset' ;
  @Input() size: string = 'md' || 'sm' || 'lg' ;

  @Input() icon = null;
  @Input() focused = false;
  @Input() loading = false;

  constructor() { }

  ngOnInit() {
    this.LOADING_TEMPLATE = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>${this.label}`;
  }

}
