import { z } from 'zod';
import { Types } from 'mongoose';

export const zObjectId = z
	.string()
	.regex(/^[0-9a-fA-F]{24}$/, 'Invalid id format')
	.refine((v) => Types.ObjectId.isValid(v), 'Invalid ObjectId');
