const tradeBody = document.querySelector("#tradeBody");
const summaryBody = document.querySelector("#summaryBody");
const symbolFilter = document.querySelector("#symbolFilter");
const sideFilter = document.querySelector("#sideFilter");
const reloadButton = document.querySelector("#reloadButton");
const status = document.querySelector("#status");
const error = document.querySelector("#error");

async function loadTrades() {
  status.textContent = "Loading trades...";
  error.textContent = "";

  const params = new URLSearchParams();

  if (symbolFilter.value.trim()) {
    params.set("instrument", symbolFilter.value.trim());
  }

  if (sideFilter.value) {
    params.set("side", sideFilter.value);
  }

  params.set("page", "1");
  params.set("limit", "20");

  try {
    const response = await fetch(`/api/trades?${params.toString()}`);
    const payload = await response.json();

    tradeBody.innerHTML = payload.data.map((trade) => `
      <tr>
        <td>${trade.id}</td>
        <td>${trade.symbol}</td>
        <td>${trade.side}</td>
        <td>${trade.price}</td>
        <td>${trade.quantity}</td>
        <td>${trade.broker}</td>
      </tr>
    `).join("");

    status.textContent = `${payload.data.length} trades loaded`;
  } catch (err) {
    error.textContent = "Unable to load trades.";
    status.textContent = "";
    console.error(err);
  }
}

async function loadSummary() {
  try {
    const response = await fetch("/api/summary");
    const summary = await response.json();

    summaryBody.innerHTML = summary.map((row) => `
      <tr>
        <td>${row.symbol}</td>
        <td>${row.bestBid ?? "-"}</td>
        <td>${row.bestAsk ?? "-"}</td>
        <td>${row.totalQuantity}</td>
        <td>${row.tradeCount}</td>
      </tr>
    `).join("");
  } catch (err) {
    error.textContent = "Unable to load summary.";
    console.error(err);
  }
}

reloadButton.addEventListener("click", () => {
  loadTrades();
  loadSummary();
});

symbolFilter.addEventListener("input", loadTrades);
sideFilter.addEventListener("change", loadTrades);

loadTrades();
loadSummary();
