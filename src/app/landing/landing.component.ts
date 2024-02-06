import { Component } from '@angular/core';
import { TransferService } from '../service/transfer.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  displayId: number = 0;
  questions: any[] = [
    {
      'title': 'Tôi có thể đăng ký sử dụng như thế nào?',
      'description': 'Hỗ trợ đăng ký tạo tài khoản sử dụng từ email. Chỉ cần nhập email và mật khẩu, chúng tôi sẽ gửi cho bạn một mã xác minh bao gồm 6 chữ số. Nhập 6 chữ số này và thiết lập thông tin để tạo tài khoản sử dụng'
    },
    {
      'title': 'Chi phí sử dụng là bao nhiêu?',
      'description': 'Hỗ trợ đăng ký tạo tài khoản sử dụng từ email. Chỉ cần nhập email và mật khẩu, chúng tôi'
    },
    {
      'title': 'Khi tôi sử dụng có cần mua thiết bị đi kèm không?',
      'description': 'Hỗ trợ đăng ký tạo tài khoản sử dụng từ email. Chỉ cần nhập email và mật khẩu, chúng tôi'
    },
    {
      'title': 'Tôi có thể sử dụng khi mất mạng không?',
      'description': 'Hỗ trợ đăng ký tạo tài khoản sử dụng từ email. Chỉ cần nhập email và mật khẩu, chúng tôi'
    }
  ];

  constructor(private transferService: TransferService) {}

  ngOnInit(): void {
    this.transferService.setShowModal(true);
    this.transferService.setShowModalSignin(true);
  }
}