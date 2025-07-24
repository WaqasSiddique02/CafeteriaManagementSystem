"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StallsController = void 0;
const common_1 = require("@nestjs/common");
const stalls_service_1 = require("./stalls.service");
const create_stall_dto_1 = require("./dto/create-stall.dto");
const update_stall_dto_1 = require("./dto/update-stall.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../auth/authorization/roles.guard");
const roles_decorator_1 = require("../auth/authorization/roles.decorator");
const role_enum_1 = require("../auth/authorization/role.enum");
let StallsController = class StallsController {
    stallsService;
    constructor(stallsService) {
        this.stallsService = stallsService;
    }
    create(createStallDto) {
        return this.stallsService.create(createStallDto);
    }
    findAll() {
        return this.stallsService.findAll();
    }
    findOne(id) {
        return this.stallsService.findOne(+id);
    }
    update(id, updateStallDto) {
        return this.stallsService.update(+id, updateStallDto);
    }
    remove(id) {
        return this.stallsService.remove(+id);
    }
};
exports.StallsController = StallsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stall_dto_1.CreateStallDto]),
    __metadata("design:returntype", void 0)
], StallsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager, role_enum_1.Role.Cashier),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StallsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager, role_enum_1.Role.Cashier),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StallsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_stall_dto_1.UpdateStallDto]),
    __metadata("design:returntype", void 0)
], StallsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StallsController.prototype, "remove", null);
exports.StallsController = StallsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('stalls'),
    __metadata("design:paramtypes", [stalls_service_1.StallsService])
], StallsController);
//# sourceMappingURL=stalls.controller.js.map