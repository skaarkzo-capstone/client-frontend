export async function evaluateCompany(companyName: string): Promise<any> {
  const response = await fetch("http://localhost:8000/api/main/search/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ companyName }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return await response.json();
}
