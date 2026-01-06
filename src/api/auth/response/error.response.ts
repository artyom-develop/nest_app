import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({
    name: 'status',
    type: 'number',
    description: 'Error status code',
    example: 409,
  })
  status: number;

  @ApiProperty({
    name: 'message',
    type: Array<String>,
    description: 'Error status code',
    example: ['Conflict occurred'],
  })
  message: String[];

  @ApiProperty({
    name: 'error',
    type: 'boolean',
    description: 'Indicates if there was an error',
    example: true,
  })
  error: boolean;
}
