import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, Status, Priority } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      status: createTaskDto.status || Status.Todo,
      deadline: new Date(createTaskDto.deadline),
    });
    return this.taskRepository.save(task);
  }

  async findByUserId(userId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneByUserAndId(userId: string, taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, userId },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async updateByUserAndId(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const updateData: any = { ...updateTaskDto };

    if (!updateData) {
      return task;
    }

    if (updateTaskDto.deadline) {
      updateData.deadline = new Date(updateTaskDto.deadline);
    }

    await this.taskRepository.update(taskId, updateData);
    return this.findOneByUserAndId(userId, taskId);
  }

  async removeByUserAndId(userId: string, taskId: string): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.delete(taskId);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }

  async findByUserIdAndStatus(userId: string, status: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId, status: status as Status },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUserIdAndPriority(
    userId: string,
    priority: string,
  ): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId, priority: priority as Priority },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
