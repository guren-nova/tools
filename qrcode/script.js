let generatedQRCodeUrl = '';

function generateQRCode() {
    const qrInput = document.getElementById('qrInput').value;
    if (!qrInput) {
        alert("URLまたはテキストを入力してください");
        return;
    }

    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = "";
    document.getElementById('downloadButton').style.display = 'none';

    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrInput)}&size=200x200`;
    const img = document.createElement('img');
    img.src = apiUrl;
    img.alt = 'QRコード';
    qrCodeContainer.appendChild(img);
    generatedQRCodeUrl = img.src;
    document.getElementById('downloadButton').style.display = 'inline-block';
}

function downloadQRCode() {
    if (generatedQRCodeUrl) {
        const link = document.createElement('a');
        link.href = generatedQRCodeUrl;
        link.download = 'qr_code.png';
        link.click();
    } else {
        alert("QRコードが生成されていません");
    }
}
