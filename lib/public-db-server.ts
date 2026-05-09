import "server-only";

import { adminDb } from "./firebase-admin";

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
};

type PublicCollectionName = keyof typeof publicCollectionConfigs;

function isPublicCollectionName(collectionName: string): collectionName is PublicCollectionName {
  return collectionName in publicCollectionConfigs;
}

export async function getPublicCollectionData<T = Record<string, unknown>>(
  collectionName: string
): Promise<T[]> {
  if (!isPublicCollectionName(collectionName)) {
    throw new Error(`Unsupported public collection: ${collectionName}`);
  }

  const config = publicCollectionConfigs[collectionName];
  const snapshot = await adminDb.collection(collectionName).get();

  const docs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Array<T & Record<string, unknown>>;

  const filteredDocs = config.filters
    ? docs.filter((doc) => config.filters!.every((filter) => doc[filter.field] === filter.value))
    : docs;

  filteredDocs.sort((left, right) => {
    const leftValue = left[config.orderByField];
    const rightValue = right[config.orderByField];

    if (leftValue == null && rightValue == null) return 0;
    if (leftValue == null) return 1;
    if (rightValue == null) return -1;

    if (leftValue < rightValue) {
      return config.orderDirection === "asc" ? -1 : 1;
    }

    if (leftValue > rightValue) {
      return config.orderDirection === "asc" ? 1 : -1;
    }

    return 0;
  });

  return filteredDocs as T[];
}