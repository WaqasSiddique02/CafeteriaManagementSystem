"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStallDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_stall_dto_1 = require("./create-stall.dto");
class UpdateStallDto extends (0, swagger_1.PartialType)(create_stall_dto_1.CreateStallDto) {
}
exports.UpdateStallDto = UpdateStallDto;
//# sourceMappingURL=update-stall.dto.js.map