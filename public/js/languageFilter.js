const swears = [/\b\w*(fuck)\w*\b/gi, /\b(shit)\b/gi, /\b(bitch)\b/gi];

const cleanSentence = (sentence) => {
	for (i = 0; i < swears.length; i++) {
		const newSentence = sentence.replaceAll(swears[i], "fluffy");
		sentence = newSentence;
	}
	return sentence;
};

console.log(
	cleanSentence(
		"testing a lot of fucking things this piece of shit makes me feel like a little bitch"
	)
);

module.exports = cleanSentence;
