const realDomains = [
  "sbi.co.in","onlinesbi.sbi","icicibank.com","hdfcbank.com",
  "paytm.com","amazon.in","flipkart.com","google.com"
];

const scamWords = [
  "verify","secure","login","kyc","update","reward",
  "refund","claim","alert","blocked","upi","bank"
];

function extractDomain(url) {
  url = url.replace("https://","").replace("http://","");
  return url.split("/")[0].toLowerCase();
}

function scanLink() {
  const input = document.getElementById("linkInput").value.trim();
  const result = document.getElementById("result");

  if (!input.startsWith("http")) {
    result.innerHTML = "⚠️ Invalid URL format";
    result.style.color = "orange";
    return;
  }

  const domain = extractDomain(input);
  let risk = 0;

  // Brand impersonation
  realDomains.forEach(real => {
    const brand = real.split(".")[0];
    if (domain.includes(brand) && !domain.endsWith(real)) {
      risk += 5;
    }
  });

  // Scam language
  scamWords.forEach(word => {
    if (domain.includes(word)) risk++;
  });

  // Short links
  if (domain.includes("bit.ly") || domain.includes("tinyurl") || domain.includes("cutt.ly")) {
    risk += 4;
  }

  // IP based links
  if (/^\d+\.\d+\.\d+\.\d+$/.test(domain)) {
    risk += 5;
  }

  if (risk >= 5) {
    result.innerHTML = "🚨 SCAM LINK DETECTED<br>This site is impersonating a real service.";
    result.style.color = "#ff4d4d";
  } else {
    result.innerHTML = "✅ Looks Safe<br>No phishing pattern found.";
    result.style.color = "#00ff99";
  }
}
