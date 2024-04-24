import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { ProjectionService } from '../core/services/projection.service';
import { count } from 'rxjs';
import { TicketsService } from '../core/services/tickets.service';
import { LoggedInUserService } from '../../core/service/logged-in-user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: 'payment.component.scss',
})
export class PaymentComponent {
  paymentForm!: FormGroup;
  countSeats = 0;
  projection: any;
  roomSeats: any;
  stepIndex = 0;
  reservation: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private projectionService: ProjectionService,
    private ticketsService: TicketsService,
  ) {
    this.paymentForm = this.fb.group({
      card: [null, [Validators.required]],
      paymentType: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      seats: [null, [Validators.required]],
    });
    this.activeRoute.params.subscribe((data) => {
      this.onLoadData(data['id']);
    });
  }

  onLoadData(id: string) {
    this.projectionService.get(id).subscribe((data: any) => {
      this.projection = data;
    });
  }

  calcPrice() {
    return this.projection?.price * this.countSeats;
  }

  onPayTicket() {
    this.ticketsService.onCreateTicket({ CreateTicketsRequests: this.reservation }).subscribe(() => {
      this.stepIndex = 1;
    });
  }
  onConfirmPayment() {
    this.ticketsService.onConfirmPayment({ ConfirmTicketsRequests: this.reservation }).subscribe(() => {
      this.stepIndex = 2;
    });
  }

  onClickSelectSeat() {
    this.ticketsService.getByProjections(this.projection.id).subscribe((data: any) => {
      const dialogRef = this.dialog.open(DialogSelectSeat, {
        width: '80vw',
        maxHeight: '80vh',
        data: { seats: data, height: this.projection.room.height, width: this.projection.room.width },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.countSeats = result.count;
          this.paymentForm.controls['seats'].setValue(this.countSeats > 0 ? this.countSeats + ' asientos seleccionados' : null);
          this.reservation = result.seats;
          console.log(this.reservation);
        }
        console.log('The dialog was closed');
      });
    });
  }
}

@Component({
  selector: 'dialog-select-seat',
  templateUrl: 'dialog-select-seat.html',
  // imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class DialogSelectSeat {
  seats: any[] = [];
  matrix: any[] = [];
  selectedSeats = 0;
  constructor(
    public dialogRef: MatDialogRef<DialogSelectSeat>,
    private loggedInUserService: LoggedInUserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.matrix = this.alignMatrix(data.seats, data.height, data.width);
  }
  alignMatrix(data: any, n: number, m: number) {
    let M: any[] = [];
    for (let i = 0; i < n; i++) {
      M.push([]);
      for (let j = 0; j < m; j++) {
        M[i].push(
          data.filter(({ seat }: any) => {
            return seat.row == i && seat.colum == j;
          })[0],
        );
      }
    }
    console.log(M);
    return M;
  }
  onSelectSeat(seat: any) {
    if (seat.ticketStatus === 'selected') {
      seat.ticketStatus = 'available';
      this.selectedSeats--;
    } else if (seat.ticketStatus === 'available') {
      seat.ticketStatus = 'selected';
      this.selectedSeats++;
    }
  }
  onSave() {
    this.matrix.forEach((row: any) => {
      this.seats = this.seats.concat(
        row
          .filter((ticket: any) => {
            return ticket.ticketStatus === 'selected';
          })
          .map((ticket: any) => {
            console.log(ticket);
            return {
              seatid: ticket.seatId,
              projectionid: ticket.projectionId,
              userid: this.loggedInUserService.loggedInUser.id,
            };
          }),
      );
      console.log(this.seats, 'los asientos');
    });
    this.dialogRef.close({
      seats: this.seats,
      count: this.selectedSeats,
    });
  }
}
