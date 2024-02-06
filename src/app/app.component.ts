import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferService } from './service/transfer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showModal: boolean = false;
  showModalConfig: boolean = false;
  showModalSignin: boolean = false;
  showModalSignup: boolean = false;
  showModalNewPassword: boolean = false;

  constructor(private transferService: TransferService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const password = params['password'];
      if (email && password) {
        this.showModal = true;
        this.showModalNewPassword = true;
      }
    });
    this.transferService.sharedData$.subscribe((data) => {
      this.showModal = data.showModal;
      this.showModalConfig = data.showModal;
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.showModalConfig = false;
    this.showModalSignin = false;
    this.showModalSignup = false;
    this.showModalNewPassword = false;
  }

  handleClose(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.modal-content')) {
      this.showModal = false;
      this.showModalConfig = false;
      this.showModalSignin = false;
      this.showModalSignup = false;
      this.showModalNewPassword = false;
    }
  }

  openModalSignin(): void {
    this.showModal = true;
    this.showModalSignin = true;
  }

  openModalSignup(): void {
    this.showModal = true;
    this.showModalSignup = true;
  }
}
