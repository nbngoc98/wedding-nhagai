/**
 * CONFIG.JS - File cấu hình thông tin & hình ảnh thiệp cưới
 */
window.WEDDING_CONFIG = {
  // 1. THÔNG TIN CHÚ RỂ & CÔ DÂU
  groom: {
    fullName: "Nguyễn Bảo Ngọc",
    shortName: "Bảo Ngọc",
    father: "Ông. Nguyễn Mạnh Hùng",
    mother: "Bà. Nguyễn Thị Tố Nga",
    bank: {
      accountName: "NGUYEN BAO NGOC",
      bankName: "MB BANK",
      accountNumber: "0000000000000",
      qrImage: "https://w.ladicdn.com/s450x550/69b247cf4f6ddc0012f0ce55/z7712856631994_92c86f619d5569271915d160cce5aaf9-20260410163405-oggpt.jpg"
    }
  },
  bride: {
    fullName: "Huỳnh Hoàng Nhi",
    shortName: "Hoàng Nhi",
    father: "Ông. Huỳnh Tấn Quang",
    mother: "Bà. Lê Thị Hằng",
    bank: {
      accountName: "HUYNH HOANG NHI",
      bankName: "MB BANK",
      accountNumber: "0000000000000",
      qrImage: "https://w.ladicdn.com/s450x550/69b247cf4f6ddc0012f0ce55/z7712856631994_92c86f619d5569271915d160cce5aaf9-20260410163405-oggpt.jpg"
    }
  },

  // 2. THỜI GIAN & LỊCH TRÌNH
  eventDateISO: "2026-11-28T18:00:00+07:00",
  displayDate: "28.11.2026",
  lunarDate: "20 tháng 10 năm Bính Ngọ",

  events: {
    vuQuy: {
      title: "LỄ VU QUY",
      locationName: "TƯ GIA NHÀ GÁI",
      address: "Quốc Lộ 13, Phường Hiệp Bình, TP. HCM",
      timeText: "8:00, Thứ bảy",
      day: "28",
      month: "tháng 11",
      year: "năm 2026",
      mapUrl: "https://maps.google.com/"
    },
    tiecCuoi: {
      title: "TIỆC CHUNG VUI",
      locationName: "NHÀ HÀNG VƯỜNG CAU",
      address: "Sảnh 4 SUNFLOWER - 360 Đ. Phan Văn Trị, TP. HCM",
      timeText: "Thân mời bạn đến dự tiệc cưới<br>Được tổ chức vào 18:00, Thứ bảy",
      day: "28",
      month: "tháng 11",
      year: "năm 2026",
      mapUrl: "https://maps.app.goo.gl/sc3GVkv67gFoDDmWA"
    }
  },

  introText: "Có những cuộc gặp gỡ tưởng chừng như một cơn gió thoảng, nhưng hoá ra lại là định mệnh neo đậu cả một đời người. Tình yêu của chúng tôi bắt đầu như thế - lặng lẽ, dần lớn lên và bền bỉ qua từng nhịp đập của thời gian.\n\nChúng tôi đã cùng nhau trưởng thành, gìn giữ và nuôi dưỡng một tình yêu trọn vẹn, để hôm nay, trang nghiêm bước vào dấu mốc thiêng liêng của cuộc đời mình.",

  // 3. NHẠC NỀN
  musicUrl: "https://lamiwedding.io.vn/storage/music-1/erik-x-kai-dinh-vay-cuoi-official-mv-from-the-wedding-ceremony-of-ms-mp3cutnet.mp3",

  // 4. QUẢN LÝ TOÀN BỘ HÌNH ẢNH (IMAGES & BACKGROUNDS)
  images: {
    // Background các phần chính
    mainBackground: "https://w.ladicdn.com/s750x1200/69b247cf4f6ddc0012f0ce55/background-1-20260323160459-oojeq.png",
    heroFullImage: "image/BAO_5973.jpg",
    calendarBackground: "https://w.ladicdn.com/s750x600/69b247cf4f6ddc0012f0ce55/a50667d44368de9cf7c91c741c61b413-20260406171126-d3uyw.jpg",
    thankyouBackground: "image/BAO_6183_ngang2.jpg",

    // Ảnh chân dung Chú rể & Cô dâu (phần giới thiệu)
    groomPortrait: "image/BAO_8326.jpg",
    bridePortrait: "image/BAO_6769.jpg",

    // Ảnh khung lồng ghép kép (SECTION21 / SECTION22)
    framedPhoto1: "image/BAO_7187.jpg",
    framedPhoto2: "image/BAO_6322.jpg",
    framedPhoto3: "image/BAO_8406.jpg",
    framedPhotoMain: "image/BAO_6690_ngang.jpg",

    // Khung ảnh bộ 3 ghép góc (SECTION22)
    gridPhoto1: "image/BAO_6690.jpg",
    gridPhoto2: "image/BAO_5924.jpg",
    gridPhoto3: "image/BAO_6453.jpg",

    // Ảnh đại diện trong Popup phản hồi / mừng cưới
    popupBanner: "https://w.ladicdn.com/s800x600/69b247cf4f6ddc0012f0ce55/z8029282842691_e76a5a04463e5f8346b2ea97bc5c1188-20260719175919-gnopl.jpg",
    popupHeaderImage: "https://w.ladicdn.com/s750x600/69b247cf4f6ddc0012f0ce55/z7712856719245_233bb94b0c96052cc995d9567f3aef70-20260410163404-oxzop.jpg"
  },

  // 5. ALBUM BỘ ẢNH CƯỚI (GALLERY)
  gallery: [
    "image/BAO_5924.jpg",
      "image/BAO_5973.jpg",
      "image/BAO_6077.jpg",
      "image/BAO_6183.jpg",
      "image/BAO_6213.jpg",
      "image/BAO_6322.jpg",
      "image/BAO_6453.jpg",
      "image/BAO_6480.jpg",
      "image/BAO_6639.jpg",
      "image/BAO_6647.jpg",
      "image/BAO_6690.jpg",
      "image/BAO_6769.jpg",
      "image/BAO_7187.jpg",
      "image/BAO_7378.jpg",
      "image/BAO_7466.jpg",
      "image/BAO_7488.jpg",
      "image/BAO_7522.jpg",
      "image/BAO_7561.jpg",
      "image/BAO_7581.jpg",
      "image/BAO_7636.jpg",
      "image/BAO_7766.jpg",
      "image/BAO_7873.jpg",
      "image/BAO_7883.jpg",
      "image/BAO_7978.jpg",
      "image/BAO_8148.jpg",
      "image/BAO_8295.jpg",
      "image/BAO_8321.jpg",
      "image/BAO_8326.jpg",
      "image/BAO_8381.jpg",
      "image/BAO_8406.jpg",
      "image/BAO_8416.jpg",
      "image/BAO_8442.jpg",
      "image/BAO_8501.jpg",
  ]
};