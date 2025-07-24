"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CafeteriaModule = void 0;
const common_1 = require("@nestjs/common");
const cafeteria_service_1 = require("./cafeteria.service");
const cafeteria_controller_1 = require("./cafeteria.controller");
const cafeteria_entity_1 = require("./entities/cafeteria.entity");
const typeorm_1 = require("@nestjs/typeorm");
let CafeteriaModule = class CafeteriaModule {
};
exports.CafeteriaModule = CafeteriaModule;
exports.CafeteriaModule = CafeteriaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cafeteria_entity_1.Cafeteria])],
        controllers: [cafeteria_controller_1.CafeteriaController],
        providers: [cafeteria_service_1.CafeteriaService],
    })
], CafeteriaModule);
//# sourceMappingURL=cafeteria.module.js.map