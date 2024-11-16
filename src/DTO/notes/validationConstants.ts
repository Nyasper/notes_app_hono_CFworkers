export const NoteDTOConsts: NoteValidationConstants = {
	title: {
		min: 2,
		max: 60,
	},
	description: {
		max: 300,
		default: '',
	},
};

interface NoteValidationConstants {
	title: {
		min: number;
		max: number;
	};
	description: {
		max: number;
		default: string;
	};
}
