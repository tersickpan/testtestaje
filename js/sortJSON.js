function sortByTimestamp(jsonData, order = "asc") {
  // Step 1: Convert to array of [key, value] pairs
  const entries = Object.entries(jsonData);

  // Step 2: Sort based on timestamp
  entries.sort((a, b) => {
    const t1 = new Date(a[1].timestamp);
    const t2 = new Date(b[1].timestamp);
    return order === "asc" ? t1 - t2 : t2 - t1;
  });

  // Step 3: Convert back to object
  const sortedObject = Object.fromEntries(entries);
  return sortedObject;
}
