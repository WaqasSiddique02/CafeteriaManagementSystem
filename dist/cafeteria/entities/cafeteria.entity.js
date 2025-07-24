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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cafeteria = void 0;
const stall_entity_1 = require("../../stalls/entities/stall.entity");
const typeorm_1 = require("typeorm");
let Cafeteria = class Cafeteria {
    id;
    name;
    location;
    stalls;
};
exports.Cafeteria = Cafeteria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cafeteria.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Cafeteria.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Cafeteria.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stall_entity_1.Stall, (stall) => stall.cafeteria),
    __metadata("design:type", Array)
], Cafeteria.prototype, "stalls", void 0);
exports.Cafeteria = Cafeteria = __decorate([
    (0, typeorm_1.Entity)('cafeterias')
], Cafeteria);
//# sourceMappingURL=cafeteria.entity.js.map