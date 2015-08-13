var makeStringCool = function(s, cb) {
	var coolString = s + ' cool';
	cb(coolString);
}

var lameString = "i'm so lame ._.";

makeStringCool(lameString, function(coolString) {
	console.log('am i cool yet? ', coolString);
});

