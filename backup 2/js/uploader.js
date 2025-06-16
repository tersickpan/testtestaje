import { jsonData, githubToken } from './state.js';

export async function uploadJSON(type) {
  const content = JSON.stringify(jsonData[type], null, 2);
  const base64Content = btoa(unescape(encodeURIComponent(content)));

  const repo = 'YOUR_REPO';
  const username = 'YOUR_USERNAME';
  const path = `${type}.json`;

  const shaRes = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`);
  const shaData = await shaRes.json();
  const sha = shaData.sha;

  await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${githubToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: `Update ${type}.json`,
      content: base64Content,
      sha
    })
  });
}