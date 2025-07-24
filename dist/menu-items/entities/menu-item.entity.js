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
exports.MenuItem = void 0;
const order_item_entity_1 = require("../../order-items/entities/order-item.entity");
const stall_entity_1 = require("../../stalls/entities/stall.entity");
const typeorm_1 = require("typeorm");
let MenuItem = class MenuItem {
    id;
    stall_id;
    name;
    price;
    is_available = true;
    stall;
    orderItems;
};
exports.MenuItem = MenuItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MenuItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MenuItem.prototype, "stall_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], MenuItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], MenuItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], MenuItem.prototype, "is_available", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stall_entity_1.Stall, (stall) => stall.menuItems, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'stall_id' }),
    __metadata("design:type", stall_entity_1.Stall)
], MenuItem.prototype, "stall", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_entity_1.OrderItem, (orderItem) => orderItem.menuItem),
    __metadata("design:type", Array)
], MenuItem.prototype, "orderItems", void 0);
exports.MenuItem = MenuItem = __decorate([
    (0, typeorm_1.Entity)()
], MenuItem);
//# sourceMappingURL=menu-item.entity.js.map