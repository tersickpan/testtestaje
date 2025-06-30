async function uploadJsonToGitHubPrompted(mainJson, mediaType) {
  // Check if token is already stored in this session
  let token = sessionStorage.getItem("github_token");

  if (!token) {
    token = prompt("Enter your GitHub Token:");
    if (!token) {
      alert("❌ Upload cancelled — token is required.");
      return;
    }
    sessionStorage.setItem("github_token", token);
  }

  const apiUrl = `https://api.github.com/repos/tersickpan/testtestaje/contents/json/${mediaType}.json`;
  const BRANCH = "main";
  const updatedJson = mainJson[mediaType];

  try {
    // Start loading
    startLoadSpinner();

    const getRes = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if (!getRes.ok) throw new Error("Failed to fetch current file data");

    const fileData = await getRes.json();
    const sha = fileData.sha;

    const jsonString = JSON.stringify(updatedJson, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(jsonString)));

    const updateRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Update ${mediaType} JSON from online`,
        content: base64Content,
        sha: sha,
        branch: BRANCH,
      }),
    });

    if (!updateRes.ok) throw new Error("Failed to update file");

    alert(`✅ ${mediaType} JSON uploaded successfully!`);
  } catch (err) {
    console.error("Upload error:", err);
    alert("❌ Upload failed. Check console for more info.");
  } finally {
    stopLoadSpinner();
  }
}
