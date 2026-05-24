import type { Context } from 'hono';

export const handleValidationError = (result: any, c: Context) => {
	if (!result.success) {
		const fieldErrors = result.error.flatten().fieldErrors;
		console.warn(`[VALIDATION_FAILED] [${c.req.method}] ${c.req.path}:`, fieldErrors);
		return c.json(
			{
				success: false,
				message: 'Input validation failed',
				errors: fieldErrors,
			},
			400
		);
	}
};
