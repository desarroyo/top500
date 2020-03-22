import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GoogleChartsModule } from 'angular-google-charts';


import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { DebounceClickDirective } from './debounce-click.directive';

import { BlockUIModule } from 'ng-block-ui';





@NgModule({
  declarations: [
    AppComponent,
    DebounceClickDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    GoogleChartsModule.forRoot(),
    BlockUIModule.forRoot(),

    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,

    HttpClientModule,


  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
