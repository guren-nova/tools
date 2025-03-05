document.getElementById('startButton').addEventListener('click', showConsentPopup);
    document.getElementById('agreeButton').addEventListener('click', startTest);
    document.getElementById('declineButton').addEventListener('click', declineTest);

    let consentGiven = false;

    function showConsentPopup() {
      document.getElementById('consentPopup').style.display = 'flex';
    }

    function startTest() {
      consentGiven = true;
      document.getElementById('consentPopup').style.display = 'none';

      const resultDiv = document.getElementById('result');
      resultDiv.textContent = '計測中...';

      measureSpeed().then(result => {
        resultDiv.innerHTML = `
          <p>ダウンロード速度: ${result.downloadSpeed} Mbps</p>
          <p>レイテンシ（ping）: ${result.ping} ms</p>
        `;
      }).catch(error => {
        resultDiv.textContent = `速度計測に失敗しました: ${error.message}`;
        console.error(error);
      });
    }

    function declineTest() {
      document.getElementById('consentPopup').style.display = 'none';
      alert('プライバシーポリシーに同意しないと計測はできません。');
    }

    async function measureSpeed() {
      const startTime = new Date().getTime();
      const downloadSpeed = await testDownloadSpeed();
      const ping = await testPing();

      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;

      return {
        downloadSpeed: (downloadSpeed / duration).toFixed(2),
        ping: ping
      };
    }

    async function testDownloadSpeed() {
      const imageURL = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Logo_of_the_English_Wikipedia.svg'; // 有名な画像URL
      const start = new Date().getTime();
      const img = new Image();
      img.src = imageURL;
      return new Promise((resolve, reject) => {
        img.onload = () => {
          const end = new Date().getTime();
          const duration = (end - start) / 1000;
          const fileSize = 19255; // ファイルサイズ（約19KB）
          const speed = (fileSize / duration) * 8 / 1024; // Mbps単位
          resolve(speed);
        };
        img.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
      });
    }

    async function testPing() {
      const start = new Date().getTime();
      try {
        await fetch('https://www.google.com');
        const end = new Date().getTime();
        return (end - start); // ミリ秒単位
      } catch (error) {
        throw new Error('pingテストに失敗しました');
      }
    }
