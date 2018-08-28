browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browser.tabs.get(tabs[0].id, function (tab) {
        new QRCode(document.getElementById("qrcode"), tab.url);
    });
    root.style.display = "block";
});