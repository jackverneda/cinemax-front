import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignificantDataComponent } from './significant-data.component';
import { AnalysisAreaGraphComponent } from './analysis-area-graph/analysis-area-graph.component';
import { BaseChartDirective } from 'ng2-charts';
import { MaterialUtilsModule } from '../../../shared/material-utils/material-utils.module';

@NgModule({
  declarations: [SignificantDataComponent, AnalysisAreaGraphComponent],
  imports: [CommonModule, MaterialUtilsModule, BaseChartDirective],
  exports: [SignificantDataComponent, AnalysisAreaGraphComponent],
})
export class SignificantDataModule {}
