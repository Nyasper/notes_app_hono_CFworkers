import { ContentfulStatusCode } from 'hono/utils/http-status';

interface BaseResponse {
	success: boolean;
	statusCode: ContentfulStatusCode;
	error?: string;
	stack?: string;
}

export interface ResponseWithMessage extends BaseResponse {
	message: string;
}

export interface ResponseWithData<T> extends ResponseWithMessage {
	data?: T;
}
