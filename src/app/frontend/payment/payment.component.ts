import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: 'payment.component.scss',
})
export class PaymentComponent {
  paymentForm!: FormGroup;
  countSeats = 0;
  movie = {
    title: 'Avatar: The Way of Water',
    image: '../../../assets/images/movies/rustin.jpeg',
    logo: '../../../assets/images/movies/avatarlogo.png',
    tags: ['Aventura', 'Ciencia Ficción', 'Epíco'],
    price: 15.99,
    year: 2022,
    room: 'Sala Dolby',
    height: 20,
    width: 10,
    time: '2h 42m',
    desc: `Avatar: The Way of Water es una película estadounidense perteneciente al género de cine épico, ciencia
     ficción y aventura dirigida, producida y coescrita por James Cameron. Es la
    primera de las cuatro secuelas planificadas de su película Avatar. <br /><br />
    Jake Sully y Ney'tiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las
    regiones de Pandora cuando una antigua amenaza reaparece.`,
  };
  roomSeats = [
    [
      { id: 1, status: 'enabled' },
      { id: 2, status: 'enabled' },
      { id: 3, status: 'enabled' },
      { id: 4, status: 'enabled' },
      { id: 5, status: 'enabled' },
      { id: 6, status: 'enabled' },
      { id: 7, status: 'enabled' },
      { id: 8, status: 'enabled' },
      { id: 9, status: 'enabled' },
      { id: 10, status: 'enabled' },
      { id: 11, status: 'enabled' },
      { id: 12, status: 'enabled' },
      { id: 13, status: 'enabled' },
      { id: 14, status: 'enabled' },
      { id: 15, status: 'enabled' },
      { id: 16, status: 'enabled' },
      { id: 17, status: 'enabled' },
      { id: 18, status: 'enabled' },
      { id: 19, status: 'enabled' },
      { id: 20, status: 'enabled' },
    ],
    [
      { id: 21, status: 'enabled' },
      { id: 22, status: 'enabled' },
      { id: 23, status: 'enabled' },
      { id: 24, status: 'enabled' },
      { id: 25, status: 'enabled' },
      { id: 26, status: 'enabled' },
      { id: 27, status: 'enabled' },
      { id: 28, status: 'disabled' },
      { id: 29, status: 'enabled' },
      { id: 30, status: 'enabled' },
      { id: 31, status: 'enabled' },
      { id: 32, status: 'enabled' },
      { id: 33, status: 'enabled' },
      { id: 34, status: 'enabled' },
      { id: 35, status: 'enabled' },
      { id: 36, status: 'enabled' },
      { id: 37, status: 'enabled' },
      { id: 38, status: 'enabled' },
      { id: 39, status: 'disabled' },
      { id: 40, status: 'enabled' },
    ],
    [
      { id: 41, status: 'enabled' },
      { id: 42, status: 'enabled' },
      { id: 43, status: 'enabled' },
      { id: 44, status: 'enabled' },
      { id: 45, status: 'enabled' },
      { id: 46, status: 'enabled' },
      { id: 47, status: 'enabled' },
      { id: 48, status: 'enabled' },
      { id: 49, status: 'enabled' },
      { id: 50, status: 'enabled' },
      { id: 51, status: 'enabled' },
      { id: 52, status: 'disabled' },
      { id: 53, status: 'enabled' },
      { id: 54, status: 'enabled' },
      { id: 55, status: 'enabled' },
      { id: 56, status: 'enabled' },
      { id: 57, status: 'enabled' },
      { id: 58, status: 'enabled' },
      { id: 59, status: 'enabled' },
      { id: 60, status: 'enabled' },
    ],
    [
      { id: 61, status: 'enabled' },
      { id: 62, status: 'enabled' },
      { id: 63, status: 'enabled' },
      { id: 64, status: 'enabled' },
      { id: 65, status: 'enabled' },
      { id: 66, status: 'enabled' },
      { id: 67, status: 'disabled' },
      { id: 68, status: 'enabled' },
      { id: 69, status: 'enabled' },
      { id: 70, status: 'enabled' },
      { id: 71, status: 'enabled' },
      { id: 72, status: 'enabled' },
      { id: 73, status: 'enabled' },
      { id: 74, status: 'enabled' },
      { id: 75, status: 'enabled' },
      { id: 76, status: 'enabled' },
      { id: 77, status: 'enabled' },
      { id: 78, status: 'enabled' },
      { id: 79, status: 'enabled' },
      { id: 80, status: 'enabled' },
    ],
  ];
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.paymentForm = this.fb.group({
      card: [null, [Validators.required]],
      paymentType: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      seats: [null, [Validators.required]],
    });
  }
  onClickSelectSeat() {
    const dialogRef = this.dialog.open(DialogSelectSeat, {
      width: '80vw',
      height: '80vh',
      data: { seats: this.roomSeats },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.paymentForm.controls['seats'].setValue(result.seats);
        this.countSeats = result.count;
      }
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-select-seat',
  templateUrl: 'dialog-select-seat.html',
  // imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class DialogSelectSeat {
  seats: string[] = [];
  matrix: any[] = [];
  selectedSeats = 0;
  constructor(
    public dialogRef: MatDialogRef<DialogSelectSeat>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.matrix = data.seats;
  }
  onSelectSeat(seat: any) {
    if (seat.status === 'selected') {
      seat.status = 'enabled';
      this.selectedSeats--;
    } else if (seat.status === 'enabled') {
      seat.status = 'selected';
      this.selectedSeats++;
    }
  }
  onSave() {
    this.data.seats.forEach((row: any) => {
      this.seats.concat(row.filter((seat: any) => seat.status === 'selected').map((seat: any) => seat.id));
    });
    this.dialogRef.close({
      seats: this.seats,
      count: this.selectedSeats,
    });
  }
}
