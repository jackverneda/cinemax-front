import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialUtilsModule } from './../../../../shared/material-utils/material-utils.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReplyTimeRoutingModule } from './reply-time-routing.module';
import { ReplyTimeComponent } from './reply-time.component';
import { BarGrapAvgReplyTimeComponent } from './bar-grap-avg-reply-time/bar-grap-avg-reply-time.component';
import { ChartsModule } from 'ng2-charts';
import { FilterCommonReportModule } from '../common/filter-common-report/filter-common-report.module';
import { DateFormatModule } from '@core/pipes/date-format/date-format.module';


@NgModule({
  declarations: [
    ReplyTimeComponent,
    BarGrapAvgReplyTimeComponent],
  imports: [
    CommonModule,
    ReplyTimeRoutingModule,
    MaterialUtilsModule,
    FlexLayoutModule,
    ChartsModule,
    FilterCommonReportModule,
    DateFormatModule
  ]
})
export class ReplyTimeModule { }
