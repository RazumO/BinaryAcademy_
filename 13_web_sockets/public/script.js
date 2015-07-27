(function () {
	var nameInput = $('#nameInput'),
		text = $('#text'),
		messageSubmit = $('#messageSubmit'),
		messages = $('$messages');
	var userName = 'Anonim';
	var socket = io.connet();

	messageSubmit.on('click', function () {
		var curTime = Date.now();
		var data = {
			name: nameInput.val() || userName,
			text: text.val(),
			date: curTime
		};
		text.val('');
		socker.emit('chat messege', data);
	});

	socket.on('chat history', function (msg) {
		for (var i in msg) {
			if (msg.hasOwnProperty(i)) {
				var newDate = new Date(msg[i].date);
				var localDate = newDate.toLocaleFormat('%m/%d/%Y - %H:%M');
				messages.append($('<li>').text(localDate + ' ' + '<bold>' + msg[i].name + ': </bold>' + msg[i].text));
			}
		}
	});

	socket.on('chat message', function (msg) {
		var newDate = new Date(msg.date);
		var localDate = newDate.toLocaleFormat('%m/%d/%Y - %H:%M');
		messages.append($('<li>').text(localDate + ' ' + '<bold>' + msg.name + ': </bold>' + msg.text));
	});


})();