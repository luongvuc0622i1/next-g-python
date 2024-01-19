import { Component } from '@angular/core';
import { TransferService } from './service/transfer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showModal: boolean = false;

  constructor(private transferService: TransferService) {}

  ngOnInit() {
    this.transferService.sharedData$.subscribe((data) => {
      this.showModal = data.showModal;
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleClose(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.modal-content')) {
      this.showModal = false;
    }
  }
}
