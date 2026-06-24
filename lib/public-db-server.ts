import "server-only";

import { adminDb } from "./firebase-admin";
import { withRetry } from "./retry";
import { cache } from "react";

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

export const getPublicCollectionData = cache(async function getPublicCollectionData<
  T = Record<string, unknown>,
>(collectionName: string): Promise<T[]> {
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
});