// Angular
import {
  CollectionViewer,
  DataSource
} from '@angular/cdk/collections';
// RxJS
import {
  Observable,
  BehaviorSubject,
  of
} from 'rxjs';
import {
  catchError,
  finalize,
  tap
} from 'rxjs/operators';



export class QueryResultsModel {
  // fields
  items: any[];
  totalCount: number;
  errorMessage: string;

  constructor(_items: any[] = [], _totalCount: number = 0, _errorMessage: string = '') {
    this.items = _items;
    this.totalCount = _totalCount;
  }
}


export class QueryParamsModel {
  // fields
  filter: any;
  sortOrder: string; // asc || desc
  sortField: string;
  pageNumber: number;
  pageSize: number;

  // constructor overrides
  constructor(_filter: any,
    _sortOrder: string = 'asc',
    _sortField: string = '',
    _pageNumber: number = 0,
    _pageSize: number = 10) {
    this.filter = _filter;
    this.sortOrder = _sortOrder;
    this.sortField = _sortField;
    this.pageNumber = _pageNumber;
    this.pageSize = _pageSize;
  }
}

export class DataTableItemModel {
  id: number;
  cModel: string;
  cManufacture: string;
  cModelYear: number;
  cMileage: number;
  cDescription: string;
  cColor: string;
  cPrice: number;
  cCondition: number;
  cStatus: number;
  cVINCode: string;
}


export class DataTableService {
  testData = [{
      id: 1,
      name: 'test'
    },
    {
      id: 2,
      name: 'find'
    }

  ];


  getAllItems() {
    return of(this.testData);
  }

}



export class HttpExtenstionsModel {

  /**
   * Filtration with sorting
   * First do Sort then filter
   *
   * @param _entities: any[]
   * @param _queryParams: QueryParamsModel
   * @param _filtrationFields: string[]
   */
  baseFilter(_entities: any[], _queryParams: QueryParamsModel, _filtrationFields: string[] = []): QueryResultsModel {
    // Filtration
    let entitiesResult = this.searchInArray(_entities, _queryParams.filter, _filtrationFields);

    // Sorting
    // start
    if (_queryParams.sortField) {
      entitiesResult = this.sortArray(entitiesResult, _queryParams.sortField, _queryParams.sortOrder);
    }
    // end

    // Paginator
    // start
    const totalCount = entitiesResult.length;
    const initialPos = _queryParams.pageNumber * _queryParams.pageSize;
    entitiesResult = entitiesResult.slice(initialPos, initialPos + _queryParams.pageSize);
    // end

    const queryResults = new QueryResultsModel();
    queryResults.items = entitiesResult;
    queryResults.totalCount = totalCount;
    return queryResults;
  }

  /**
   * Sort array by field name and order-type
   * @param _incomingArray: any[]
   * @param _sortField: string
   * @param _sortOrder: string
   */
  sortArray(_incomingArray: any[], _sortField: string = '', _sortOrder: string = 'asc'): any[] {
    if (!_sortField) {
      return _incomingArray;
    }

    let result: any[] = [];
    result = _incomingArray.sort((a, b) => {
      if (a[_sortField] < b[_sortField]) {
        return _sortOrder === 'asc' ? -1 : 1;
      }

      if (a[_sortField] > b[_sortField]) {
        return _sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });
    return result;
  }

  /**
   * Filter array by some fields
   *
   * @param _incomingArray: any[]
   * @param _queryObj: any
   * @param _filtrationFields: string[]
   */
  searchInArray(_incomingArray: any[], _queryObj: any, _filtrationFields: string[] = []): any[] {
    const result: any[] = [];
    let resultBuffer: any[] = [];
    const indexes: number[] = [];
    let firstIndexes: number[] = [];
    let doSearch: boolean = false;

    _filtrationFields.forEach(item => {
      if (item in _queryObj) {
        _incomingArray.forEach((element, index) => {
          if (element[item] === _queryObj[item]) {
            firstIndexes.push(index);
          }
        });
        firstIndexes.forEach(element => {
          resultBuffer.push(_incomingArray[element]);
        });
        _incomingArray = resultBuffer.slice(0);
        resultBuffer = [].slice(0);
        firstIndexes = [].slice(0);
      }
    });

    Object.keys(_queryObj).forEach(key => {
      const searchText = _queryObj[key].toString().trim().toLowerCase();
      if (key && !_filtrationFields.some(e => e === key) && searchText) {
        doSearch = true;
        try {
          _incomingArray.forEach((element, index) => {
            if (element[key]) {
              const _val = element[key].toString().trim().toLowerCase();
              if (_val.indexOf(searchText) > -1 && indexes.indexOf(index) === -1) {
                indexes.push(index);
              }
            }
          });
        } catch (ex) {
          console.log(ex, key, searchText);
        }
      }
    });

    if (!doSearch) {
      return _incomingArray;
    }

    indexes.forEach(re => {
      result.push(_incomingArray[re]);
    });

    return result;
  }
}

export class DataTableDataSource implements DataSource < DataTableItemModel > {
  // Public properties
  entitySubject = new BehaviorSubject < any[] > ([]);
  hasItems: boolean = false; // Need to show message: 'No records found

  // Loading | Progress bar
  loadingSubject = new BehaviorSubject < boolean > (false);
  loading$: Observable < boolean > ;

  // Paginator | Paginators count
  paginatorTotalSubject = new BehaviorSubject < number > (0);
  paginatorTotal$: Observable < number > ;

  /**
   * Data-Source Constructor
   *
   * @param dataTableService: DataTableService
   */
  constructor(private dataTableService: DataTableService) {
    this.loading$ = this.loadingSubject.asObservable();
    this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
    this.paginatorTotal$.subscribe(res => this.hasItems = res > 0);
  }

  /**
   * Connect data-source
   *
   * @param collectionViewer: CollectionViewer
   */
  connect(collectionViewer: CollectionViewer): Observable < any[] > {
    // Connecting data source
    return this.entitySubject.asObservable();
  }

  /**
   * Disconnect data-source
   *
   * @param collectionViewer: CollectionViewer
   */
  disconnect(collectionViewer: CollectionViewer): void {
    // Disonnecting data source
    this.entitySubject.complete();
    this.loadingSubject.complete();
    this.paginatorTotalSubject.complete();
  }

  baseFilter(_entities: any[], _queryParams: QueryParamsModel): QueryResultsModel {
    let entitiesResult = _entities;

    // Sorting
    // start
    if (_queryParams.sortField) {
      entitiesResult = this.sortArray(_entities, _queryParams.sortField, _queryParams.sortOrder);
    }
    // end

    // Paginator
    // start
    const totalCount = entitiesResult.length;
    const initialPos = _queryParams.pageNumber * _queryParams.pageSize;
    entitiesResult = entitiesResult.slice(initialPos, initialPos + _queryParams.pageSize);
    // end

    const queryResults = new QueryResultsModel();
    queryResults.items = entitiesResult;
    queryResults.totalCount = totalCount;
    return queryResults;
  }

  loadItems(queryParams: QueryParamsModel) {
    this.loadingSubject.next(true);
    this.dataTableService.getAllItems().pipe(
      tap(res => {
        const result = this.baseFilter(res, queryParams);
        this.entitySubject.next(result.items);
        this.paginatorTotalSubject.next(result.totalCount);

      }),
      catchError(err => of (new QueryResultsModel([], err))),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe();
  }

  sortArray(_incomingArray: any[], _sortField: string = '', _sortOrder: string = 'asc'): any[] {
    const httpExtenstion = new HttpExtenstionsModel();
    return httpExtenstion.sortArray(_incomingArray, _sortField, _sortOrder);
  }
}
