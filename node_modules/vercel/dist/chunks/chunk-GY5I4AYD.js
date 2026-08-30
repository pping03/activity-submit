import { createRequire as __createRequire } from 'node:module';
import { fileURLToPath as __fileURLToPath } from 'node:url';
import { dirname as __dirname_ } from 'node:path';
const require = __createRequire(import.meta.url);
const __filename = __fileURLToPath(import.meta.url);
const __dirname = __dirname_(__filename);
import {
  formatOption,
  jsonOption,
  packageName,
  projectOption
} from "./chunk-Q2DGFCO7.js";

// src/commands/traces/config/command.ts
var RULE_ENVIRONMENTS = ["any", "preview", "production"];
var lsSubcommand = {
  name: "ls",
  aliases: ["list"],
  description: "List the trace sampling rules for a project",
  arguments: [],
  options: [formatOption, jsonOption, projectOption],
  examples: [
    {
      name: "List the sampling rules for the linked project",
      value: `${packageName} traces config ls`
    },
    {
      name: "List the sampling rules as JSON",
      value: `${packageName} traces config ls --json`
    }
  ]
};
var setSubcommand = {
  name: "set",
  aliases: [],
  description: "Add or replace one trace sampling rule. The rate is a whole percentage from 1 to 100.",
  arguments: [
    { name: "environment", required: true },
    { name: "rate", required: true },
    { name: "requestPath", required: false }
  ],
  options: [formatOption, jsonOption, projectOption],
  examples: [
    {
      name: "Trace a quarter of production traffic",
      value: `${packageName} traces config set production 25`
    },
    {
      name: "Trace every preview request to one path prefix",
      value: `${packageName} traces config set preview 100 /api`
    },
    {
      name: "Trace one percent of traffic in every environment",
      value: `${packageName} traces config set any 1`
    }
  ]
};
var rmSubcommand = {
  name: "rm",
  aliases: ["remove", "delete"],
  description: "Remove trace sampling rules. Without a path prefix, every rule for the environment is removed.",
  arguments: [
    { name: "environment", required: true },
    { name: "requestPath", required: false }
  ],
  options: [
    {
      name: "default",
      shorthand: null,
      type: Boolean,
      deprecated: false,
      description: "Remove only the rule that has no path prefix, keeping the per-path rules"
    },
    formatOption,
    jsonOption,
    projectOption
  ],
  examples: [
    {
      name: "Remove one rule by environment and path prefix",
      value: `${packageName} traces config rm production /api`
    },
    {
      name: "Remove every rule for production",
      value: `${packageName} traces config rm production`
    },
    {
      name: "Remove only the production rule that covers all paths",
      value: `${packageName} traces config rm production --default`
    }
  ]
};
var tracesConfigCommand = {
  name: "config",
  aliases: [],
  description: "Manage trace sampling rules for a Vercel project.",
  arguments: [],
  subcommands: [lsSubcommand, setSubcommand, rmSubcommand],
  options: [],
  examples: [
    {
      name: "List the sampling rules for the linked project",
      value: `${packageName} traces config ls`
    },
    {
      name: "Trace a quarter of production traffic",
      value: `${packageName} traces config set production 25`
    },
    {
      name: "Remove every rule for production",
      value: `${packageName} traces config rm production`
    }
  ]
};

export {
  RULE_ENVIRONMENTS,
  lsSubcommand,
  setSubcommand,
  rmSubcommand,
  tracesConfigCommand
};
