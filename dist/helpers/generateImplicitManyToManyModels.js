"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImplicitManyToManyModels = exports.getModelByType = void 0;
const sorted_1 = require("../utils/sorted");
const getModelByType = (models, type) => {
    return models.find((model) => model.name === type);
};
exports.getModelByType = getModelByType;
function generateImplicitManyToManyModels(models) {
    const manyToManyFields = filterManyToManyRelationFields(models);
    if (manyToManyFields.length === 0) {
        return [];
    }
    return generateModels(manyToManyFields, models, []);
}
exports.generateImplicitManyToManyModels = generateImplicitManyToManyModels;
function generateModels(manyToManyFields, models, manyToManyTables = []) {
    const manyFirst = manyToManyFields.shift();
    if (!manyFirst) {
        return manyToManyTables;
    }
    const manySecond = manyToManyFields.find((field) => field.relationName === manyFirst.relationName);
    if (!manySecond) {
        return manyToManyTables;
    }
    manyToManyTables.push({
        dbName: `_${manyFirst.relationName}`,
        name: manyFirst.relationName || "",
        primaryKey: null,
        uniqueFields: [],
        uniqueIndexes: [],
        fields: generateJoinFields([manyFirst, manySecond], models),
    });
    return generateModels(manyToManyFields.filter((field) => field.relationName !== manyFirst.relationName), models, manyToManyTables);
}
function generateJoinFields(fields, models) {
    if (fields.length !== 2)
        throw new Error("Huh?");
    const sortedFields = (0, sorted_1.sorted)(fields, (a, b) => a.name.localeCompare(b.name));
    const A = sortedFields[0];
    const B = sortedFields[1];
    return [
        {
            name: "A",
            type: getJoinIdType(A, models),
            kind: "scalar",
            isRequired: true,
            isList: false,
            isUnique: false,
            isId: false,
            isReadOnly: true,
            hasDefaultValue: false,
        },
        {
            name: "B",
            type: getJoinIdType(B, models),
            kind: "scalar",
            isRequired: true,
            isList: false,
            isUnique: false,
            isId: false,
            isReadOnly: true,
            hasDefaultValue: false,
        },
    ];
}
function getJoinIdType(joinField, models) {
    const joinedModel = models.find((m) => m.name === joinField.type);
    if (!joinedModel)
        throw new Error("Could not find referenced model");
    const idField = joinedModel.fields.find((f) => f.isId);
    if (!idField)
        throw new Error("No ID field on referenced model");
    return idField.type;
}
function filterManyToManyRelationFields(models) {
    return models
        .map((model) => model.fields
        .filter((field) => {
        var _a, _b;
        return field.relationName &&
            field.isList &&
            ((_a = field.relationFromFields) === null || _a === void 0 ? void 0 : _a.length) === 0 &&
            ((_b = field.relationToFields) === null || _b === void 0 ? void 0 : _b.length) === 0;
    })
        .map((field) => field))
        .flat();
}
//# sourceMappingURL=generateImplicitManyToManyModels.js.map