import { SetMetadata } from '@nestjs/common';
import { EuserRole } from 'src/commons/enums/user-role.enum';

export const ROLES_KEY = 'roles';

export const Droles = (...roles: EuserRole[]) => SetMetadata(ROLES_KEY, roles);
