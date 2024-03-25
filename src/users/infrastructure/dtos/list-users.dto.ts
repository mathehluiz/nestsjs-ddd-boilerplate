import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ListUsersUseCase } from '@/users/application/usecases/list-users.usecase';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListUsersDto implements ListUsersUseCase.Input {
  @ApiPropertyOptional({ description: 'Página atual' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Quantidade de itens por página' })
  @IsOptional()
  perPage?: number;

  @ApiPropertyOptional({ description: 'Campo para ordenação' })
  @IsOptional()
  sort?: string;

  @ApiPropertyOptional({ description: 'Direção da ordenação' })
  @IsOptional()
  sortDir?: SortDirection;

  @ApiPropertyOptional({ description: 'Filtro' })
  @IsOptional()
  filter?: string;
}
