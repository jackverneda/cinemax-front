import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReportRoutingModule],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ReportModule {}
