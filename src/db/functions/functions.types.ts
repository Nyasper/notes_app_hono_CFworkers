import { dbContext } from '../../middlewares/db';
import { notesTypeI } from '../schemas/notes.schema';

export interface InsertNotes {
	db: dbContext;
	userId: string;
	note: notesTypeI;
}
