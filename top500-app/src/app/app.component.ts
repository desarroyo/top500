import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('divToMeasure') divToMeasureElement: ElementRef;

  chart1;
  lineChart1;

  innerWidth: number;

  customersObservable: Observable<any>;
  data_totales;
  data_crecimientos;


  constructor(public appService: AppService) { }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }


  // Get Data
  getTotales() {
    return this.appService.getTotales().subscribe((data: {}) => {
      this.data_totales = data;

      console.log('totales');
      console.log(this.data_totales);

      let year = this.data_totales.index.length - 1;
      //this.title_pie = this.data_totales.index[year];

      let chart_data = []

      for (let i = 0; i < this.data_totales.columns.length; i++) {

        chart_data.push([this.data_totales.columns[i], this.data_totales.data[year][i]]);
      }

      var sorrtedArray: any = chart_data.sort((n1, n2) => {
        if (n1[1] > n2[1]) {
          return -1;
        }

        if (n1[1] < n2[1]) {
          return 1;
        }

        return 0;
      });

      sorrtedArray = sorrtedArray.slice(0, 10);


      this.chart1 = {
        title: this.data_totales.index[year],
        subtitle: "ok",
        type: "PieChart",
        data: sorrtedArray,
        columnNames: ['País', 'Total'],
        options: {
          is3D: true,
          animation: {
            duration: 300,
            easing: 'out',
            startup: true
          },
        }
      }


    })
  }

  getCrecimientos() {
    return this.appService.getCrecimientos().subscribe((data: {}) => {
      this.data_crecimientos = data;

      console.log('crecimientos');
      console.log(this.data_crecimientos);

      let year = this.data_crecimientos.index.length - 1;

      for (let index = 0; index < this.data_crecimientos.index.length; index++) {
        const year = this.data_crecimientos.index[index];
        this.data_crecimientos.data[index].unshift(year);

      }

      this.data_crecimientos.columns.unshift('Año');


      this.lineChart1 = {
        title: "Top500",
        type: "Line",
        data: this.data_crecimientos.data,
        columnNames: this.data_crecimientos.columns,
        options: {
          chart: {
            title: this.data_crecimientos.index[year],
            subtitle: 'in millions of dollars (USD)',
            animation: {
              duration: 1000,
              easing: 'out',
            },
          },
          curveType: 'function',
          legend: { position: 'bottom' },

        }
      }

    })
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;


    //this.customersObservable = this.httpClient.get<any>("127.0.0.1:3000/customers").do(console.log);
    /*
        console.log(this.json_data.columns[0])
        console.log(this.json_data.data)
        console.log(this.json_data.index)
    */

    this.getTotales();
    this.getCrecimientos();



    /*
 
 
     for (let index = 0; index < this.json_crecimiento.index.length; index++) {
       const year = this.json_crecimiento.index[index];
       this.json_crecimiento.data[index].unshift(year);
 
     }
 
     this.json_crecimiento.columns.unshift('Año');
 
     let y = 0;
     for (let i = 0; i < this.json_data.columns.length; i++) {
 
       this.current_pie_data.push([this.json_data.columns[i], this.json_data.data[y][i]]);
     }
 
 
     console.log(this.current_pie_data)
 */


  }

  clickEvent() {

    // this.chartwidth = 700;
    // this.chart.options.width = this.chartwidth;
    // console.log(this.chart.options.width);


    (async () => {
      // Do something before delay
      console.log('before delay')

      /*
      this.lineChart = {
        title: "Top500",
        type: "Line",
        data: this.json_crecimiento.data,
        columnNames: this.json_crecimiento.columns,
        options: {
          chart: {
            title: this.title2,
            subtitle: 'in millions of dollars (USD)',
            animation: {
              duration: 1000,
              easing: 'out',
            },
          },
          curveType: 'function',
          legend: { position: 'bottom' },

        }
      }

      */


      for (let y = 0; y < this.data_totales.index.length; y++) {

        /*
        this.title_pie = this.json_data.index[y];

        this.current_pie_data = []

        for (let i = 0; i < this.json_data.columns.length; i++) {

          this.current_pie_data.push([this.json_data.columns[i], this.json_data.data[y][i]]);
        }

        var sorrtedArray: any = this.current_pie_data.sort((n1, n2) => {
          if (n1[1] > n2[1]) {
            return -1;
          }

          if (n1[1] < n2[1]) {
            return 1;
          }

          return 0;
        });

        sorrtedArray = sorrtedArray.slice(0, 5);

        console.log(sorrtedArray);

        this.chart.data = sorrtedArray;
        this.chart.columnNames = ['País', 'Total'];
        */

        await this.delay(1000);
        // Do something after





        //   console.log('after delay')
        //   this.ej_valor += 2;
        //   console.log(this.ej_valor);
        //   this.lineChart.options.chart.title = "Año: " + (2000 + i);

        //   this.data2 = [
        //     ['Firefox', 0, 7],
        //     ['IE', 26.8, this.ej_valor],
        //     ['Chrome', -3, 7],
        //     ['Safari', 8.5, -5],
        //     ['Opera', 6.2, 7],
        //     ['Others', 0.7, -3]
        //   ];


        //   this.chart.data = [
        //     ['Firefox', 15.0],
        //     ['IE', 22.8],
        //     ['Chrome', 10.8],
        //     ['Safari', 1.5],
        //     ['Opera', 3.2],
        //     ['Others', 5.7]
        //   ]

      }



    })();


  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
