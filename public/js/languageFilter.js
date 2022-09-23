const swears = [
	/\b\w*(fuck)\w*\b/gi,
	/\b(shit)\b/gi,
	/\b(bitch)\b/gi,
	/\b(ass)\b/gi,
	/\b(asshole)\b/gi,
	/\b(asswipe)\b/gi,
	/\b(dipshit)\b/gi,
	/\b(asshat)\b/gi,
];

const cleanSentence = (sentence) => {
	for (i = 0; i < swears.length; i++) {
		const newSentence = sentence.replaceAll(swears[i], "!@#!");
		sentence = newSentence;
	}
	return sentence;
};

console.log(
	cleanSentence(
		"testing a lot of fucking things this piece of shit makes me feel like a little bitch"
	)
);
