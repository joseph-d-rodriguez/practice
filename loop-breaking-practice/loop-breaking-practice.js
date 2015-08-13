coolstorybro:
for (var i=0; i<3; i++) {

	for (var j=0; j<2; j++) {
		if (i===1 && j===1) {
			break coolstorybro;
		}
		console.log('{ "i": %d, "j": %d }', i, j);
	}
}

