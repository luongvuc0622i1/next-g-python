import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-modal-config',
  templateUrl: './modal-config.component.html',
  styleUrls: ['./modal-config.component.css']
})
export class ModalConfigComponent {
  // @ts-ignore
  @Input id: number;
  @Output() refresh = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  formConfiguration: FormGroup = new FormGroup({
    name: new FormControl(),
    url: new FormControl(),
    spider: new FormControl(),
  });
  arr: string[] = ['name', 'url', 'spider'];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    if (!this.id) return;
    this.apiService.getPage(this.id).subscribe(response => {
      this.formConfiguration.patchValue({
        'name': response.name,
        'url': response.url,
        'spider': response.spider_url,
      });
    });
  }

  ngDoCheck(): void {
    this.arr.forEach(element => {
      const inputField = document.getElementById(element) as HTMLInputElement;
      const label = inputField.previousElementSibling as HTMLElement;

      if (this.formConfiguration.value[element] && label) {
        label.classList.add('input-label');
      }
    });
  }

  ngAfterViewInit(): void {
    this.arr.forEach(element => {
      const inputField = document.getElementById(element) as HTMLInputElement;
      const label = inputField.previousElementSibling as HTMLElement;

      inputField.addEventListener('focus', () => {
        if (label) {
          label.classList.add('input-label');
        }
      });

      inputField.addEventListener('blur', () => {
        if (inputField.value === '' && label) {
          label.classList.remove('input-label');
        }
      });
    });
  }

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    this.formConfiguration.patchValue({
      'spider': this.selectedFile.name
    });
  }

  save() {
    const formData: FormData = new FormData();
    formData.append('name', this.formConfiguration.value.name);
    formData.append('url', this.formConfiguration.value.url);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    } else {
      formData.append('file', new Blob(), this.formConfiguration.value.spider);
    }

    if (this.id) {
      this.apiService.update(formData, this.id).subscribe(data => {
        // this.showModalSuccessfully = true;
        this.refresh.emit();
        this.closeModal.emit();
        console.log('dung')
      }, () => {
        // this.showModalFailed = true;
        console.log('sai')
      });
    } else {
      this.apiService.create(formData).subscribe(data => {
        // this.showModalSuccessfully = true;
        this.refresh.emit();
        this.closeModal.emit();
        console.log('dung')
      }, () => {
        // this.showModalFailed = true;
        console.log('sai')
      });
    }
  }

  delete() {
    this.apiService.delete(this.id).subscribe(data => {
      // this.showModalSuccessfully = true;
      this.refresh.emit();
      this.closeModal.emit();
      console.log('dung')
    }, () => {
      // this.showModalFailed = true;
      console.log('sai')
    });
  }
}
