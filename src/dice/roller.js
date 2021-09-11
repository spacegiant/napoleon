export const roller = (max = 1, diceType = 6) => {
	const doRoll = (diceType) => {
		return Math.floor(Math.random() * diceType) + 1;
	}
	const results = [];

	for (let i = 1; i <= max; i++) {
		results.push(doRoll(diceType))
	}
	return {
		max,
		diceType,
		results,
		text: `Roll: ${max}d${diceType} = ${results}`
	}
}
