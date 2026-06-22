export async function getCollectionData<T = Record<string, unknown>>(
  collectionName: string
): Promise<T[]> {
  try {
    const response = await fetch(`/api/public-data/${encodeURIComponent(collectionName)}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${collectionName}: ${response.status}`);
    }

    return (await response.json()) as T[];
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
}