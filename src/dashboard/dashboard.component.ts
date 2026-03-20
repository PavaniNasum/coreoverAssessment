import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // ✅ VERY IMPORTANT

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Dropdown
  range = 'month';
  search = '';

  // KPI
  kpis = [
    { title: 'Users', value: 1200, change: 10 },
    { title: 'Revenue', value: '$15K', change: -5 },
    { title: 'Conversion', value: '3.5%', change: 2 }
  ];

  // Chart Data
  lineData: any;
  barData: any;
  pieData: any;

  // Static datasets
  weeklyData = [5, 10, 15, 20, 25, 30, 35];
  monthlyData = [10,20,30,40,50,60,70,80,90,100,110,120];
  yearlyData = [200, 300, 400, 500, 600];

  // Table Data
  data = Array.from({ length: 30 }, (_, i) => ({
    name: 'User ' + i,
    date: new Date(),
    category: ['A','B','C'][i % 3],
    amount: Math.floor(Math.random()*1000),
    status: i % 2 ? 'Active' : 'Inactive'
  }));

  filteredData = [...this.data];

  ngOnInit() {
    this.updateChart();
  }

  // 🔥 Dynamic Chart Update
  updateChart() {

    if (this.range === 'week') {
      this.lineData = {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{ data: this.weeklyData, label: 'Weekly Data' }]
      };

    } else if (this.range === 'month') {
      this.lineData = {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [{ data: this.monthlyData.slice(0,6), label: 'Monthly Data' }]
      };

    } else {
      this.lineData = {
        labels: ['2019','2020','2021','2022','2023'],
        datasets: [{ data: this.yearlyData, label: 'Yearly Data' }]
      };
    }

    // reuse for bar
    this.barData = { ...this.lineData };

    // pie chart
    this.pieData = {
      labels: ['Mobile','Desktop','Tablet'],
      datasets: [{ data: [60,30,10] }]
    };
  }

  // Sort table
  sort(field: string) {
    this.filteredData.sort((a: any, b: any) =>
      a[field] > b[field] ? 1 : -1
    );
  }

  // CSV Export
  exportCSV() {
    const csv = this.filteredData.map(d =>
      `${d.name},${d.date},${d.category},${d.amount},${d.status}`
    ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.csv';
    a.click();
  }
}