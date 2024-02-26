import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loading: boolean = true;

  // fullDataOrigin: any[] = [
  //   {
  //     websiteId: 1,
  //     websiteName: '123nhadatviet.com',
  //     websiteDescription: {
  //       url: 'https://chat.openai.com/c/536bf39c-50e6-4ccb-ad0e-f2624cf7014e',
  //       title: 'Bán Nhà Định Công Thượng - 32m2 x 5 Tầng - Giá 3,4 tỷ - LH Tùng Keng',
  //       detail: 'NHỈNH 3 TỶ - NGÕ NÔNG - 2 THOÁNG Phố Định Công Thượng thông sang các phố Kim Giang, Lê Trọng Tấn, Trần Hòa, Vũ Tông Phan rất thuận tiện giao thông...,Vị trí trong ngõ nông rộng thoáng, gần phố, gần chợ, trường học...Nhà 2 mặt phía sau là ngõ mở cửa sổ thoáng nên các phòng đều có ánh sáng tự nhiên.,+ Thiết kế:,- Tầng 1: Phòng khách + Bếp, wc.,- Tầng 2,3,4: Mỗi tầng 1 Phòng, wc,- Tầng 5: Phòng thờ + Sân phơi.,- Sổ đỏ chính chủ- GIá bán: 3,4 tỷNhà giá tốt - Gọi ngay Mr Tùng để được tư vấn và hẹn lịch xem nhà miễn phíMobile: 0961106518Zalo: 0909166681',
  //       price: '3,4 tỷ',
  //       seller_user: 'Seller 1',
  //       seller_phone: '0000.000.000'
  //     }
  //   },
  //   {
  //     websiteId: 2,
  //     websiteName: '123nhadatviet.com',
  //     websiteDescription: {
  //       url: '',
  //       title: 'CẦN BÁN GẤP 53M2 ĐẤT PHỐ BẰNG LIỆT,  CÁCH Ô TÔ 20M, SÁT KĐT LINH ĐÀM',
  //       detail: 'Gia đình có việc cần bán gấp mảnh đất diện tích 53m2, vuông vắnVị trí thửa đất quá đẹp, cách mặt ngõ Bằng A ô tô tránh chỉ 20m.Ngay sát khu đô thị Linh Đàm, chỉ vài bước chân ra chợ, trường học các cấpSổ đỏ chính chủ, vuông vắn, sẵn sàng giao dịchGiá :  3,7 tỷ',
  //       price: '3,7 tỷ',
  //       seller_user: 'Seller 2',
  //       seller_phone: '0000.000.000'
  //     }
  //   },
  //   {
  //     websiteId: 3,
  //     websiteName: '123nhadatviet.com',
  //     websiteDescription: {
  //       url: '',
  //       title: 'BÁN GẤP CĂN CHUNG CƯ BEASKY, 78M2, 3 NGỦ 2 WC, NỘI THẤT ĐẸP',
  //       detail: 'Căn hộ 78m2, thiết kế 3 phòng ngủ, 2 WC cực đẹp. Phòng ngủ nào cũng thoáng sáng ánh nắng tự nhiên, chủ để lại toàn bộ nội thất như hình.Tòa nhà Beasky tọa lạc ngay mặt đường đại lộ Chu Văn An sát ngã tư đường Nguyễn Xiển, liền kề khu đô thị The Manor Central Park. Dưới chân tòa nhà đầy đủ tiện íchSổ đỏ đẹp, sẵn sàng sang tênGiá: 3,9 tỷ (Có thương lượng)Liên hệ: Mr Vương (0986.739.396)',
  //       price: '3,9 tỷ',
  //       seller_user: 'Seller 1',
  //       seller_phone: '0000.000.000'
  //     }
  //   },
  //   {
  //     websiteId: 4,
  //     websiteName: '123nhadatviet.com',
  //     websiteDescription: {
  //       url: '',
  //       title: '⚜️ Bán Nhà Mặt Phố Điện Biên Phủ, Ba Đình, 71m2 4T MT 9m, Chỉ 80 Tỷ ⚜️',
  //       detail: '⚜️ Bán Nhà Mặt Phố Điện Biên Phủ, Ba Đình, 71m2 4T MT 9m, Chỉ 80 Tỷ ⚜️ ⭕️ LH NGAY 0982833366  - 0902223785---------------------------- NHÀ MẶT PHỐ ĐIỆN BIÊN PHỦ, BA ĐÌNH – SIÊU HIẾM - BIỆT THỰ PHÁP CỔ MẶT PHỐ ĐIỆN BIÊN PHỦ - ĐÃ ĐƯỢC LÊN TEM PHIẾU CỦA PHÁP- GIÁ TRỊ LỊCH SỬ CỰC LỚN.. + Phố Điện Biên Phủ Cực hiếm nhà bán, có tiền chưa chắc đã được sở hữu. Đi thẳng đến lăng Bác giao Trần Phú, Lê Duẩn, Nguyễn Tri Phương, Cửa Nam giao quận Ba Đình và Hoàn Kiếm xung quanh toàn di tích lịch sử, Đại Sứ Quán các nước. - Nhà xây 4 tầng kiểu biệt thự Pháp Cổ. Nhà đã được Pháp chụp làm hình ảnh tem phiếu, giá trị lịch sử cao. - Sổ đỏ chính chủ sẵn sàng giao dịch. ---------------------------- 🚀 GIÁ CHỈ: 80 TỶ (ẢNH THẬT-THÔNG TIN THẬT-NHÀ THẬT-GIÁ THẬT)---------------------------- ☎️ Liên hệ ngay (24/7) 0982833366 - 0902223785⚜️ PHƯƠNG NHÀ PHỐ - TPKD FARALAND VIỆT NAM ⚜️♻️ Zalo: 0902223785🌀 FB: facebook.com/nvpbds🌀 YT: youtube.com/@nvpbds(Chuyên mặt phố, biệt thự, nhà ngõ ô tô Hà Nội).Kết nối trực tiếp chủ nhà, giúp ACE mua giá tốt nhấtMiễn phí tư vấn, xem nhà 100%...',
  //       price: '80 tỷ',
  //       seller_user: 'Seller 2',
  //       seller_phone: '0000.000.000'
  //     }
  //   },
  //   {
  //     websiteId: 5,
  //     websiteName: '123nhadatviet.com',
  //     websiteDescription: {
  //       url: '',
  //       title: '🏠 BÁN CCMN TÂN TRIỀU -  7 TẦNG - NGÕ NÔNG - GIÁ CHÀO 6.5 TỶ - LH: HẰNG mini',
  //       detail: '🌟 BÁN TÒA CHUNG CƯ MINI - CƠ HỘI ĐẦU TƯ LỢI NHUẬN CAO 🌟🏡 Tòa CCMN Triều Khúc - TÂN TRIỀU Ngõ Cực Nông - Lúc Nào Cũng Kín Phòng📍 Địa chỉ: TRIỀU KHÚC - TÂN TRIỀU 📐 Diện Tích: 46m2 🏢 Số Tầng: 7 🛌 Số Phòng: 10📈 Doanh Thu: 40 triệu/tháng📜 Pháp Lý: Sổ đỏ, GPXD💰 Giá Chào: 6.5 tỷ - Giá chốt bất ngờ🌐 Vị Trí Đắc Địa:Tọa lạc tại khu vực TRIỀU KHÚC - TÂN TRIỀU, nơi sầm uất, tiện ích đa dạng, giao thông thuận tiện.🏢 Tiện Ích:10 Phòng mới, thoáng đãng, tiện nghi đầy đủ.Doanh thu ổn định mỗi tháng 40 triệu.Ngõ cực nông, an ninh đảm bảo, khu vực kinh doanh sầm uất.📑 Pháp Lý Minh Bạch:Sổ đỏ chính chủ, Giấy phép xây dựng đầy đủ.💸 Giá Cực Sốc:Chỉ 6.5 tỷ - Cơ hội đầu tư lợi nhuận cao.🤝 Liên Hệ Ngay: Ms Hằng Mini - Chuyên Bán Chung Cư MiniCam kết hỗ trợ tận tâm, tư vấn nhiệt tình.Đảm bảo giao dịch an toàn, thuận lợi cho các nhà đầu tư.',
  //       price: '6,5 tỷ',
  //       seller_user: 'Seller 2',
  //       seller_phone: '0000.000.000'
  //     }
  //   },
  //   {
  //     websiteId: 6,
  //     websiteName: '123nhadatviet.com',
  //     websiteDescription: {
  //       url: 'https://chat.openai.com/c/536bf39c-50e6-4ccb-ad0e-f2624cf7014e',
  //       title: 'Bán Nhà Định Công Thượng - 32m2 x 5 Tầng - Giá 3,4 tỷ - LH Tùng Keng',
  //       detail: 'NHỈNH 3 TỶ - NGÕ NÔNG - 2 THOÁNG Phố Định Công Thượng thông sang các phố Kim Giang, Lê Trọng Tấn, Trần Hòa, Vũ Tông Phan rất thuận tiện giao thông...,Vị trí trong ngõ nông rộng thoáng, gần phố, gần chợ, trường học...Nhà 2 mặt phía sau là ngõ mở cửa sổ thoáng nên các phòng đều có ánh sáng tự nhiên.,+ Thiết kế:,- Tầng 1: Phòng khách + Bếp, wc.,- Tầng 2,3,4: Mỗi tầng 1 Phòng, wc,- Tầng 5: Phòng thờ + Sân phơi.,- Sổ đỏ chính chủ- GIá bán: 3,4 tỷNhà giá tốt - Gọi ngay Mr Tùng để được tư vấn và hẹn lịch xem nhà miễn phíMobile: 0961106518Zalo: 0909166681',
  //       price: '3,4 tỷ',
  //       seller_user: 'Seller 1',
  //       seller_phone: '0000.000.000'
  //     }
  //   },
  //   {
  //     websiteId: 7,
  //     websiteName: '123nhadatviet1.com',
  //     websiteDescription: {
  //       url: '',
  //       title: 'CẦN BÁN GẤP 53M2 ĐẤT PHỐ BẰNG LIỆT,  CÁCH Ô TÔ 20M, SÁT KĐT LINH ĐÀM',
  //       detail: 'Gia đình có việc cần bán gấp mảnh đất diện tích 53m2, vuông vắnVị trí thửa đất quá đẹp, cách mặt ngõ Bằng A ô tô tránh chỉ 20m.Ngay sát khu đô thị Linh Đàm, chỉ vài bước chân ra chợ, trường học các cấpSổ đỏ chính chủ, vuông vắn, sẵn sàng giao dịchGiá :  3,7 tỷ',
  //       price: '3,7 tỷ',
  //       seller_user: 'Seller 2',
  //       seller_phone: '0000.000.000'
  //     }
  //   },
  //   {
  //     websiteId: 8,
  //     websiteName: '123nhadatviet.com',
  //     websiteDescription: {
  //       url: '',
  //       title: 'BÁN GẤP CĂN CHUNG CƯ BEASKY, 78M2, 3 NGỦ 2 WC, NỘI THẤT ĐẸP',
  //       detail: 'Căn hộ 78m2, thiết kế 3 phòng ngủ, 2 WC cực đẹp. Phòng ngủ nào cũng thoáng sáng ánh nắng tự nhiên, chủ để lại toàn bộ nội thất như hình.Tòa nhà Beasky tọa lạc ngay mặt đường đại lộ Chu Văn An sát ngã tư đường Nguyễn Xiển, liền kề khu đô thị The Manor Central Park. Dưới chân tòa nhà đầy đủ tiện íchSổ đỏ đẹp, sẵn sàng sang tênGiá: 3,9 tỷ (Có thương lượng)Liên hệ: Mr Vương (0986.739.396)',
  //       price: '3,9 tỷ',
  //       seller_user: 'Seller 1',
  //       seller_phone: '0000.000.000'
  //     }
  //   },
  //   {
  //     websiteId: 9,
  //     websiteName: '123nhadatviet.com',
  //     websiteDescription: {
  //       url: '',
  //       title: '⚜️ Bán Nhà Mặt Phố Điện Biên Phủ, Ba Đình, 71m2 4T MT 9m, Chỉ 80 Tỷ ⚜️',
  //       detail: '⚜️ Bán Nhà Mặt Phố Điện Biên Phủ, Ba Đình, 71m2 4T MT 9m, Chỉ 80 Tỷ ⚜️ ⭕️ LH NGAY 0982833366  - 0902223785---------------------------- NHÀ MẶT PHỐ ĐIỆN BIÊN PHỦ, BA ĐÌNH – SIÊU HIẾM - BIỆT THỰ PHÁP CỔ MẶT PHỐ ĐIỆN BIÊN PHỦ - ĐÃ ĐƯỢC LÊN TEM PHIẾU CỦA PHÁP- GIÁ TRỊ LỊCH SỬ CỰC LỚN.. + Phố Điện Biên Phủ Cực hiếm nhà bán, có tiền chưa chắc đã được sở hữu. Đi thẳng đến lăng Bác giao Trần Phú, Lê Duẩn, Nguyễn Tri Phương, Cửa Nam giao quận Ba Đình và Hoàn Kiếm xung quanh toàn di tích lịch sử, Đại Sứ Quán các nước. - Nhà xây 4 tầng kiểu biệt thự Pháp Cổ. Nhà đã được Pháp chụp làm hình ảnh tem phiếu, giá trị lịch sử cao. - Sổ đỏ chính chủ sẵn sàng giao dịch. ---------------------------- 🚀 GIÁ CHỈ: 80 TỶ (ẢNH THẬT-THÔNG TIN THẬT-NHÀ THẬT-GIÁ THẬT)---------------------------- ☎️ Liên hệ ngay (24/7) 0982833366 - 0902223785⚜️ PHƯƠNG NHÀ PHỐ - TPKD FARALAND VIỆT NAM ⚜️♻️ Zalo: 0902223785🌀 FB: facebook.com/nvpbds🌀 YT: youtube.com/@nvpbds(Chuyên mặt phố, biệt thự, nhà ngõ ô tô Hà Nội).Kết nối trực tiếp chủ nhà, giúp ACE mua giá tốt nhấtMiễn phí tư vấn, xem nhà 100%...',
  //       price: '80 tỷ',
  //       seller_user: 'Seller 2',
  //       seller_phone: '0000.000.000'
  //     }
  //   },
  //   {
  //     websiteId: 10,
  //     websiteName: '123nhadatviet.com',
  //     websiteDescription: {
  //       url: '',
  //       title: '🏠 BÁN CCMN TÂN TRIỀU -  7 TẦNG - NGÕ NÔNG - GIÁ CHÀO 6.5 TỶ - LH: HẰNG mini',
  //       detail: '🌟 BÁN TÒA CHUNG CƯ MINI - CƠ HỘI ĐẦU TƯ LỢI NHUẬN CAO 🌟🏡 Tòa CCMN Triều Khúc - TÂN TRIỀU Ngõ Cực Nông - Lúc Nào Cũng Kín Phòng📍 Địa chỉ: TRIỀU KHÚC - TÂN TRIỀU 📐 Diện Tích: 46m2 🏢 Số Tầng: 7 🛌 Số Phòng: 10📈 Doanh Thu: 40 triệu/tháng📜 Pháp Lý: Sổ đỏ, GPXD💰 Giá Chào: 6.5 tỷ - Giá chốt bất ngờ🌐 Vị Trí Đắc Địa:Tọa lạc tại khu vực TRIỀU KHÚC - TÂN TRIỀU, nơi sầm uất, tiện ích đa dạng, giao thông thuận tiện.🏢 Tiện Ích:10 Phòng mới, thoáng đãng, tiện nghi đầy đủ.Doanh thu ổn định mỗi tháng 40 triệu.Ngõ cực nông, an ninh đảm bảo, khu vực kinh doanh sầm uất.📑 Pháp Lý Minh Bạch:Sổ đỏ chính chủ, Giấy phép xây dựng đầy đủ.💸 Giá Cực Sốc:Chỉ 6.5 tỷ - Cơ hội đầu tư lợi nhuận cao.🤝 Liên Hệ Ngay: Ms Hằng Mini - Chuyên Bán Chung Cư MiniCam kết hỗ trợ tận tâm, tư vấn nhiệt tình.Đảm bảo giao dịch an toàn, thuận lợi cho các nhà đầu tư.',
  //       price: '6,5 tỷ',
  //       seller_user: 'Seller 2',
  //       seller_phone: '0000.000.000'
  //     }
  //   },
  //   {
  //     websiteId: 11,
  //     websiteName: '123nhadatviet1.com',
  //     websiteDescription: {
  //       url: '',
  //       title: 'BÁN CCMN TÂN TRIỀU -  7 TẦNG - NGÕ NÔNG - GIÁ CHÀO 6.5 TỶ - LH: HẰNG mini 1',
  //       detail: '🌟 BÁN TÒA CHUNG CƯ MINI - CƠ HỘI ĐẦU TƯ LỢI NHUẬN CAO 🌟🏡 Tòa CCMN Triều Khúc - TÂN TRIỀU Ngõ Cực Nông - Lúc Nào Cũng Kín Phòng📍 Địa chỉ: TRIỀU KHÚC - TÂN TRIỀU 📐 Diện Tích: 46m2 🏢 Số Tầng: 7 🛌 Số Phòng: 10📈 Doanh Thu: 40 triệu/tháng📜 Pháp Lý: Sổ đỏ, GPXD💰 Giá Chào: 6.5 tỷ - Giá chốt bất ngờ🌐 Vị Trí Đắc Địa:Tọa lạc tại khu vực TRIỀU KHÚC - TÂN TRIỀU, nơi sầm uất, tiện ích đa dạng, giao thông thuận tiện.🏢 Tiện Ích:10 Phòng mới, thoáng đãng, tiện nghi đầy đủ.Doanh thu ổn định mỗi tháng 40 triệu.Ngõ cực nông, an ninh đảm bảo, khu vực kinh doanh sầm uất.📑 Pháp Lý Minh Bạch:Sổ đỏ chính chủ, Giấy phép xây dựng đầy đủ.💸 Giá Cực Sốc:Chỉ 6.5 tỷ - Cơ hội đầu tư lợi nhuận cao.🤝 Liên Hệ Ngay: Ms Hằng Mini - Chuyên Bán Chung Cư MiniCam kết hỗ trợ tận tâm, tư vấn nhiệt tình.Đảm bảo giao dịch an toàn, thuận lợi cho các nhà đầu tư.',
  //       price: '6,5 tỷ',
  //       seller_user: 'Seller 2',
  //       seller_phone: '0000.000.000'
  //     }
  //   }
  // ];
  fullDataOrigin: any;
  fullData: any;
  views: any;
  amount: number = 5;
  condition: boolean = false;
  inputWebsite: string = '';
  inputTitle: string = '';
  inputSeller: string = '';
  inputPrice: string = '';

  search1: boolean = false;
  search2: boolean = false;
  search3: boolean = false;
  search4: boolean = false;

  constructor(private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.onload();
  }

  onload(): void {
    this.loading = true;
    this.fullDataOrigin = [];
    this.apiService.getAll().subscribe(response => {
      this.fullDataOrigin = response.flatMap(item => {
        return item.websiteDescription.map((description: any) => {
          return {
            websiteName: item.websiteName,
            websiteDescription: description,
            websiteId: item.websiteId
          };
        });
      });

      let elToAdd = this.fullDataOrigin.length % this.amount ? this.amount - (this.fullDataOrigin.length % this.amount) : 0;
      this.fullDataOrigin = [
        ...this.fullDataOrigin,
        ...Array.from({ length: elToAdd }, () => ({}))
      ]
      this.condition = true;
      this.fullData = this.fullDataOrigin;
      this.refresh(1);
      this.loading = false;
    }, () => {
      this.fullDataOrigin = Array.from({ length: this.amount }, () => ({}));
      this.fullData = this.fullDataOrigin;
      this.refresh(1);
      this.loading = false;
    });


    // this.loading = false;
    // let elToAdd = this.fullDataOrigin.length % this.amount ? this.amount - (this.fullDataOrigin.length % this.amount) : 0;
    // this.fullDataOrigin = [
    //   ...this.fullDataOrigin,
    //   ...Array.from({ length: elToAdd }, () => ({}))
    // ]
    // this.condition = true;
    // this.fullData = this.fullDataOrigin;
    // this.refresh(1);
    // this.loading = false;
  }

  refresh(curPage: number): void {
    let start = (curPage - 1) * this.amount;
    let end = start + this.amount;
    this.views = this.fullData.slice(start, end);
  }

  onInputChange(): void {
    this.fullData = this.fullDataOrigin.filter(
      (item: { websiteName: string | string[]; websiteDescription: { title: string; seller_user: string; price: string }; }) =>
        (item.websiteName && item.websiteName.includes(this.inputWebsite)) &&
        (item.websiteDescription.title && item.websiteDescription.title.includes(this.inputTitle)) &&
        (item.websiteDescription.seller_user && item.websiteDescription.seller_user.includes(this.inputSeller)) &&
        (item.websiteDescription.price && item.websiteDescription.price.includes(this.inputPrice))
    );

    let elToAdd = this.fullData.length % this.amount ? this.amount - (this.fullData.length % this.amount) : 0;
    this.fullData = [
      ...this.fullData,
      ...Array.from({ length: elToAdd }, () => ({}))
    ]
    this.condition = true;
    this.refresh(1);
  }

  navi(id: string): void {
    this.router.navigate(['/page', id]);
  }
}
