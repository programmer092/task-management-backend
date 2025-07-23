import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Priority, Status } from '../entities/task.entity';
import { IsFutureDate } from './validators/is-future-date.validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsFutureDate()
  deadline: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsEnum(Status)
  @IsOptional()
  status?: Status = Status.Todo;

  @IsString()
  @IsOptional()
  userId?: string;
}
