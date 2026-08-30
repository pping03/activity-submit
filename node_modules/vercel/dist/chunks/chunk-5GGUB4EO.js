import { createRequire as __createRequire } from 'node:module';
import { fileURLToPath as __fileURLToPath } from 'node:url';
import { dirname as __dirname_ } from 'node:path';
const require = __createRequire(import.meta.url);
const __filename = __fileURLToPath(import.meta.url);
const __dirname = __dirname_(__filename);

// src/commands/traces/scope-resolver.ts
var MISSING_BOTH_MESSAGE = "No linked project found. Run `vercel link`, pass --cwd to a linked dir, or use --scope <team> and --project <name>.";
function resolveScope({
  flags = {},
  linkedProject
}) {
  const flagScope = flags.scope?.trim() || void 0;
  const flagProject = flags.project?.trim() || void 0;
  if (linkedProject.status === "linked") {
    return {
      teamId: flagScope ?? linkedProject.org.id,
      projectId: flagProject ?? linkedProject.project.id
    };
  }
  if (flagScope && flagProject) {
    return { teamId: flagScope, projectId: flagProject };
  }
  return { message: MISSING_BOTH_MESSAGE };
}

export {
  MISSING_BOTH_MESSAGE,
  resolveScope
};
