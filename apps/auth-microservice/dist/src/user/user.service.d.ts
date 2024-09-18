import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUsername(username: string): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    createUser(data: any): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
}
