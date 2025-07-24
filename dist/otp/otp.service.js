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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nodemailer = require("nodemailer");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
let OtpService = class OtpService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    async sendOtp(email, otp) {
        await this.transporter.sendMail({
            from: `"Cafe Management" <${process.env.MAIL_USER}>`,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
        });
    }
    async requestOtp(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);
        console.log('Generated OTP expires at (UTC):', expiresAt.toISOString());
        await this.userRepository.update({ email }, {
            otp_code: otp,
            otp_expires_at: expiresAt,
        });
        await this.sendOtp(user.email, otp);
        return { message: 'OTP sent to your email' };
    }
    async verifyOtp(email, otp) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!user.otp_code || !user.otp_expires_at) {
            throw new common_1.BadRequestException('No OTP requested or expired');
        }
        if (user.otp_code !== otp) {
            throw new common_1.BadRequestException('Invalid OTP');
        }
        const now = new Date();
        const otpExpiresAt = new Date(user.otp_expires_at);
        console.log('Now:', now.toISOString());
        console.log('OTP Expires At:', otpExpiresAt.toISOString());
        if (Date.now() > otpExpiresAt.getTime()) {
            throw new common_1.BadRequestException('OTP has expired');
        }
        await this.userRepository.query(`UPDATE users SET otp_code = NULL, otp_expires_at = NULL WHERE email = $1`, [email]);
        return { message: 'OTP verified successfully' };
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OtpService);
//# sourceMappingURL=otp.service.js.map