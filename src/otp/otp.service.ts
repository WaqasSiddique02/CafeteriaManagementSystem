import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async sendOtp(email: string, otp: string) {
    await this.transporter.sendMail({
      from: `"Cafe Management" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
    });
  }

  async requestOtp(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes from now (UTC)

    // Debug: Log the expiration time
    console.log('Generated OTP expires at (UTC):', expiresAt.toISOString());

    await this.userRepository.update(
      { email },
      {
        otp_code: otp,
        otp_expires_at: expiresAt, // TypeORM will store this in UTC
      },
    );

    await this.sendOtp(user.email, otp);
    return { message: 'OTP sent to your email' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('User not found');
    if (!user.otp_code || !user.otp_expires_at) {
      throw new BadRequestException('No OTP requested or expired');
    }
    if (user.otp_code !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    const now = new Date();
    const otpExpiresAt = new Date(user.otp_expires_at);

    console.log('Now:', now.toISOString());
    console.log('OTP Expires At:', otpExpiresAt.toISOString());

    if (Date.now() > otpExpiresAt.getTime()) {
      throw new BadRequestException('OTP has expired');
    }

    await this.userRepository.query(
      `UPDATE users SET otp_code = NULL, otp_expires_at = NULL WHERE email = $1`,
      [email],
    );

    return { message: 'OTP verified successfully' };
  }
}
