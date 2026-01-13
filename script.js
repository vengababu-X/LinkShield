const scamWords = [
  "verify", "login", "secure", "bank", "kyc", "reward",
  "claim", "free", "offer", "upi", "paytm", "sbi",
  "refund", "update", "blocked", "alert"
];

const shorteners = ["bit.ly", "tinyurl", "cutt.ly", "rb.gy", "goo.gl"];

function checkLink() {
  const url = document.getElementById("linkInput").value.toLowerCase();
  const output = document.getElementById("output");

  if (!url.startsWith("http")) {
    output.innerHTML = "⚠️ Enter a valid URL";
    output.style.color = "orange";
    return;
  }

  let score = 0;

  scamWords.forEach(word => {
    if (url.includes(word)) score++;
  });

  shorteners.forEach(short => {
    if (url.includes(short)) score += 3;
  });

  if (url.includes("@")) score += 3;
  if (/\d+\.\d+\.\d+\.\d+/.test(url)) score += 3;

  if (score >= 4) {
    output.innerHTML = "🚨 Likely Scam Link<br>Do NOT click this.";
    output.style.color = "red";
  } else {
    output.innerHTML = "✅ Looks Safe<br>Still be careful.";
    output.style.color = "lime";
  }
}
