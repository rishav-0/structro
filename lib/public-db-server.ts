import "server-only";

import { adminDb } from "./firebase-admin";
import { withRetry } from "./retry";
import { unstable_cache } from "next/cache";

type PublicCollectionConfig = {
  orderByField: string;
  orderDirection: "asc" | "desc";
  filters?: Array<{
    field: string;
    value: string;
  }>;
};

const publicCollectionConfigs: Record<string, PublicCollectionConfig> = {
  blogs: {
    orderByField: "createdAt",
    orderDirection: "desc" as const,
    filters: [{ field: "status", value: "published" }],
  },
  "new-launches": {
    orderByField: "createdAt",
    orderDirection: "desc" as const,
    filters: [{ field: "status", value: "active" }],
  },
  careers: {
    orderByField: "createdAt",
    orderDirection: "desc" as const,
  },
  products: {
    orderByField: "title",
    orderDirection: "asc" as const,
  },
  projects: {
    orderByField: "title",
    orderDirection: "asc" as const,
  },
  services: {
    orderByField: "title",
    orderDirection: "asc" as const,
  },
  faqs: {
    orderByField: "order",
    orderDirection: "asc" as const,
    filters: [{ field: "status", value: "active" }],
  },
  brochures: {
    orderByField: "createdAt",
    orderDirection: "desc" as const,
  },
};

type PublicCollectionName = keyof typeof publicCollectionConfigs;

function isPublicCollectionName(collectionName: string): collectionName is PublicCollectionName {
  return collectionName in publicCollectionConfigs;
}

/**
 * Fetches data from a Firestore collection with proper Next.js caching + tag-based revalidation.
 *
 * Uses `unstable_cache` with tags so that admin mutations can call `revalidateTag`
 * to bust the cache on-demand — this is what makes Vercel deployments update immediately
 * after admin changes, instead of waiting for the ISR revalidation timer.
 */
async function fetchCollectionFromFirestore<T = Record<string, unknown>>(
  collectionName: string
): Promise<T[]> {
  if (!isPublicCollectionName(collectionName)) {
    throw new Error(`Unsupported public collection: ${collectionName}`);
  }

  const config = publicCollectionConfigs[collectionName];

  const docs = await withRetry(async () => {
    let ref: FirebaseFirestore.Query | FirebaseFirestore.CollectionReference =
      adminDb.collection(collectionName);

    ref = ref.orderBy(config.orderByField, config.orderDirection);

    const snapshot = await ref.get();
    let results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as Array<T & Record<string, unknown>>;

    if (config.filters) {
      for (const filter of config.filters) {
        results = results.filter(
          (doc) => doc[filter.field] === filter.value
        );
      }
    }

    return results;
  });

  return docs as T[];
}

/**
 * Get public collection data with Next.js Data Cache (tag-based revalidation).
 *
 * Each collection is tagged with both `"public-data"` (global) and
 * `"collection-{name}"` (per-collection) for granular invalidation.
 *
 * Cache revalidates every 60 seconds as a safety net, but admin mutations
 * trigger immediate revalidation via `revalidateTag`.
 */
export function getPublicCollectionData<T = Record<string, unknown>>(
  collectionName: string
): Promise<T[]> {
  if (!isPublicCollectionName(collectionName)) {
    throw new Error(`Unsupported public collection: ${collectionName}`);
  }

  const cachedFetch = unstable_cache(
    () => fetchCollectionFromFirestore<T>(collectionName),
    [`public-collection-${collectionName}`],
    {
      tags: ["public-data", `collection-${collectionName}`],
      revalidate: 60, // Safety net: refetch every 60s even without explicit revalidation
    }
  );

  return cachedFetch();
}