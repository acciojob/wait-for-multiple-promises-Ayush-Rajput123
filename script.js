const output = document.getElementById("output");

const loadingRow = document.createElement("tr");
loadingRow.id = "loading";
loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
output.appendChild(loadingRow);

function createPromise(index) {
  return new Promise((resolve) => {
    const delay = Math.random() * 2 + 1; 
    const start = performance.now();

    setTimeout(() => {
      const end = performance.now();
      const timeTaken = (end - start) / 1000; 
      resolve({ name: `Promise ${index}`, timeTaken });
    }, delay * 1000);
  });
}

const overallStart = performance.now();

const promises = [createPromise(1), createPromise(2), createPromise(3)];

Promise.all(promises).then((results) => {
  output.innerHTML = "";

  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.timeTaken.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  const overallEnd = performance.now();
  const totalTime = (overallEnd - overallStart) / 1000;

  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${totalTime.toFixed(3)}</strong></td>
  `;
  output.appendChild(totalRow);
});
