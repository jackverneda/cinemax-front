import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmountCollectedRoutingModule } from './amount-collected-routing.module';
import { AmountCollectedComponent } from './amount-collected.component';
// import { FilterCommonReportModule } from '../common/filter-common-report/filter-common-report.module';
import { BarGraphsAmountCollectedComponent } from './bar-graphs-amount-collected/bar-graphs-amount-collected.component';
import { SignificantDataModule } from '../common/significant-data/significant-data.module';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialUtilsModule } from '../../shared/material-utils/material-utils.module';

@NgModule({
  declarations: [AmountCollectedComponent, BarGraphsAmountCollectedComponent],
  imports: [
    CommonModule,
    AmountCollectedRoutingModule,
    MaterialUtilsModule,
    // FilterCommonReportModule,
    SignificantDataModule,
    BaseChartDirective,
  ],
})
export class AmountCollectedModule {}
