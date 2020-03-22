import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { BANKS, Bank } from './demo-data';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BlockUI, NgBlockUI } from 'ng-block-ui';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @BlockUI('block-top-50') blockContent: NgBlockUI;
  @BlockUI('block-crecimiento') blockCrecimiento: NgBlockUI;
  @BlockUI('block-continente') blockContinente: NgBlockUI;
  @BlockUI('block-country') blockCountries: NgBlockUI;

  @BlockUI('block-os') blockOs: NgBlockUI;
  @BlockUI('block-manufacturer') blockManufacturer: NgBlockUI;
  @BlockUI('block-architecture') blockArchitecture: NgBlockUI;
  @BlockUI('block-processor') blockProcessor: NgBlockUI;
  @BlockUI('block-mhz') blockMhz: NgBlockUI;
  @BlockUI('block-rmax') blockRmax: NgBlockUI;


  /** list of banks */
  public banks: Bank[];

  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  @ViewChild('divToMeasure') divToMeasureElement: ElementRef;

  chart1;
  lineChart1;
  mapChartPais;
  mapChartContinentes;

  osChart;
  data_os;
  currentYearOs: number;

  manufacturerChart;
  data_manufacturer;
  currentYearManufacturer: number;

  architectureChart;
  data_architecture;
  currentYearArchitecture: number;

  processorChart;
  data_processor;
  currentYearProcessor: number;

  mhzChart;
  data_mhz;
  currentYearMhz: number;

  rmaxChart;
  data_rmax;
  currentYearRmax: number;


  innerWidth: number;

  customersObservable: Observable<any>;
  data_totales;
  data_crecimientos;
  data_continentes;
  data_countries;

  currentYear: number;
  currentYearCont: number;
  currentYearCountryCont: number;




  constructor(public appService: AppService, private _snackBar: MatSnackBar) { }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }


  
getOs() {
  return this.appService.getOs().subscribe((data: {}) => {
    this.data_os = data;
    this.data_os = this.data_os.data;


    let currentYearOs = this.data_os.length - 1;
    this.getOsChart(currentYearOs)


  })
}

getOsChart(year: number) {

  if (year < 0 || year > this.data_os.length - 1) {
    return;
  }

  this.currentYearOs = year;

  let chart_data = this.data_os[year].data


  this.osChart = {
    title: this.data_os[year].year,
    subtitle: "ok",
    type: "BarChart",
    data: chart_data,
    columnNames: ['Os', 'Total'],
    options: {
      titleTextStyle: {
        fontSize: 30,
        bold: true
      },
      is3D: true,
      animation: {
        duration: 300,
        easing: 'out',
        startup: true
      },
    }
  }

}



clickOsPlay() {
  (async () => {


    for (let y = 0; y < this.data_os.length; y++) {
      this.getOsChart(y);


      await this.delay(1000);
      // Do something after


    }

  })();

}

getManufacturer() {
  return this.appService.getManufacturer().subscribe((data: {}) => {
    this.data_manufacturer = data;
    this.data_manufacturer = this.data_manufacturer.data;


    let currentYearManufacturer = this.data_manufacturer.length - 1;
    this.getManufacturerChart(currentYearManufacturer)


  })
}

getManufacturerChart(year: number) {

  if (year < 0 || year > this.data_manufacturer.length - 1) {
    return;
  }

  this.currentYearManufacturer = year;

  let chart_data = this.data_manufacturer[year].data


  this.manufacturerChart = {
    title: this.data_manufacturer[year].year,
    subtitle: "ok",
    type: "BarChart",
    data: chart_data,
    columnNames: ['Manufacturer', 'Total'],
    options: {
      titleTextStyle: {
        fontSize: 30,
        bold: true
      },
      is3D: true,
      animation: {
        duration: 300,
        easing: 'out',
        startup: true
      },
    }
  }

}



clickManufacturerPlay() {
  (async () => {


    for (let y = 0; y < this.data_manufacturer.length; y++) {
      this.getManufacturerChart(y);


      await this.delay(1000);
      // Do something after


    }

  })();

}

getArchitecture() {
  return this.appService.getArchitecture().subscribe((data: {}) => {
    this.data_architecture = data;
    this.data_architecture = this.data_architecture.data;


    let currentYearArchitecture = this.data_architecture.length - 1;
    this.getArchitectureChart(currentYearArchitecture)


  })
}

getArchitectureChart(year: number) {

  if (year < 0 || year > this.data_architecture.length - 1) {
    return;
  }

  this.currentYearArchitecture = year;

  let chart_data = this.data_architecture[year].data


  this.architectureChart = {
    title: this.data_architecture[year].year,
    subtitle: "ok",
    type: "BarChart",
    data: chart_data,
    columnNames: ['Architecture', 'Total'],
    options: {
      titleTextStyle: {
        fontSize: 30,
        bold: true
      },
      is3D: true,
      animation: {
        duration: 300,
        easing: 'out',
        startup: true
      },
    }
  }

}



clickArchitecturePlay() {
  (async () => {


    for (let y = 0; y < this.data_architecture.length; y++) {
      this.getArchitectureChart(y);


      await this.delay(1000);
      // Do something after


    }

  })();

}

getProcessor() {
  return this.appService.getProcessor().subscribe((data: {}) => {
    this.data_processor = data;
    this.data_processor = this.data_processor.data;


    let currentYearProcessor = this.data_processor.length - 1;
    this.getProcessorChart(currentYearProcessor)


  })
}

getProcessorChart(year: number) {

  if (year < 0 || year > this.data_processor.length - 1) {
    return;
  }

  this.currentYearProcessor = year;

  let chart_data = this.data_processor[year].data


  this.processorChart = {
    title: this.data_processor[year].year,
    subtitle: "ok",
    type: "BarChart",
    data: chart_data,
    columnNames: ['Processor', 'Total'],
    options: {
      titleTextStyle: {
        fontSize: 30,
        bold: true
      },
      is3D: true,
      animation: {
        duration: 300,
        easing: 'out',
        startup: true
      },
    }
  }

}



clickProcessorPlay() {
  (async () => {


    for (let y = 0; y < this.data_processor.length; y++) {
      this.getProcessorChart(y);


      await this.delay(1000);
      // Do something after


    }

  })();

}

getMhz() {
  return this.appService.getMhz().subscribe((data: {}) => {
    this.data_mhz = data;
    this.data_mhz = this.data_mhz.data;


    let currentYearMhz = this.data_mhz.length - 1;
    this.getMhzChart(currentYearMhz)


  })
}

getMhzChart(year: number) {

  if (year < 0 || year > this.data_mhz.length - 1) {
    return;
  }

  this.currentYearMhz = year;

  let chart_data = this.data_mhz[year].data


  this.mhzChart = {
    title: this.data_mhz[year].year,
    subtitle: "ok",
    type: "BarChart",
    data: chart_data,
    columnNames: ['Mhz', 'Total'],
    options: {
      titleTextStyle: {
        fontSize: 30,
        bold: true
      },
      is3D: true,
      animation: {
        duration: 300,
        easing: 'out',
        startup: true
      },
    }
  }

}



clickMhzPlay() {
  (async () => {


    for (let y = 0; y < this.data_mhz.length; y++) {
      this.getMhzChart(y);


      await this.delay(1000);
      // Do something after


    }

  })();

}

getRmax() {
  return this.appService.getRmax().subscribe((data: {}) => {
    this.data_rmax = data;
    this.data_rmax = this.data_rmax.data;


    let currentYearRmax = this.data_rmax.length - 1;
    this.getRmaxChart(currentYearRmax)


  })
}

getRmaxChart(year: number) {

  if (year < 0 || year > this.data_rmax.length - 1) {
    return;
  }

  this.currentYearRmax = year;

  let chart_data = this.data_rmax[year].data


  this.rmaxChart = {
    title: this.data_rmax[year].year,
    subtitle: "ok",
    type: "BarChart",
    data: chart_data,
    columnNames: ['Rmax', 'Total'],
    options: {
      titleTextStyle: {
        fontSize: 30,
        bold: true
      },
      is3D: true,
      animation: {
        duration: 300,
        easing: 'out',
        startup: true
      },
    }
  }

}



clickRmaxPlay() {
  (async () => {


    for (let y = 0; y < this.data_rmax.length; y++) {
      this.getRmaxChart(y);


      await this.delay(1000);
      // Do something after


    }

  })();

}


  // Get Data
  getTotales() {
    return this.appService.getTotales().subscribe((data: {}) => {
      this.data_totales = data;


      let year = this.data_totales.index.length - 1;
      this.getTotalesChart(year)

      let paises = [];
      for (let c = 0; c < this.data_totales.columns.length; c++) {
        paises.push({ id: c, name: c == 0 ? 'Top 10' : this.data_totales.columns[c] });
      }

      this.banks = paises;
      this.initPaisesCombo(this.banks)


    })
  }

  getTotalesChart(year: number) {



    if (year < 0 || year > this.data_totales.index.length - 1) {
      return;
    }

    this.currentYear = year;

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
      type: "BarChart",
      data: sorrtedArray,
      columnNames: ['País', 'Total'],
      options: {
        titleTextStyle: {
          fontSize: 30,
          bold: true
        },
        is3D: true,
        animation: {
          duration: 300,
          easing: 'out',
          startup: true
        },
      }
    }

  }


  clickTotalesPlay() {
    (async () => {


      for (let y = 0; y < this.data_totales.index.length; y++) {
        this.getTotalesChart(y);


        await this.delay(1000);
        // Do something after


      }

    })();

  }

  clickContinentesPlay() {
    (async () => {


      for (let y = 0; y < this.data_continentes.length; y++) {
        this.getContinentesByYear(y);


        await this.delay(1000);
        // Do something after


      }

    })();

  }

  clickCountriesPlay() {
    (async () => {


      for (let y = 0; y < this.data_countries.length; y++) {
        this.getCountriesByYear(y);


        await this.delay(1000);
        // Do something after


      }

    })();

  }

  getContinentes() {


    this.blockContinente.start();
    try {


      return this.appService.getContinentes().subscribe((data: {}) => {
        this.data_continentes = data;
        this.data_continentes = this.data_continentes.data;


        this.currentYearCont = this.data_continentes.length - 1
        this.getContinentesByYear(this.currentYearCont);
        this.blockContinente.stop()

      }, err => {
        this.blockContinente.stop();
        this.openSnackBar('Problemas con el servidor', 'OK');
      })



    } catch (error) {
      this.blockContinente.stop()
      this.openSnackBar('Problemas con el servidor', 'OK');
    }
  }

  getCountries() {


    this.blockCountries.start();
    try {


      return this.appService.getCountries().subscribe((data: {}) => {
        this.data_countries = data;
        this.data_countries = this.data_countries.data;


        this.currentYearCont = this.data_countries.length - 1
        this.getCountriesByYear(this.currentYearCont);
        this.blockCountries.stop()

      }, err => {
        this.blockCountries.stop();
        this.openSnackBar('Problemas con el servidor', 'OK');
      })



    } catch (error) {
      this.blockCountries.stop()
      this.openSnackBar('Problemas con el servidor', 'OK');
    }
  }


  getCrecimientos(country: String) {


    this.blockCrecimiento.start();
    try {


      if (country && country != 'Top 10') {
        return this.appService.getCrecimiento(country).subscribe((data: {}) => {
          this.data_crecimientos = data;


          let year = this.data_crecimientos.index.length - 1;


          for (let index = 0; index < this.data_crecimientos.index.length; index++) {
            const year = this.data_crecimientos.index[index];
            this.data_crecimientos.data[index].unshift(year);

          }



          this.data_crecimientos.columns.unshift('Año');

          this.getTotalesCrecimiento(year);
          this.blockCrecimiento.stop()

        }, err => {
          this.blockCrecimiento.stop();
          this.openSnackBar('Problemas con el servidor', 'OK');
        })
      } else
        return this.appService.getCrecimientos().subscribe((data: {}) => {
          this.data_crecimientos = data;


          let year = this.data_crecimientos.index.length - 1;


          for (let index = 0; index < this.data_crecimientos.index.length; index++) {
            const year = this.data_crecimientos.index[index];
            this.data_crecimientos.data[index].unshift(year);

          }



          this.data_crecimientos.columns.unshift('Año');

          this.getTotalesCrecimiento(year);
          this.blockCrecimiento.stop()

        }, err => {
          this.blockCrecimiento.stop();
          this.openSnackBar('Problemas con el servidor', 'OK');
        })



    } catch (error) {
      this.blockCrecimiento.stop()
      this.openSnackBar('Problemas con el servidor', 'OK');
    }
  }


  getTotalesCrecimiento(year: number) {

    this.currentYear = year;
    this.lineChart1 = {
      title: "Top500",
      type: "Line",
      data: this.data_crecimientos.data,
      columnNames: this.data_crecimientos.columns,
      options: {
        chart: {
          title: 'Crecimiento al ' + this.data_crecimientos.index[this.currentYear],
          subtitle: '% de crecimiento',
          animation: {
            duration: 1000,
            easing: 'out',
          },
        },
        curveType: 'function',
        legend: { position: 'bottom' },

      }
    }

  }

  getContinentesByYear(pos: number) {

    try {


      this.currentYearCont = pos;

      this.mapChartContinentes = {
        title: this.data_continentes[pos].year,
        type: "GeoChart",
        columnNames: [
          [{ type: 'string', role: 'data' }],
          [{ type: 'string', role: 'data' }],
          [{ type: 'number', role: 'data' }]
        ],
        data: this.data_continentes[pos].data,
        options: {
          resolution: 'continents',
          backgroundColor: '#ffffff',
          datalessRegionColor: '#ffffff',
          legend: 'none',
          tooltip: {
            isHtml: true,
            textStyle: {
              color: 'black'
            }
          }
        }
      }

    } catch (error) {
      this.currentYearCont = 0;
    }

  }

  getCountriesByYear(pos: number) {

    try {


      this.currentYearCountryCont = pos;

      this.mapChartPais = {
        title: this.data_countries[pos].year,
        type: "GeoChart",
        columnNames: [
          [{ type: 'string', role: 'data' }],
          [{ type: 'number', role: 'data' }]
        ],
        data: this.data_countries[pos].data,
        options: {
          backgroundColor: '#ffffff',
          datalessRegionColor: '#ffffff',
          legend: 'none',
          tooltip: {
            isHtml: true,
            textStyle: {
              color: 'black'
            }
          }
        }
      }

    } catch (error) {
      this.currentYearCountryCont = 0;
    }

  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    //this.initPaisesCombo(this.banks);

    this.getTotales();
    this.getCrecimientos(null);
    this.getContinentes();
    this.getCountries();
    this.getOs();
    this.getManufacturer();
    this.getArchitecture();
    this.getProcessor();
    this.getMhz();
    this.getRmax();



  }
  initPaisesCombo(array: any) {

    // set initial selection
    this.bankCtrl.setValue(array[0]);

    // load the initial bank list
    this.filteredBanks.next(array.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });

    this.setInitialValue();
  }




  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        if (this.singleSelect)
          this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  selectCountry() {
    this.getCrecimientos(this.bankCtrl.value.name);
  }

  click() {
    this.blockContent.start('Loading...');

    setTimeout(() => {
      this.blockContent.stop();
    }, 3500);
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
    });
  }

}
