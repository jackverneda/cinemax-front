import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialUtilsModule } from './../../../../shared/material-utils/material-utils.module';
import { QueryBySpecialistRoutingModule } from './query-by-specialist-routing.module';
import { QueryBySpecialistComponent } from './query-by-specialist.component';
import { BarGraphsQueryBySpecialistComponent } from './bar-graphs-query-by-specialist/bar-graphs-query-by-specialist.component';
import { FilterCommonReportModule } from '../common/filter-common-report/filter-common-report.module';
import { DateFormatModule } from '@core/pipes/date-format/date-format.module';


@NgModule({
  declarations: [
    QueryBySpecialistComponent,
    BarGraphsQueryBySpecialistComponent
  ],
  imports: [
    CommonModule,
    QueryBySpecialistRoutingModule,
    MaterialUtilsModule,
    FlexLayoutModule,
    ChartsModule,
    FilterCommonReportModule,
    DateFormatModule
  ]
})
export class QueryBySpecialistModule { }
