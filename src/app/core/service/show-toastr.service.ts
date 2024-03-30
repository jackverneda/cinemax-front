import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ShowToastrService {
  constructor(private toastr: ToastrService) {}

  showError(error: string, secundary?: string, timeout?: number) {
    timeout = timeout ? timeout : 5000;
    secundary = secundary ? secundary : '';

    return this.toastr.error(error, secundary, {
      timeOut: timeout,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }

  showSucces(msj: string, secundary?: string, timeout?: number) {
    timeout = timeout ? timeout : 5000;
    secundary = secundary ? secundary : '';

    // console.log("Entre Aqui");
    return this.toastr.success(msj, secundary, {
      timeOut: timeout,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }

  showInfo(msj: string, secundary?: string, timeout?: number) {
    timeout = timeout ? timeout : 5000;
    secundary = secundary ? secundary : '';

    return this.toastr.info(msj, secundary, {
      timeOut: timeout,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    });
  }
}
