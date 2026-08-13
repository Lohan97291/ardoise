import type { ResourceMethod } from "@/lib/ardoise-data";
import { getGeneratedPrepSheet, getGeneratedResourceTree } from "@/lib/generated-resources-storage";
import type { ResourceSequence, ResourceSession } from "@/lib/ardoise-data";
import { getPatchedPrepSheet } from "@/lib/patched-prep-sheets";
import { PATCHED_RESOURCE_TREE } from "@/lib/patched-resource-methods";

export { getPatchedPrepSheet } from "@/lib/patched-prep-sheets";
export { PATCHED_RESOURCE_TREE } from "@/lib/patched-resource-methods";

export function getMergedResourceTree(): ResourceMethod[] {
  return [...PATCHED_RESOURCE_TREE, ...getGeneratedResourceTree()];
}

export type PatchedResourceMatch = {
  method: ResourceMethod;
  sequence: ResourceSequence;
  session: ResourceSession;
};

export function getPatchedResourceMatch(resourceId?: string): PatchedResourceMatch | undefined {
  if (!resourceId) return undefined;

  for (const method of getMergedResourceTree()) {
    for (const sequence of method.sequences) {
      const session = sequence.sessions.find((item) => item.id === resourceId);
      if (session) {
        return { method, sequence, session };
      }
    }
  }

  return undefined;
}
