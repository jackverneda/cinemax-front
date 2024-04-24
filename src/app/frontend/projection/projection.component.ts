import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { ProjectionService } from '../core/services/projection.service';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrl: 'projection.component.scss',
})
export class ProjectionComponent implements OnInit {
  form!: FormGroup;
  countSeats = 0;
  today = new Date();
  nextMonth = new Date();
  dateFrame: any[] = [];
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private projectionService: ProjectionService,
  ) {
    this.nextMonth.setMonth(this.today.getMonth() + 1);
    this.form = this.fb.group({
      minPrice: [0],
      maxPrice: [1000],
      initDate: [this.today],
      endDate: [this.nextMonth],
    });

    this.projectionService.getAllFiltered(this.form.value).subscribe((data: any) => {
      this.dateFrame = data;
    });
  }
  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.projectionService.getAllFiltered(this.form.value).subscribe((data: any) => {
        this.dateFrame = data;
      });
    });
  }
}
