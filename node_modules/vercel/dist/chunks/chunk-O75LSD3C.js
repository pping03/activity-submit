import { createRequire as __createRequire } from 'node:module';
import { fileURLToPath as __fileURLToPath } from 'node:url';
import { dirname as __dirname_ } from 'node:path';
const require = __createRequire(import.meta.url);
const __filename = __fileURLToPath(import.meta.url);
const __dirname = __dirname_(__filename);
import {
  getCommandName
} from "./chunk-Q2DGFCO7.js";
import {
  output_manager_default
} from "./chunk-QFAS4OVW.js";
import {
  require_source
} from "./chunk-S7KYDPEM.js";
import {
  __toESM
} from "./chunk-TZ2YI2VH.js";

// src/util/validate-ls-args.ts
var import_chalk = __toESM(require_source(), 1);
function validateLsArgs(options) {
  const { commandName, args, maxArgs = 0, exitCode = 1, usageString } = options;
  if (args.length > maxArgs) {
    const usage = usageString || getCommandName(commandName);
    output_manager_default.error(`Invalid number of arguments. Usage: ${import_chalk.default.cyan(usage)}`);
    return exitCode;
  }
  return 0;
}

export {
  validateLsArgs
};
