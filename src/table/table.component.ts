import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
data = Array.from({ length: 30 }).map((_, i) => ({
    name: 'User ' + i,
    date: new Date(),
    category: 'A',
    amount: Math.floor(Math.random() * 1000),
    status: 'Active'
  }));

  searchText = '';

  get filteredData() {
    return this.data.filter(d =>
      d.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
