import type { ResourceMethod } from "@/lib/ardoise-data";
import {
  FIRST_SCHOOL_DAY_RESOURCE_METHOD,
  getFirstSchoolDayPrepSheet,
} from "@/lib/first-school-day-resources";
import { getGeneratedPrepSheet, getGeneratedResourceTree } from "@/lib/generated-resources-storage";
import type { ResourceSequence, ResourceSession } from "@/lib/ardoise-data";
import { getPatchedPrepSheet as getBasePatchedPrepSheet } from "@/lib/patched-prep-sheets";
import { PATCHED_RESOURCE_TREE } from "@/lib/patched-resource-methods";

export function getPatchedPrepSheet(id?: string) {
  return getFirstSchoolDayPrepSheet(id) ?? getBasePatchedPrepSheet(id);
}
export { PATCHED_RESOURCE_TREE } from "@/lib/patched-resource-methods";

export function getMergedResourceTree(): ResourceMethod[] {
  return [FIRST_SCHOOL_DAY_RESOURCE_METHOD, ...PATCHED_RESOURCE_TREE, ...getGeneratedResourceTree()];
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
