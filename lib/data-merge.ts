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

export function mergeData<T extends { id: string | number }>(
  hardcoded: T[],
  fromDb: T[],
  idField: keyof T = "id"
): (T & { source: "hardcoded" | "database" })[] {
  const merged = new Map<string, T & { source: "hardcoded" | "database" }>();

  hardcoded.forEach((item) => {
    const key = String(item[idField]);
    if (!merged.has(key)) {
      merged.set(key, { ...item, source: "hardcoded" });
    }
  });

  fromDb.forEach((item) => {
    const key = String(item[idField]);
    merged.set(key, { ...item, source: "database" });
  });

  return Array.from(merged.values());
}

export function filterBySource<T extends { source: "hardcoded" | "database" }>(
  data: T[],
  source: "hardcoded" | "database" | "all"
): T[] {
  if (source === "all") return data;
  return data.filter((item) => item.source === source);
}