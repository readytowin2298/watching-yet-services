import { Route, Post, Body, Request } from 'tsoa';
import { AuthService } from './auth.service.js';

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

@Route('/auth')
export class AuthController {
    private authService = new AuthService();

    @Post('/register')
    async register(@Body() body: RegisterRequest): Promise<any> {
        return await this.authService.registerUser(body.username, body.email, body.password);
    }

    @Post('/login')
    async login(@Body() body: LoginRequest): Promise<any> {
        return await this.authService.loginUser(body.email, body.password);
    }
}

