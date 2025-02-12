"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFieldType = exports.generateFieldTypeInner = exports.overrideType = exports.sqlServerTypeMap = exports.postgresqlTypeMap = exports.mysqlTypeMap = exports.sqliteTypeMap = void 0;
exports.sqliteTypeMap = {
    BigInt: "number",
    Boolean: "number",
    Bytes: "Buffer",
    DateTime: "string",
    Decimal: "number",
    Float: "number",
    Int: "number",
    String: "string",
    Unsupported: "unknown",
};
exports.mysqlTypeMap = {
    BigInt: "number",
    Boolean: "number",
    Bytes: "Buffer",
    DateTime: "Timestamp",
    Decimal: "string",
    Float: "number",
    Int: "number",
    Json: "unknown",
    String: "string",
    Unsupported: "unknown",
};
exports.postgresqlTypeMap = {
    BigInt: "string",
    Boolean: "boolean",
    Bytes: "Buffer",
    DateTime: "Timestamp",
    Decimal: "string",
    Float: "number",
    Int: "number",
    Json: "unknown",
    String: "string",
    Unsupported: "unknown",
};
exports.sqlServerTypeMap = {
    BigInt: "number",
    Boolean: "boolean",
    Bytes: "Buffer",
    DateTime: "Timestamp",
    Decimal: "string",
    Float: "number",
    Int: "number",
    Json: "unknown",
    String: "string",
    Unsupported: "unknown",
};
const overrideType = (type, config) => {
    switch (type) {
        case "String":
            return config.stringTypeOverride;
        case "DateTime":
            return config.dateTimeTypeOverride;
        case "Boolean":
            return config.booleanTypeOverride;
        case "BigInt":
            return config.bigIntTypeOverride;
        case "Int":
            return config.intTypeOverride;
        case "Float":
            return config.floatTypeOverride;
        case "Decimal":
            return config.decimalTypeOverride;
        case "Bytes":
            return config.bytesTypeOverride;
        case "Json":
            return config.jsonTypeOverride;
        case "Unsupported":
            return config.unsupportedTypeOverride;
    }
};
exports.overrideType = overrideType;
const generateFieldTypeInner = (type, config, typeOverride) => {
    switch (config.databaseProvider) {
        case "sqlite":
            return typeOverride || (0, exports.overrideType)(type, config) || exports.sqliteTypeMap[type];
        case "mysql":
            return typeOverride || (0, exports.overrideType)(type, config) || exports.mysqlTypeMap[type];
        case "postgresql":
            return (typeOverride || (0, exports.overrideType)(type, config) || exports.postgresqlTypeMap[type]);
        case "cockroachdb":
            return (typeOverride || (0, exports.overrideType)(type, config) || exports.postgresqlTypeMap[type]);
        case "sqlserver":
            return (typeOverride || (0, exports.overrideType)(type, config) || exports.sqlServerTypeMap[type]);
    }
};
exports.generateFieldTypeInner = generateFieldTypeInner;
const generateFieldType = (type, config, typeOverride) => {
    const fieldType = (0, exports.generateFieldTypeInner)(type, config, typeOverride || null);
    if (!fieldType)
        throw new Error(`Unsupported type ${type} for database ${config.databaseProvider}`);
    return fieldType;
};
exports.generateFieldType = generateFieldType;
//# sourceMappingURL=generateFieldType.js.map