import { MaterialUtilsModule } from './../../../../../shared/material-utils/material-utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCommonReportComponent } from './filter-common-report.component';



@NgModule({
  declarations: [
    FilterCommonReportComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialUtilsModule,
  ],
  exports: [
    FilterCommonReportComponent
  ],
})
export class FilterCommonReportModule { }
