function shortenUrl() {
    const urlInput = document.getElementById('urlInput').value;
    if (!urlInput) {
        alert("URLを入力してください");
        return;
    }

    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(urlInput)}`;

    fetch(apiUrl)
        .then(response => response.text())
        .then(shortenedUrl => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<p>短縮URL: <a href="${shortenedUrl}" target="_blank">${shortenedUrl}</a></p>`;
        })
        .catch(error => {
            console.error("エラーが発生しました:", error);
            alert("URLの短縮に失敗しました。");
        });
}
