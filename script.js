const realDomains = [
  "sbi.co.in","onlinesbi.sbi","icicibank.com","hdfcbank.com",
  "paytm.com","amazon.in","flipkart.com","google.com",
  "instagram.com","facebook.com","whatsapp.com",
  "microsoft.com","twitter.com","telegram.org"
];

const scamWords = [
  "verify","secure","login","kyc","update","reward",
  "refund","claim","alert","blocked","upi","account"
];

const riskyTLDs = ["xyz","top","click","site","live","page","work"];

function scanLink() {
  const input = document.getElementById("linkInput").value.trim();
  const result = document.getElementById("result");

  try {
    const url = new URL(input);
    const domain = url.hostname.toLowerCase();
    const path = url.pathname.toLowerCase();
    let risk = 0;

    // 1. Brand impersonation
    realDomains.forEach(real => {
      const brand = real.split(".")[0];
      if (domain.includes(brand) && !domain.endsWith(real)) {
        risk += 6;
      }
    });

    // 2. Scam words in domain & path
    scamWords.forEach(w => {
      if (domain.includes(w)) risk += 1;
      if (path.includes(w)) risk += 1;
    });

    // 3. Risky domain endings
    riskyTLDs.forEach(tld => {
      if (domain.endsWith("." + tld)) risk += 3;
    });

    // 4. Too many hyphens
    if ((domain.match(/-/g) || []).length > 2) risk += 2;

    // 5. Numbers in domain
    if (/\d{3,}/.test(domain)) risk += 2;

    // 6. IP address links
    if (/^\d+\.\d+\.\d+\.\d+$/.test(domain)) risk += 6;

    // Final decision
    if (risk >= 6) {
      result.innerHTML = "🚨 SCAM LINK DETECTED<br>This site shows phishing patterns.";
      result.style.color = "#ff4d4d";
    } else {
      result.innerHTML = "✅ Looks Safe<br>No major scam signals detected.";
      result.style.color = "#00ff99";
    }

  } catch {
    result.innerHTML = "⚠️ Invalid URL";
    result.style.color = "orange";
  }
}
