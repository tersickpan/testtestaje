export function renderJSON(data) {
  const output = document.getElementById('json-output');
  if (output) output.textContent = JSON.stringify(data, null, 2);
}