import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterCommonReportModule } from './../common/filter-common-report/filter-common-report.module';
import { MaterialUtilsModule } from './../../../../shared/material-utils/material-utils.module';
import { AnswerQualityRoutingModule } from './answer-quality-routing.module';
import { AnswerQualityComponent } from './answer-quality.component';
import { BarGraphAvgStarsAwardedComponent } from './bar-graph-avg-stars-awarded/bar-graph-avg-stars-awarded.component';
import { ChartsModule } from 'ng2-charts';
import { DateFormatModule } from '@core/pipes/date-format/date-format.module';


@NgModule({
  declarations: [AnswerQualityComponent, BarGraphAvgStarsAwardedComponent],
  imports: [
    CommonModule,
    AnswerQualityRoutingModule,
    FlexLayoutModule,
    MaterialUtilsModule,
    FilterCommonReportModule,
    ChartsModule,
    DateFormatModule
  ]
})
export class AnswerQualityModule { }
