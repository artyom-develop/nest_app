import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from '../../../types/movie/genre.enum';
import { ActorEntity } from '../../actor/entities/actor.entity';
import { ReviewEntity } from '../../review/entities/review.entity';
import { MoviePosterEntity } from './poster.entity';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
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
    precision: 3,
    default: 0.0,
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

  @Column({
    name: 'poster_id',
    type: 'uuid',
    nullable: true,
  })
  posterId: string;

  @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'poster_id' })
  poster: MoviePosterEntity | null;

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
    },
  })
  actors: ActorEntity[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_add',
  })
  updatedAdd: Date;
}
