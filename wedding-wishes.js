/* firebase-wishes.js
 * Sổ lưu bút: gửi lời chúc lên Firestore + hiển thị realtime.
 * Cách dùng: thêm 1 dòng trước </body>:
 *   <script src="firebase-wishes.js"></script>
 * và XÓA đoạn <script> firebase cũ đã dán trong thẻ <h3> "Hãy để lại đôi dòng...".
 */
(function () {
  "use strict";

  var firebaseConfig = {
    apiKey: "AIzaSyDUzJYpbOLjrgEDFGkipTKOyQFjKBrlvIM",
    authDomain: "wedding-ngocnhi.firebaseapp.com",
    projectId: "wedding-ngocnhi",
    storageBucket: "wedding-ngocnhi.firebasestorage.app",
    messagingSenderId: "1085711885103",
    appId: "1:1085711885103:web:62995edc66a8b07db437da",
    measurementId: "G-GC3XLMPDCH",
  };

  var SDK = "https://www.gstatic.com/firebasejs/10.12.5/";
  var GREEN = "#5d733f";
  var COOLDOWN_MS = 30000; // chống spam: 30s / lần gửi
  var MAX_NAME = 100,
    MAX_MSG = 1000,
    LIST_LIMIT = 100;

  /* ---------- tiện ích ---------- */
  function loadScript(src) {
    return new Promise(function (ok, fail) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = ok;
      s.onerror = fail;
      document.head.appendChild(s);
    });
  }

  function timeAgo(date) {
    if (!date) return "vừa xong";
    var s = Math.max(0, (Date.now() - date.getTime()) / 1000);
    if (s < 60) return "vừa xong";
    if (s < 3600) return Math.floor(s / 60) + " phút trước";
    if (s < 86400) return Math.floor(s / 3600) + " giờ trước";
    if (s < 86400 * 30) return Math.floor(s / 86400) + " ngày trước";
    return date.toLocaleDateString("vi-VN");
  }

  function initial(name) {
    var t = (name || "K").trim();
    return t ? t.charAt(0).toUpperCase() : "K";
  }

  /* ---------- CSS ---------- */
  function injectCSS() {
    var css = [
      "#wishes-section{width:420px;margin:0 auto;padding:36px 20px 40px;position:relative;",
      "background:#f6f1e7 url('https://w.ladicdn.com/s750x850/69b247cf4f6ddc0012f0ce55/background-1-20260323160459-oojeq.png') center/cover;",
      "font-family:'TESQSSRUdVTEFSLlRURg','Lora',serif;color:" +
        GREEN +
        ";box-sizing:border-box}",
      "#wishes-section *{box-sizing:border-box;-webkit-user-select:text;user-select:text}",
      "#wishes-section .ws-title{font-family:'VVZOSGhVGFMSdGY','Lora',cursive;font-size:38px;text-align:center;line-height:1.3}",
      "#wishes-section .ws-sub{text-align:center;font-size:13px;margin:4px 0 18px;opacity:.85}",
      "#wish-list{max-height:460px;overflow-y:auto;padding:4px 4px 4px 0;display:flex;flex-direction:column;gap:12px;",
      "scrollbar-width:thin;scrollbar-color:" + GREEN + " transparent}",
      "#wish-list::-webkit-scrollbar{width:5px}",
      "#wish-list::-webkit-scrollbar-thumb{background:" +
        GREEN +
        ";border-radius:5px}",
      ".wish-item{display:flex;gap:12px;padding:14px 14px;border:1px solid " +
        GREEN +
        ";border-radius:18px;",
      "background:rgba(255,255,255,.72);backdrop-filter:blur(2px);animation:wishIn .5s ease both}",
      ".wish-avatar{flex:0 0 40px;height:40px;border-radius:50%;background:" +
        GREEN +
        ";color:#fff;",
      "display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px}",
      ".wish-body{min-width:0;flex:1}",
      ".wish-head{display:flex;justify-content:space-between;align-items:baseline;gap:8px}",
      ".wish-name{font-weight:700;font-size:15px;word-break:break-word}",
      ".wish-time{font-size:11px;opacity:.65;white-space:nowrap}",
      ".wish-msg{margin-top:4px;font-size:14px;line-height:1.55;white-space:pre-wrap;word-break:break-word}",
      ".wish-empty{text-align:center;font-size:14px;padding:22px 0;opacity:.85}",
      "#wishes-count{display:inline-block;margin-left:6px;padding:0 9px;border-radius:99px;background:" +
        GREEN +
        ";color:#fff;font-size:12px}",
      "#wish-toast{position:fixed;left:50%;bottom:90px;transform:translate(-50%,20px);opacity:0;pointer-events:none;",
      "background:" +
        GREEN +
        ";color:#fff;padding:12px 22px;border-radius:99px;font-size:14px;z-index:2147483000;",
      "transition:all .35s ease;max-width:90vw;text-align:center;font-family:'TESQSSRUdVTEFSLlRURg','Lora',serif}",
      "#wish-toast.show{opacity:1;transform:translate(-50%,0)}",
      "#wish-toast.err{background:#a94442}",
      ".wish-heart{position:fixed;bottom:-30px;z-index:2147483000;pointer-events:none;animation:wishFloat 2.6s ease-in forwards}",
      "@keyframes wishIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}",
      "@keyframes wishFloat{to{transform:translateY(-105vh) rotate(25deg);opacity:0}}",
    ].join("");
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);
  }

  /* ---------- UI: khu vực hiển thị lời chúc ---------- */
  function buildSection() {
    var sec = document.createElement("section");
    sec.id = "wishes-section";

    var title = document.createElement("div");
    title.className = "ws-title";
    title.textContent = "Lời chúc";
    var count = document.createElement("span");
    count.id = "wishes-count";
    count.style.display = "none";
    // title.appendChild(count);

    var sub = document.createElement("div");
    sub.className = "ws-sub";
    sub.textContent = "Những lời yêu thương dành cho Ngọc & Nhi";

    var list = document.createElement("div");
    list.id = "wish-list";
    var loading = document.createElement("div");
    loading.className = "wish-empty";
    loading.textContent = "Đang tải lời chúc…";
    list.appendChild(loading);

    sec.append(title, sub, list);

    var anchor = document.getElementById("SECTION18"); // "Thank you"
    if (anchor && anchor.parentNode)
      anchor.parentNode.insertBefore(sec, anchor);
    else document.querySelector(".ladi-wraper").appendChild(sec);
    return { list: list, count: count };
  }

  function renderWishes(ui, snapshot) {
    ui.list.replaceChildren();
    if (snapshot.empty) {
      ui.count.style.display = "none";
      var e = document.createElement("div");
      e.className = "wish-empty";
      e.textContent = "Hãy là người đầu tiên gửi lời chúc 💌";
      ui.list.appendChild(e);
      return;
    }
    ui.count.textContent =
      snapshot.size >= LIST_LIMIT ? LIST_LIMIT + "+" : snapshot.size;
    ui.count.style.display = "inline-block";

    snapshot.forEach(function (doc) {
      var w = doc.data({ serverTimestamps: "estimate" });
      var ts = w.createdAt && w.createdAt.toDate ? w.createdAt.toDate() : null;

      var item = document.createElement("div");
      item.className = "wish-item";

      var av = document.createElement("div");
      av.className = "wish-avatar";
      av.textContent = initial(w.name);

      var body = document.createElement("div");
      body.className = "wish-body";

      var head = document.createElement("div");
      head.className = "wish-head";
      var name = document.createElement("span");
      name.className = "wish-name";
      name.textContent = w.name || "Khách mời";
      var time = document.createElement("span");
      time.className = "wish-time";
      time.textContent = timeAgo(ts);
      head.append(name, time);

      var msg = document.createElement("div");
      msg.className = "wish-msg";
      msg.textContent = w.message || "";

      body.append(head, msg);
      item.append(av, body);
      ui.list.appendChild(item);
    });
  }

  /* ---------- thông báo + hiệu ứng ---------- */
  function toast(text, isErr) {
    var t = document.getElementById("wish-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "wish-toast";
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.className = (isErr ? "err " : "") + "show";
    clearTimeout(t._h);
    t._h = setTimeout(function () {
      t.className = isErr ? "err" : "";
    }, 3200);
  }

  function hearts() {
    if (typeof window.showFireworks === "function") {
      window.showFireworks();
      return;
    }
    var icons = ["💚", "💌", "🤍", "✨", "💐"];
    for (var i = 0; i < 18; i++) {
      (function (i) {
        setTimeout(function () {
          var h = document.createElement("div");
          h.className = "wish-heart";
          h.textContent = icons[i % icons.length];
          h.style.left = Math.random() * 95 + "vw";
          h.style.fontSize = 18 + Math.random() * 20 + "px";
          h.style.animationDuration = 2 + Math.random() * 1.8 + "s";
          document.body.appendChild(h);
          setTimeout(function () {
            h.remove();
          }, 4200);
        }, i * 90);
      })(i);
    }
  }

  /* ---------- gửi lời chúc ---------- */
  function setupForm(wishesRef, firebase) {
    var nameInput = document.querySelector("#FORM_ITEM18 input");
    var msgInput = document.querySelector("#FORM_ITEM19 textarea");
    var btn = document.getElementById("BUTTON10");
    var btnText = document.querySelector("#BUTTON_TEXT10 .ladi-headline");
    var form = document.querySelector("#FORM5 form");
    if (!nameInput || !msgInput || !btn) return;

    nameInput.maxLength = MAX_NAME;
    msgInput.maxLength = MAX_MSG;
    var busy = false;
    var original = btnText ? btnText.textContent : "XÁC NHẬN";

    // honeypot chống bot
    var trap = document.createElement("input");
    trap.type = "text";
    trap.tabIndex = -1;
    trap.autocomplete = "off";
    trap.style.cssText =
      "position:absolute;left:-9999px;opacity:0;height:0;width:0";
    form.appendChild(trap);

    function send() {
      if (busy) return;
      var name = nameInput.value.trim();
      var message = msgInput.value.trim();

      if (trap.value) return; // bot
      if (!name || !message)
        return toast("Vui lòng nhập đầy đủ tên và lời chúc.", true);
      if (name.length > MAX_NAME || message.length > MAX_MSG)
        return toast(
          "Tên tối đa " +
            MAX_NAME +
            " ký tự, lời chúc tối đa " +
            MAX_MSG +
            " ký tự.",
          true,
        );

      var last = 0;
      try {
        last = +localStorage.getItem("wish_last") || 0;
      } catch (e) {}
      if (Date.now() - last < COOLDOWN_MS)
        return toast("Bạn vừa gửi xong, vui lòng đợi một chút nhé 💚", true);

      busy = true;
      if (btnText) btnText.textContent = "ĐANG GỬI...";

      wishesRef
        .add({
          name: name,
          message: message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function () {
          try {
            localStorage.setItem("wish_last", String(Date.now()));
          } catch (e) {}
          nameInput.value = "";
          msgInput.value = "";
          hearts();
          toast("Cảm ơn bạn đã gửi lời chúc 💌");
          var l = document.getElementById("wish-list");
          if (l) l.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch(function (err) {
          console.error("Lỗi gửi lời chúc:", err);
          toast("Gửi chưa thành công, vui lòng thử lại.", true);
        })
        .finally(function () {
          busy = false;
          if (btnText) btnText.textContent = original;
        });
    }

    // chặn handler mặc định của LadiPage (nó sẽ gửi form về server Ladi)
    document.addEventListener(
      "click",
      function (e) {
        if (e.target.closest && e.target.closest("#BUTTON10")) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          send();
        }
      },
      true,
    );
    form.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        send();
      },
      true,
    );
  }

  /* ---------- khởi động ---------- */
  function start() {
    injectCSS();
    var ui = buildSection();

    var chain =
      window.firebase && firebase.firestore
        ? Promise.resolve()
        : loadScript(SDK + "firebase-app-compat.js").then(function () {
            return loadScript(SDK + "firebase-firestore-compat.js");
          });

    chain
      .then(function () {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        var db = firebase.firestore();
        var wishesRef = db.collection("wishes");

        wishesRef
          .orderBy("createdAt", "desc")
          .limit(LIST_LIMIT)
          .onSnapshot(
            function (snap) {
              renderWishes(ui, snap);
            },
            function (err) {
              console.error("Lỗi tải lời chúc:", err);
              ui.list.replaceChildren();
              var e = document.createElement("div");
              e.className = "wish-empty";
              e.textContent = "Không thể tải lời chúc. Vui lòng thử lại sau.";
              ui.list.appendChild(e);
            },
          );
        setupForm(wishesRef, firebase);
      })
      .catch(function (err) {
        console.error("Không tải được Firebase SDK:", err);
        ui.list.textContent = "Không thể kết nối. Vui lòng thử lại sau.";
      });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else start();
})();
