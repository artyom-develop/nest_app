import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from '../../../types/movie/genre.enum';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false, name: 'is_available' })
  isAvailable: boolean;

  @Column({ type: 'int', unsigned: true, name: 'release_year' })
  releaseYear: number;

  @Column({
    type: 'decimal',
    scale: 1,
    precision: 2,
    default: 0,
  })
  rating: number;

  @Column({
    type: 'date',
    nullable: true,
    name: 'release_date',
  })
  releaseDate: string;

  @Column({
    type: 'enum',
    enum: Genre,
    default: Genre.DRAMA,
  })
  genre: Genre;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_add',
  })
  updatedAdd: Date;
}
