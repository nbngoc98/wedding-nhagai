/**
 * WEDDING-ENGINE.JS - Tự động cập nhật Text & Tất cả Hình Ảnh dựa trên config.js
 */
document.addEventListener("DOMContentLoaded", function () {
  const cfg = window.WEDDING_CONFIG;
  if (!cfg) return;

  // Trợ giúp gán text/html
  const setText = (selector, text) => {
    const el = document.querySelector(selector);
    if (el && text !== undefined) el.textContent = text;
  };
  const setHtml = (selector, html) => {
    const el = document.querySelector(selector);
    if (el && html !== undefined) el.innerHTML = html;
  };

  // Trợ giúp gán ảnh background
  const setBgImage = (selector, url) => {
    const el = document.querySelector(selector);
    if (el && url) el.style.backgroundImage = `url('${url}')`;
  };

  /**
 * WEDDING-ENGINE.JS - Cập nhật thông tin & Xử lý đếm ngược (COUNTDOWN3)
  */
  // =========================================================
  // XỬ LÝ ĐẾM NGƯỢC (COUNTDOWN3 / SECTION23)
  // =========================================================
  if (cfg.eventDateISO) {
    const countdownEl = document.getElementById("COUNTDOWN3");
    if (countdownEl) {
      // 1. Gán thuộc tính data-date chuẩn cho LadiPage
      countdownEl.setAttribute("data-date", cfg.eventDateISO);

      // 2. Chạy bộ đếm ngược bằng JavaScript độc lập
      const targetTime = new Date(cfg.eventDateISO).getTime();

      function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetTime - now;

        if (diff <= 0) {
          setText("#COUNTDOWN_ITEM9 .ladi-countdown-text span", "00");
          setText("#COUNTDOWN_ITEM10 .ladi-countdown-text span", "00");
          setText("#COUNTDOWN_ITEM11 .ladi-countdown-text span", "00");
          setText("#COUNTDOWN_ITEM12 .ladi-countdown-text span", "00");
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setText("#COUNTDOWN_ITEM9 .ladi-countdown-text span", String(days).padStart(2, "0"));
        setText("#COUNTDOWN_ITEM10 .ladi-countdown-text span", String(hours).padStart(2, "0"));
        setText("#COUNTDOWN_ITEM11 .ladi-countdown-text span", String(minutes).padStart(2, "0"));
        setText("#COUNTDOWN_ITEM12 .ladi-countdown-text span", String(seconds).padStart(2, "0"));
      }

      updateCountdown();
      setInterval(updateCountdown, 1000);
    }
  }

  // =========================================================
  // 1. CẬP NHẬT HÌNH ẢNH (IMAGES & BACKGROUNDS)
  // =========================================================
  if (cfg.images) {
    const img = cfg.images;

    // Background chính
    setBgImage("#BOX1 > .ladi-box", img.mainBackground);
    setBgImage("#IMAGE158 > .ladi-image > .ladi-image-background", img.mainBackground);
    setBgImage("#IMAGE93 > .ladi-image > .ladi-image-background", img.mainBackground);
    setBgImage("#IMAGE94 > .ladi-image > .ladi-image-background", img.mainBackground);
    setBgImage("#IMAGE123 > .ladi-image > .ladi-image-background", img.mainBackground);
    setBgImage("#IMAGE24 > .ladi-image > .ladi-image-background", img.mainBackground);
    setBgImage("#IMAGE25 > .ladi-image > .ladi-image-background", img.mainBackground);
    setBgImage("#IMAGE129 > .ladi-image > .ladi-image-background", img.mainBackground);
    setBgImage("#IMAGE52 > .ladi-image > .ladi-image-background", img.mainBackground);
    setBgImage("#IMAGE23 > .ladi-image > .ladi-image-background", img.framedPhotoMain);
    setBgImage("#BOX41 > .ladi-box", img.mainBackground);

    // Background các phần đặc biệt
    setBgImage("#BOX34 > .ladi-box", img.heroFullImage);
    setBgImage("#BOX49 > .ladi-box", img.calendarBackground);
    setBgImage("#BOX26 > .ladi-box", img.thankyouBackground);
    setBgImage("#BOX66 > .ladi-box", img.gridPhoto3);

    // Chân dung Chú rể & Cô dâu
    setBgImage("#BOX32 > .ladi-box", img.groomPortrait);
    setBgImage("#BOX31 > .ladi-box", img.bridePortrait);

    // Ảnh trong khung nghệ thuật (SECTION21 & SECTION19)
    setBgImage("#IMAGE161 > .ladi-image > .ladi-image-background", img.framedPhoto1);
    setBgImage("#IMAGE163 > .ladi-image > .ladi-image-background", img.framedPhoto2);
    setBgImage("#IMAGE128 > .ladi-image > .ladi-image-background", img.framedPhoto3);

    // Ảnh bộ khung 3 tấm (SECTION22)
    setBgImage("#BOX70 > .ladi-box", img.gridPhoto1);
    setBgImage("#BOX69 > .ladi-box", img.gridPhoto2);
    setBgImage("#BOX68 > .ladi-box", img.gridPhoto3);

    // Ảnh Popup
    setBgImage("#IMAGE68 > .ladi-image > .ladi-image-background", img.popupBanner);
    setBgImage("#IMAGE133 > .ladi-image > .ladi-image-background", img.popupHeaderImage);
  }

  // =========================================================
  // 2. CẬP NHẬT ALBUM ẢNH (GALLERY) - HỖ TRỢ BẤT KỲ SỐ LƯỢNG ẢNH NÀO
  // =========================================================
  if (Array.isArray(cfg.gallery) && cfg.gallery.length > 0) {
    const galleryEl = document.getElementById("GALLERY3");
    if (galleryEl) {
      const viewContainer = galleryEl.querySelector(".ladi-gallery-view");
      const controlContainer = galleryEl.querySelector(".ladi-gallery-control-box");

      // Lấy danh sách item mẫu hiện có
      let viewItems = Array.from(galleryEl.querySelectorAll(".ladi-gallery-view-item"));
      let controlItems = Array.from(galleryEl.querySelectorAll(".ladi-gallery-control-item"));

      // Nếu số lượng ảnh config nhiều hơn số item mẫu trong HTML -> Tự tạo thêm item
      if (viewItems.length > 0 && viewItems.length < cfg.gallery.length) {
        const viewTemplate = viewItems[0];
        const controlTemplate = controlItems[0];

        for (let i = viewItems.length; i < cfg.gallery.length; i++) {
          if (viewContainer && viewTemplate) {
            const newView = viewTemplate.cloneNode(true);
            newView.setAttribute("data-index", i);
            newView.classList.remove("selected", "active");
            viewContainer.appendChild(newView);
          }
          if (controlContainer && controlTemplate) {
            const newControl = controlTemplate.cloneNode(true);
            newControl.setAttribute("data-index", i);
            newControl.classList.remove("selected", "active");
            controlContainer.appendChild(newControl);
          }
        }
      }

      // Cập nhật background URL cho tất cả ảnh
      cfg.gallery.forEach((url, idx) => {
        setBgImage(`#GALLERY3 .ladi-gallery-view-item[data-index="${idx}"]`, url);
        setBgImage(`#GALLERY3 .ladi-gallery-control-item[data-index="${idx}"]`, url);
      });

      // Kích hoạt lại (Re-init) LadiGallery của LadiPage nếu có
      if (window.LadiPageScript && typeof window.LadiPageScript.runGallery === "function") {
        try {
          window.LadiPageScript.runGallery("GALLERY3");
        } catch (e) {
          console.log("Re-init gallery notice:", e);
        }
      }
    }
  }

  // =========================================================
  // 3. CẬP NHẬT THÔNG TIN VĂN BẢN (TEXTS)
  // =========================================================
  // setText("#HEADLINE5 .ladi-headline", cfg.displayDate);
  setText("#HEADLINE272 .ladi-headline", cfg.displayDate);

  // Tên ngắn & Tên đầy đủ
  setText("#HEADLINE165 .ladi-headline", cfg.groom.shortName);
  setText("#HEADLINE166 .ladi-headline", cfg.bride.shortName);
  setText("#HEADLINE142 .ladi-headline", cfg.bride.shortName);
  setText("#HEADLINE140 .ladi-headline", cfg.groom.shortName);
  setText("#HEADLINE10 .ladi-headline", cfg.bride.fullName);
  setText("#HEADLINE11 .ladi-headline", cfg.groom.fullName);
  setText("#HEADLINE214 .ladi-headline", `Ngọc & Nhi`);
  setText("#HEADLINE274 .ladi-headline", `${cfg.groom.shortName} & ${cfg.bride.shortName}`);

  // Bố mẹ 2 bên
  // setHtml("#HEADLINE6 .ladi-headline", `${cfg.groom.father}<br>${cfg.groom.mother}`);
  // setHtml("#HEADLINE8 .ladi-headline", `${cfg.bride.father}<br>${cfg.bride.mother}`);

  // Lời ngỏ
  setHtml("#HEADLINE144 .ladi-headline", cfg.introText ? cfg.introText.replace(/\n/g, "<br>") : "");

  // Lễ Vu Quy
  setText("#HEADLINE168 .ladi-headline", cfg.events.vuQuy.locationName);
  setText("#HEADLINE169 .ladi-headline", cfg.events.vuQuy.address);
  setText("#HEADLINE171 .ladi-headline", `Được tổ chức vào ${cfg.events.vuQuy.timeText}`);
  setText("#HEADLINE172 .ladi-headline", cfg.events.vuQuy.month);
  setText("#HEADLINE173 .ladi-headline", cfg.events.vuQuy.year);
  setText("#HEADLINE174 .ladi-headline", cfg.events.vuQuy.day);
  setText("#HEADLINE175 .ladi-headline", `( Tức ngày ${cfg.lunarDate})`);
  const vuQuyMap = document.getElementById("GROUP99");
  if (vuQuyMap && cfg.events.vuQuy.mapUrl) vuQuyMap.href = cfg.events.vuQuy.mapUrl;

  // Tiệc Cưới
  setText("#HEADLINE19 .ladi-headline", cfg.events.tiecCuoi.locationName);
  setText("#HEADLINE20 .ladi-headline", cfg.events.tiecCuoi.address);
  setHtml("#HEADLINE13 .ladi-headline", cfg.events.tiecCuoi.timeText);
  setText("#HEADLINE14 .ladi-headline", cfg.events.tiecCuoi.month);
  setText("#HEADLINE15 .ladi-headline", cfg.events.tiecCuoi.year);
  setText("#HEADLINE16 .ladi-headline", cfg.events.tiecCuoi.day);
  setText("#HEADLINE17 .ladi-headline", `( Tức ngày ${cfg.lunarDate})`);
  const tiecMap = document.getElementById("GROUP13");
  if (tiecMap && cfg.events.tiecCuoi.mapUrl) tiecMap.href = cfg.events.tiecCuoi.mapUrl;

  // Bank & QR Code
  setText("#HEADLINE98 .ladi-headline", cfg.bride.bank.accountName);
  setText("#HEADLINE218 .ladi-headline", cfg.bride.bank.bankName);
  setText("#HEADLINE219 .ladi-headline", cfg.bride.bank.accountNumber);
  setBgImage("#IMAGE70 .ladi-image-background", cfg.bride.bank.qrImage);

  setText("#HEADLINE220 .ladi-headline", cfg.groom.bank.accountName);
  setText("#HEADLINE221 .ladi-headline", cfg.groom.bank.bankName);
  setText("#HEADLINE222 .ladi-headline", cfg.groom.bank.accountNumber);
  setBgImage("#IMAGE132 .ladi-image-background", cfg.groom.bank.qrImage);

  // Nhạc nền
  if (window.musicList && cfg.musicUrl) {
    window.musicList[0] = cfg.musicUrl;
  }
});