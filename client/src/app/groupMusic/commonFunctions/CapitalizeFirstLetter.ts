function capitalizeFirstLetter(sentence: string) {
    return sentence.replace(/\b\w/g, (char) => char.toUpperCase());
}

export default capitalizeFirstLetter;