import logger from '../../../utils/logger';
import { User, IUser } from '../models/user.model';
import {type CreateUserDTO, UpdateUserDTO} from "../DTOs/user.dto"
import { BadRequestException, NotFoundException } from '../../../utils/catch-error';

class UserService{
    async createUser(dto: CreateUserDTO): Promise<IUser> {
        const existingUser = await User.findOne({ email: dto.email });

        if (existingUser) {
            throw new BadRequestException("User with this email already exists.");
        }

        const user = await User.create(dto);

        logger.info(`User created: ${user.email}`);

        return user;
    }

    async findById(id: string): Promise<IUser | null> {
        const user = await User.findById(id);
        if (!user) {
            throw new NotFoundException("User not found.");
        }
        return user;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user =  User.findOne({ email });
        if (!user) {
            throw new NotFoundException("User not found.");
        }
        return user;
    }

    async updateUser(id: string, dto: UpdateUserDTO): Promise<IUser | null> {
        if (Object.keys(dto).length === 0) {
            throw new BadRequestException("No fields provided to update.");
        }
        const user = await User.findByIdAndUpdate(id, dto, { new: true });

        if (!user) {
            throw new NotFoundException("User not found.");
        }

        logger.info(`User updated: ${user.email}`);

        return user;
    }

    async deleteUser(id: string): Promise<IUser | null> {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new NotFoundException("User not found.");
        }

        logger.warn(`User deleted: ${id}`);

        return user;
    }
}

export default UserService;