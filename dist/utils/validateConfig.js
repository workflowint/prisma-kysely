"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = exports.configValidator = void 0;
const internals_1 = require("@prisma/internals");
const zod_1 = __importDefault(require("zod"));
const booleanStringLiteral = zod_1.default
    .union([zod_1.default.boolean(), zod_1.default.literal("true"), zod_1.default.literal("false")])
    .transform((arg) => {
    if (typeof arg === "boolean")
        return arg;
    return arg === "true";
});
exports.configValidator = zod_1.default
    .object({
    databaseProvider: zod_1.default.union([
        zod_1.default.literal("postgresql"),
        zod_1.default.literal("cockroachdb"),
        zod_1.default.literal("mysql"),
        zod_1.default.literal("sqlite"),
        zod_1.default.literal("sqlserver"),
    ]),
    fileName: zod_1.default.string().optional().default("types.ts"),
    enumFileName: zod_1.default.string().optional(),
    stringTypeOverride: zod_1.default.string().optional(),
    booleanTypeOverride: zod_1.default.string().optional(),
    intTypeOverride: zod_1.default.string().optional(),
    bigIntTypeOverride: zod_1.default.string().optional(),
    floatTypeOverride: zod_1.default.string().optional(),
    decimalTypeOverride: zod_1.default.string().optional(),
    dateTimeTypeOverride: zod_1.default.string().optional(),
    jsonTypeOverride: zod_1.default.string().optional(),
    bytesTypeOverride: zod_1.default.string().optional(),
    unsupportedTypeOverride: zod_1.default.string().optional(),
    camelCase: booleanStringLiteral.default(false),
    readOnlyIds: booleanStringLiteral.default(false),
})
    .strict()
    .transform((config) => {
    if (!config.enumFileName) {
        config.enumFileName = config.fileName;
    }
    return config;
});
const validateConfig = (config) => {
    const parsed = exports.configValidator.safeParse(config);
    if (!parsed.success) {
        internals_1.logger.error("Invalid prisma-kysely config");
        Object.entries(parsed.error.flatten().fieldErrors).forEach(([key, value]) => {
            internals_1.logger.error(`${key}: ${value.join(", ")}`);
        });
        Object.values(parsed.error.flatten().formErrors).forEach((value) => {
            internals_1.logger.error(`${value}`);
        });
        process.exit(1);
    }
    return parsed.data;
};
exports.validateConfig = validateConfig;
//# sourceMappingURL=validateConfig.js.map