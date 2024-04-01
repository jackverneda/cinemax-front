import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { MaterialUtilsModule } from './../../../../shared/material-utils/material-utils.module';
import { MadeQueriesRoutingModule } from './made-queries-routing.module';
import { MadeQueriesComponent } from './made-queries.component';
import { FilterCommonReportModule } from '../common/filter-common-report/filter-common-report.module';
import { LineGraphsQueriesComponent } from './line-graphs-queries/line-graphs-queries.component';
import { CubanRegionalMapQueriesComponent } from './cuban-regional-map-queries/cuban-regional-map-queries.component';
import { MapColorByClassModule } from '../../common/pipe/map-color-by-class/map-color-by-class.module';


@NgModule({
  declarations: [
    MadeQueriesComponent,
    LineGraphsQueriesComponent,
    CubanRegionalMapQueriesComponent,
  ],
  imports: [
    CommonModule,
    MadeQueriesRoutingModule,
    FilterCommonReportModule,
    MaterialUtilsModule,
    FlexLayoutModule,
    ChartsModule,
    MapColorByClassModule,
  ]
})
export class MadeQueriesModule { }
