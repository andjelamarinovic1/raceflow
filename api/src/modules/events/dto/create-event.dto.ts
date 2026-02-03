import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  dateStart: Date;

  @ApiProperty()
  dateEnd: Date;

  @ApiProperty()
  location: string;

  @ApiProperty({ required: false })
  description?: string;
}
