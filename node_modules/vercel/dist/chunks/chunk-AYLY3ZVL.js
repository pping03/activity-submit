import { createRequire as __createRequire } from 'node:module';
import { fileURLToPath as __fileURLToPath } from 'node:url';
import { dirname as __dirname_ } from 'node:path';
const require = __createRequire(import.meta.url);
const __filename = __fileURLToPath(import.meta.url);
const __dirname = __dirname_(__filename);
import {
  parseRetryAfterHeaderAsMillis,
  require_bytes
} from "./chunk-BMKU5KEL.js";
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

// src/util/output/error.ts
var import_chalk = __toESM(require_source(), 1);

// src/util/error.ts
var import_bytes = __toESM(require_bytes(), 1);
async function responseError(res, fallbackMessage = null, parsedBody = {}) {
  let message = "";
  let bodyError;
  if (res.status >= 400 && res.status < 500) {
    let body;
    try {
      body = await res.json();
    } catch (_err) {
      body = parsedBody;
    }
    bodyError = body.error || body.err || {};
    message = bodyError.message;
  }
  if (!message) {
    message = fallbackMessage === null ? "Response Error" : fallbackMessage;
  }
  const err = new Error(`${message} (${res.status})`);
  err.status = res.status;
  err.serverMessage = message;
  if (bodyError) {
    for (const field of Object.keys(bodyError)) {
      if (field !== "message") {
        err[field] = bodyError[field];
      }
    }
  }
  if (res.status === 429 || res.status === 503) {
    const parsed = parseRetryAfterHeaderAsMillis(
      res.headers.get("Retry-After")
    );
    err.retryAfterMs = parsed ?? (res.status === 429 ? 0 : void 0);
  }
  return err;
}
function toEnumerableError(err) {
  const enumerable = {};
  enumerable.name = err.name;
  for (const key of Object.getOwnPropertyNames(err)) {
    enumerable[key] = err[key];
  }
  return enumerable;
}
function printError(error2) {
  if (typeof error2 === "string") {
    error2 = new Error(error2);
  }
  const apiError = error2;
  const { message, stack, status, code, sizeLimit } = apiError;
  output_manager_default.debug(`handling error: ${stack}`);
  if (message === "User force closed the prompt with 0 null") {
    return;
  }
  if (status === 403) {
    output_manager_default.error(
      message || `Authentication error. Run ${getCommandName("login")} to log-in again.`
    );
  } else if (status === 429) {
    output_manager_default.error(message);
  } else if (code === "size_limit_exceeded") {
    output_manager_default.error(`File size limit exceeded (${(0, import_bytes.default)(sizeLimit)})`);
  } else if (message) {
    output_manager_default.prettyError(apiError);
  } else if (status === 500) {
    output_manager_default.error("Unexpected server error. Please retry.");
  } else if (code === "USER_ABORT") {
    output_manager_default.log("Canceled");
  } else {
    output_manager_default.error(`Unexpected error. Please try again later. (${message})`);
  }
}

export {
  responseError,
  toEnumerableError,
  printError
};
