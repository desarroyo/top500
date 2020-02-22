import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { BANKS, Bank } from './demo-data';
import { MatSelect } from '@angular/material/select';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


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

  innerWidth: number;

  customersObservable: Observable<any>;
  data_totales;
  data_crecimientos;
  currentYear: number;


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
      this.getTotalesChart(year)

      let paises = [];
      for (let c = 0; c < this.data_totales.columns.length; c++) {
        paises.push({ id: c, name: c == 0 ? 'Top 10' : this.data_totales.columns[c] });
      }

      console.log(paises);
      this.banks = paises;
      this.initPaisesCombo(this.banks)


    })
  }

  getTotalesChart(year: number) {



    if (year < 0 || year > this.data_totales.index.length - 1) {
      return;
    }

    this.currentYear = year;
    console.log(this.currentYear)

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


  getCrecimientos(country: String) {

    if (country && country != 'Top 10') {
      return this.appService.getCrecimiento(country).subscribe((data: {}) => {
        this.data_crecimientos = data;

        console.log('crecimientos');
        console.log(this.data_crecimientos);

        let year = this.data_crecimientos.index.length - 1;


        for (let index = 0; index < this.data_crecimientos.index.length; index++) {
          const year = this.data_crecimientos.index[index];
          this.data_crecimientos.data[index].unshift(year);

        }



        this.data_crecimientos.columns.unshift('Año');

        this.getTotalesCrecimiento(year);


       

      })
    } else
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

        this.getTotalesCrecimiento(year);

      })
  }


  getTotalesCrecimiento(year: number) {

    this.currentYear = year;
    console.log(this.currentYear)
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

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    //this.initPaisesCombo(this.banks);

    this.getTotales();
    this.getCrecimientos(null);



  }
  initPaisesCombo(array: any) {

    console.log('array');
    console.log(array);
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
    console.log(this.bankCtrl.value.name);
    this.getCrecimientos(this.bankCtrl.value.name);
  }

}
