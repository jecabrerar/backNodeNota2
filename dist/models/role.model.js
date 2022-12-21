"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const rolesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true]
    }
});
;
exports.Role = (0, mongoose_1.model)('Role', rolesSchema);
