export const fetchData = async (sheetName) => {
  const url = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
  if (!url) {
    console.error("Missing NEXT_PUBLIC_SHEETS_WEBHOOK_URL");
    return [];
  }
  try {
    const res = await fetch(`${url}?sheet=${sheetName}`, {
      method: "GET",
      cache: 'no-store', // Always get fresh data
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    return [];
  }
};

export const saveToSheet = async (sheetName, rowData) => {
  const url = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
  if (!url) {
    console.error("Missing NEXT_PUBLIC_SHEETS_WEBHOOK_URL");
    return false;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        sheet: sheetName,
        row: rowData,
      }),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
    return true;
  } catch (error) {
    console.error(`Error saving to ${sheetName}:`, error);
    return false;
  }
};
