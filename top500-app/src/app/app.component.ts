import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('divToMeasure') divToMeasureElement: ElementRef;

  title = 'top500-app';
  chartwidth = 300


  ej_valor: number = 5;
  title2 = "2000"

  data2 = [
    ['Firefox', 0, 7],
    ['IE', 26.8, this.ej_valor],
    ['Chrome', -3, 7],
    ['Safari', 8.5, -5],
    ['Opera', 6.2, 7],
    ['Others', 0.7, -3]
  ];

  chart = {
    title: "Top500 2020",
    type: "PieChart",
    data: [
      ['Firefox', 45.0],
      ['IE', 26.8],
      ['Chrome', 12.8],
      ['Safari', 8.5],
      ['Opera', 6.2],
      ['Others', 0.7]
    ],
    columnNames: ['Browser', 'Percentage'],
    options: {
      is3D: true,
    }
  }

  lineChart = {
    title: "Top500 2020",
    type: "Line",
    data: this.data2,
    columnNames: ['Browser', 'Percentage', 'Expenses'],
    options: {
      chart: {
        title: this.title2,
        subtitle: 'in millions of dollars (USD)'
      },
      curveType: 'function',
      legend: { position: 'bottom' },

    }
  }


  clickEvent() {

    // this.chartwidth = 700;
    // this.chart.options.width = this.chartwidth;
    // console.log(this.chart.options.width);

    (async () => {
      // Do something before delay
      console.log('before delay')



      for (let i = 0; i < 3; i++) {
        await this.delay(1000);
        // Do something after
        console.log('after delay')
        this.ej_valor += 2;
        console.log(this.ej_valor);
        this.lineChart.options.chart.title = "Año: " + (2000 + i);

        this.data2 = [
          ['Firefox', 0, 7],
          ['IE', 26.8, this.ej_valor],
          ['Chrome', -3, 7],
          ['Safari', 8.5, -5],
          ['Opera', 6.2, 7],
          ['Others', 0.7, -3]
        ];

      }



    })();


  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
