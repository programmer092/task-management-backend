import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/Authentication/auth/guards/jwt-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    createTaskDto.userId = req.user.id;
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(@Request() req) {
    return this.taskService.findByUserId(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.taskService.findOneByUserAndId(req.user.id, id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    return this.taskService.updateByUserAndId(req.user.id, id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return this.taskService.removeByUserAndId(req.user.id, id);
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: string, @Request() req) {
    return this.taskService.findByUserIdAndStatus(req.user.id, status);
  }

  @Get('priority/:priority')
  async findByPriority(@Param('priority') priority: string, @Request() req) {
    return this.taskService.findByUserIdAndPriority(req.user.id, priority);
  }
}
