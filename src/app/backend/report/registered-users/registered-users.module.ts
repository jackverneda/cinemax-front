import { MaterialUtilsModule } from './../../../../shared/material-utils/material-utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisteredUsersRoutingModule } from './registered-users-routing.module';
import { RegisteredUsersComponent } from './registered-users.component';
import { AreaGraphsRegisteredUsersComponent } from './area-graphs-registered-users/area-graphs-registered-users.component';
import { FilterCommonReportModule } from '../common/filter-common-report/filter-common-report.module';
import { SignificantDataModule } from '../common/significant-data/significant-data.module';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [RegisteredUsersComponent, AreaGraphsRegisteredUsersComponent],
  imports: [
    CommonModule,
    RegisteredUsersRoutingModule,
    FlexLayoutModule,
    MaterialUtilsModule,
    FilterCommonReportModule,
    SignificantDataModule,
    ChartsModule,
  ]
})
export class RegisteredUsersModule { }
