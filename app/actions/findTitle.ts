// In a separate file, e.g., `app/actions/search.ts`
'use server'

export default async function findTitle(title: string) {
  const url = "https://www.searchapi.io/api/v1/search";
  const params = new URLSearchParams({
    engine: "youtube",
    q: title,
    api_key: "dqEier7vcs4Kn5BuCzcRGDep"
  });

  try {
    // Use fetch instead of Axios
    const response = await fetch(`${url}?${params}`, {
      method: 'GET',
      // Next.js can cache this response. Remove to get fresh data every time.
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching from YouTube:', error);
    throw error; // Re-throw to handle in your UI
  }
}