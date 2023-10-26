import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto } from "./create.users.dto";

export class updateuserdto extends PartialType(CreateUsersDto) {}
