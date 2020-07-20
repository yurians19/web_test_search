import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { DataSearchService } from '../../services/data-search.service';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Elements } from '../../models/elements.model';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-data-search',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.scss']
})
export class DataSearchComponent implements OnInit {
  elements = [];
  searchFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  displayedColumns: string[] = ['name', 'entity', 'serviceOrigin'];
  dataSource = new ElementsDataSource(this.dataService);
  // dataSource = new MatTableDataSource(this.elements);
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dataService: DataSearchService) { }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  GetSearch() {
    //
  }
}

export class ElementsDataSource extends DataSource<any> {
  searchFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private dataService: DataSearchService) {
    super();
  }
  connect(): Observable<Elements[]> {
    return this.dataService.sendGetRequest({term:'Newton'/* this.searchFormControl.value */});
  }
  disconnect() {}
}

