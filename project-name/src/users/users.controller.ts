import {Controller, Post, Body, Get, UseGuards, ValidationPipe, UsePipes,} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "src/auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {UserAuth} from "../auth/get-auth.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";


@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post('')
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('')
    getAll() {
        return this.usersService.getAllUsers()
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    getRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto)
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-me')
    getMe(@UserAuth() user: User) {
        return user;
    }

}