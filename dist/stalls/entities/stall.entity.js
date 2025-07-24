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
exports.Stall = void 0;
const cafeteria_entity_1 = require("../../cafeteria/entities/cafeteria.entity");
const menu_item_entity_1 = require("../../menu-items/entities/menu-item.entity");
const order_entity_1 = require("../../orders/entities/order.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let Stall = class Stall {
    id;
    cafeteria_id;
    name;
    university_share_percent;
    cafeteria;
    users;
    menuItems;
    orders;
};
exports.Stall = Stall;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Stall.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stall.prototype, "cafeteria_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Stall.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 10.0 }),
    __metadata("design:type", Number)
], Stall.prototype, "university_share_percent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cafeteria_entity_1.Cafeteria, (cafeteria) => cafeteria.stalls, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'cafeteria_id' }),
    __metadata("design:type", cafeteria_entity_1.Cafeteria)
], Stall.prototype, "cafeteria", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.stall),
    __metadata("design:type", Array)
], Stall.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => menu_item_entity_1.MenuItem, (menuItem) => menuItem.stall),
    __metadata("design:type", Array)
], Stall.prototype, "menuItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.stall),
    __metadata("design:type", Array)
], Stall.prototype, "orders", void 0);
exports.Stall = Stall = __decorate([
    (0, typeorm_1.Entity)('stalls')
], Stall);
//# sourceMappingURL=stall.entity.js.map