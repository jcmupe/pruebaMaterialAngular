import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TablePruebaDataSource, TablePruebaItem } from './table-prueba-datasource';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-prueba',
  templateUrl: './table-prueba.component.html',
  styleUrls: ['./table-prueba.component.css']
})
export class TablePruebaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TablePruebaItem>;
  dataSource: TablePruebaDataSource;

  @ViewChild('idselect') idselect: any;
  toppings = new FormControl();
  toppingList: string[] = [''];
  selected: string[] = this.toppingList.filter((item, i) => i % 2 === 0);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new TablePruebaDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.mockGetProfile().subscribe(data => {
      this.toppingList = data;
      if (this.toppingList[0] != '-')
      this.idselect.open();
    });
    
    
  }

  traerDatos():Observable<string[]> {
    return new Observable((observer) => {
      const valores: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
      return observer.next(valores);
  });
}

mockGetProfile():Observable<string[]>{
  const response: string[] = ['Extra cheese1', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  let obs = new Observable<string[]>((subscriber) => {
      setTimeout(()=>{
          subscriber.next(response);
          subscriber.complete();
      }, 5000);
  });
  return obs;
}

}
