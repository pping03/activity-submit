//#region src/constants.d.ts
type RUNTIMES = "node26" | "node24" | "node22" | "python3.13";
type ManagedImage = "universal" | "node:22" | "node:24" | "node:26" | "python:3.14" | "ubuntu" | "arch";
/**
 * Regions a sandbox can run in. More regions may become available, so any
 * other region string is accepted too.
 */
type SandboxRegion = "iad1" | "sfo1" | "cle1" | "cdg1" | (string & {});
/**
 * Region a sandbox runs in when none is requested.
 */
declare const DEFAULT_SANDBOX_REGION = "iad1";
//#endregion
export { DEFAULT_SANDBOX_REGION, ManagedImage, RUNTIMES, SandboxRegion };
//# sourceMappingURL=constants.d.cts.map