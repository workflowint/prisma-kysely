"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTypedReferenceNode = void 0;
const typescript_1 = __importDefault(require("typescript"));
const generateTypedReferenceNode = (name) => {
    return typescript_1.default.factory.createTypeAliasDeclaration([typescript_1.default.factory.createModifier(typescript_1.default.SyntaxKind.ExportKeyword)], name, undefined, typescript_1.default.factory.createTypeReferenceNode(`(typeof ${name})[keyof typeof ${name}]`, undefined));
};
exports.generateTypedReferenceNode = generateTypedReferenceNode;
//# sourceMappingURL=generateTypedReferenceNode.js.map