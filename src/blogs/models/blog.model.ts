import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Comment } from './comment.model';

@Table
export class Blog extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author: string;

  @HasMany(() => Comment)
  comments: Comment[];
}