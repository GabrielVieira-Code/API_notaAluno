import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  age: number; // Idade do aluno

  @Column({ type: 'float' })
  firstSemesterGrade: number; // Nota do primeiro semestre

  @Column({ type: 'float' })
  secondSemesterGrade: number; // Nota do segundo semestre

  @Column({ type: 'varchar', length: 255 })
  professorName: string; // Nome do professor

  @Column({ type: 'int' })
  classroomNumber: number; // Número da sala de aula
}
