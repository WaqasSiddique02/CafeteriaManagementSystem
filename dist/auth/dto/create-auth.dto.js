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
exports.ResetPasswordDto = exports.CreateSignUpDto = exports.CreateAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAuthDto {
    email;
    password;
}
exports.CreateAuthDto = CreateAuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'theawais777@gmail.com' }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'awais@1234' }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "password", void 0);
class CreateSignUpDto {
    name;
    email;
    password_hash;
    role;
    stall_id;
}
exports.CreateSignUpDto = CreateSignUpDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Awais' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSignUpDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'theawais777@gmail.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSignUpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'awais@1234' }),
    (0, class_validator_1.IsStrongPassword)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSignUpDto.prototype, "password_hash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Manager' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(['admin', 'cashier', 'manager']),
    __metadata("design:type", String)
], CreateSignUpDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateSignUpDto.prototype, "stall_id", void 0);
class ResetPasswordDto {
    email;
    password_hash;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password_hash", void 0);
//# sourceMappingURL=create-auth.dto.js.map