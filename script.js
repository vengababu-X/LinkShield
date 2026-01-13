const legitDomains = [
  "sbi.co.in",
  "onlinesbi.sbi",
  "icicibank.com",
  "hdfcbank.com",
  "paytm.com",
  "amazon.in",
  "flipkart.com",
  "google.com",
  "microsoft.com"
];

const scamKeywords = [
  "verify","login","secure","update","kyc",
  "reward","refund","claim","free","offer",
  "alert","blocked","upi","bank","paytm","sbi"
];

const shorteners = ["bit.ly","tinyurl","cutt.ly","rb.gy","goo.gl"];

function getRootDomain(hostname) {
  const parts = hostname.split(".");
  return parts.slice(-2).join(".");
}

function checkLink() {
  const input = document.getElementById("linkInput").value.trim();
  const output = document.getElementById("output");

  try {
    const url = new URL(input);
    const host = url.hostname.toLowerCase();
    const rootDomain = getRootDomain(host);

    let risk = 0;

    // If it is NOT a known legit domain
    if (!legitDomains.some(d => host.endsWith(d))) {
      risk += 2;
    }

    // If brand name appears but domain is different
    legitDomains.forEach(domain => {
      const brand = domain.split(".")[0];
      if (host.includes(brand) && !host.endsWith(domain)) {
        risk += 5;
      }
    });

    scamKeywords.forEach(word => {
      if (host.includes(word)) risk++;
    });

    shorteners.forEach(s => {
      if (host.includes(s)) risk += 4;
    });

    if (host.includes("@")) risk += 5;
    if (/\d+\.\d+\.\d+\.\d+/.test(host)) risk += 5;

    if (risk >= 5) {
      output.innerHTML = "🚨 <b>SCAM LINK DETECTED</b><br>This site is impersonating a real company.";
      output.style.color = "#ff4d4d";
    } else {
      output.innerHTML = "✅ <b>Looks Safe</b><br>No obvious phishing patterns found.";
      output.style.color = "#00ff99";
    }

  } catch {
    output.innerHTML = "⚠️ Invalid URL format";
    output.style.color = "orange";
  }
}
