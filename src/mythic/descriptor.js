import descriptor1 from './data/descriptor1.json';
import descriptor2 from './data/descriptor2.json';
import fateActions from './data/fateActions.json';
import fateSubjects from './data/fateSubjects.json';

// TODO: Rename this something better or split apart


const descriptor = () => {

	const roll1 = Math.floor(Math.random() * 100);
	const roll2 = Math.floor(Math.random() * 100);

	const d1 = descriptor1.descriptors[roll1];
	const d2 = descriptor2.descriptors[roll2];

	return {
		text: `Descriptors: ${d1} ${d2}`
	}
}

const actionSubject = () => {

	const roll1 = Math.floor(Math.random() * 100);
	const roll2 = Math.floor(Math.random() * 100);

	const d1 = fateActions.actions[roll1];
	const d2 = fateSubjects.subjects[roll2];

	return {
		text: `ActionSubject: ${d1} ${d2}`
	}
}

export {
	descriptor,
	actionSubject
}