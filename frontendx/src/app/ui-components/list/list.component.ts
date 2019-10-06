// Angular
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  SelectionModel
} from '@angular/cdk/collections';
// RXJS
import {
  tap
} from 'rxjs/operators';
import {
  merge
} from 'rxjs';
// Crud
import {
  QueryParamsModel
} from './list-utils';
// Layout
import {
  DataTableItemModel,
  DataTableService
} from './list-utils';
import {
  DataTableDataSource
} from './list-utils';


import {PaginatorComponent} from '../paginator/paginator.component';
import {SortbyComponent} from '../sortby/sortby.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // Public properties
  dataSource: DataTableDataSource;
  displayedColumns = ['id', 'name'];
  @ViewChild(PaginatorComponent, {
    static: true
  }) paginator: PaginatorComponent;
  @ViewChild(SortbyComponent, {
    static: true
  }) sort: SortbyComponent;
  selection = new SelectionModel < DataTableItemModel > (true, []);
  dataTableService: DataTableService;

  /**
   * Component constructor
   *
   * @param dataTableService: DataTableService
   */
  constructor() {
    this.dataTableService = new DataTableService();
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    /* Data load will be triggered in two cases:
    - when a pagination event occurs => this.paginator.page
    - when a sort event occurs => this.sort.sortChange
    **/
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadItems();
        })
      )
      .subscribe(data => {
        console.log(data)
      });

    // Init DataSource
    this.dataSource = new DataTableDataSource(this.dataTableService);
    // First load
    this.loadItems(true);
  }

  /**
   * Load items
   *
   * @param firstLoad: boolean
   */
  loadItems(firstLoad: boolean = false) {
    const queryParams = new QueryParamsModel({},
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      firstLoad ? 6 : this.paginator.pageSize
    );
    this.dataSource.loadItems(queryParams);
    this.selection.clear();
  }

  /* UI */

  /**
   * Returns item status
   *
   * @param status: number
   */
  getItemStatusString(status: number = 0): string {
    switch (status) {
      case 0:
        return 'Selling';
      case 1:
        return 'Sold';
    }
    return '';
  }

  /**
   * Returens item CSS Class Name by status
   *
   * @param status: number
   */
  getItemCssClassByStatus(status: number = 0): string {
    switch (status) {
      case 0:
        return 'success';
      case 1:
        return 'info';
    }
    return '';
  }

  /**
   * Returns item condition
   *
   * @param condition: number
   */
  getItemConditionString(condition: number = 0): string {
    switch (condition) {
      case 0:
        return 'New';
      case 1:
        return 'Used';
    }
    return '';
  }

  /**
   * Returns CSS Class name by condition
   *
   * @param condition: number
   */
  getItemCssClassByCondition(condition: number = 0): string {
    switch (condition) {
      case 0:
        return 'success';
      case 1:
        return 'info';
    }
    return '';
  }
}
