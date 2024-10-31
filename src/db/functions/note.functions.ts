import type { dbContext } from '../../middlewares/db';
import {
	usersTable,
	userTypeI,
	notesTable,
	userTypeS,
} from '../schemas/user.schema';
import type { notesTypeS } from '../schemas/notes.schema';
import type { InsertNotes } from './functions.types';

export async function createUser(
	db: dbContext,
	user: userTypeI
): Promise<userTypeI[]> {
	return await db.insert(usersTable).values(user).returning();
}

export async function getUsers(db: dbContext): Promise<userTypeS[]> {
	return await db.select().from(usersTable);
}

export async function insertNotes({
	db,
	userId,
	note,
}: InsertNotes): Promise<notesTypeS[]> {
	return await db
		.insert(notesTable)
		.values({ ...note, userId })
		.returning();
}
