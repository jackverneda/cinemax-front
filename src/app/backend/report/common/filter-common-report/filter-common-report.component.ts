import {FormBuilder, FormGroup} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {ActiveFilterReport} from '@core/model/active-fIlter-report';


@Component({
  selector: 'app-filter-common-report',
  templateUrl: './filter-common-report.component.html',
  styleUrls: ['./filter-common-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterCommonReportComponent implements OnInit, OnChanges {

  public _allUsers: any[];
  public _categories: any[];
  public _subjects: any[];
  public _regions: any[];
  public rangePickerForm: FormGroup;

  @Input() filterView: ActiveFilterReport;

  @Input() set allUsers(v: any[]) {
    if (v) {
      this._allUsers = v;
    }
  }

  @Input() set allCategories(v: any[]) {
    if (v) {
      this._categories = v;
    }
  }

  @Input() set subjects(v: any[]) {
    if (v) {
      this._subjects = v;
    }
  }

  @Input() set provinces(v: any[]) {
    if (v) {
      this._regions = v;

    }
  }

  @Output() eventChangeUser: EventEmitter<any> = new EventEmitter();
  @Output() eventChangeStartDate: EventEmitter<any> = new EventEmitter();
  @Output() eventChangeEndDate: EventEmitter<any> = new EventEmitter();
  @Output() eventEmitCategoryId: EventEmitter<any> = new EventEmitter();
  @Output() eventEmitSubjectId: EventEmitter<any> = new EventEmitter();
  @Output() eventEmitRegion: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private chdref: ChangeDetectorRef
  ) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.chdref.markForCheck();
  }


  ngOnInit(): void {
  }

  private createForm() {
    this.rangePickerForm = this.fb.group(
      {
        formControlStart: [],
        formControlEnd: [],
      }
    );
  }

  public onUserChange(event: any): void {
    this.eventChangeUser.emit(event);
  }

  public changeStartDate(event: any): void {
    this.eventChangeStartDate.emit(event);
  }

  public changeEndDate(event: any): void {
    this.eventChangeEndDate.emit(event);
  }

  public onEventEmit(event: any): void {
    this.eventEmitCategoryId.emit(event);
  }

  public onSubjectIdChange(event: any): void {
    this.eventEmitSubjectId.emit(event);
  }

  public onRegionChange(event: any): void {
    this.eventEmitRegion.emit(event);

  }
}

