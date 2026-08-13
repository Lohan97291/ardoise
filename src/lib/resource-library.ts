import type { PrepSheet, ResourceMethod, SubjectKey } from "@/lib/ardoise-data";
import type { AiResourceContext } from "@/lib/ai-resource-context";
import type { PatchedResourceMatch } from "@/lib/resource-tree-patched";

let patchedResourceModulePromise: Promise<typeof import("@/lib/resource-tree-patched")> | null =
  null;
let aiResourceContextModulePromise: Promise<typeof import("@/lib/ai-resource-context")> | null =
  null;

async function loadPatchedResourceModule() {
  if (!patchedResourceModulePromise) {
    patchedResourceModulePromise = import("@/lib/resource-tree-patched");
  }
  return patchedResourceModulePromise;
}

async function loadAiResourceContextModule() {
  if (!aiResourceContextModulePromise) {
    aiResourceContextModulePromise = import("@/lib/ai-resource-context");
  }
  return aiResourceContextModulePromise;
}

export async function loadMergedResourceTree(): Promise<ResourceMethod[]> {
  const module = await loadPatchedResourceModule();
  return module.getMergedResourceTree();
}

export async function loadPatchedPrepSheet(id?: string): Promise<PrepSheet | undefined> {
  const module = await loadPatchedResourceModule();
  return module.getPatchedPrepSheet(id);
}

export async function loadPatchedResourceMatch(
  resourceId?: string,
): Promise<PatchedResourceMatch | undefined> {
  const module = await loadPatchedResourceModule();
  return module.getPatchedResourceMatch(resourceId);
}

export async function loadAiResourceContext(input: {
  subject: SubjectKey;
  title: string;
  resourceId?: string;
  programmingItemId?: string;
}): Promise<AiResourceContext> {
  const module = await loadAiResourceContextModule();
  return module.getAiResourceContext(input);
}

export function emptyAiResourceContext(subject: SubjectKey): AiResourceContext {
  return {
    subject,
    matched: false,
    matchReason:
      "Les repères de ressources seront ajoutés dès qu'une méthode ou une séance associée sera chargée.",
    previousSessions: [],
    nextSessions: [],
    alternativeSessions: [],
  };
}
