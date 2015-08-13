var text = 'foo this is foo some super cool foo text';
var replacedText = text.replace('foo','bar');
var replacedText2 = text.replace(/foo/g, 'bar');
console.log('text: ', text);
console.log('replacedText: ', replacedText);
console.log('replacedText2: ', replacedText2);
