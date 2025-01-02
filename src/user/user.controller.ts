/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HachagePasswordDto } from './dto/hachage-password.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Put(':id')
  async updatePassword(
    @Res() response,
    @Param('id') id: string,
    @Body() hachagePasswordDto: HachagePasswordDto,
  ) {
    try {
      await this.userService.hachPassword(id, hachagePasswordDto);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User password not updated',
        error: error.message || error.toString(),
      });
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
  @UseGuards(AccessTokenGuard)
  @Put('/user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Get("verify/:code")
  async verifyCode(@Param('code') code: string ,   @Res() res,
) {
    return this.userService.VerificationCode(code , res );

  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
