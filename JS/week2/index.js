// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    var commandArr = command.split(/\s|,/);
    var commandName = commandArr[0];
    var numbers = commandArr.slice(2);
    if (commandName === 'ADD') {
        if (!phoneBook.hasOwnProperty(commandArr[1])) {
            phoneBook[commandArr[1]] = numbers;

        } else {
            phoneBook[commandArr[1]] = phoneBook[commandArr[1]].concat(numbers);
        }
    }
    if (commandName === 'REMOVE_PHONE') {
        for (var i = 0; i < Object.keys(phoneBook).length; i++) {
            //console.log(phoneBook['Alex'].indexOf(numberDel));
            var key = Object.keys((phoneBook))[i];
            var numberDel = commandArr[1];
            if (phoneBook[key].indexOf(numberDel) !== -1) {
                phoneBook[key].splice(phoneBook[key].indexOf(numberDel), 1);

                return true;
            };
        };
        return false;
    }
    if (commandName === 'SHOW') {
        var note = [];
        for (var i = 0; i < Object.keys(phoneBook).length; i++){
            var key = Object.keys((phoneBook))[i];
            //console.log((phoneBook['Alex'].length !== 0));
            //console.log(phoneBook['Alex'].length ===1)
            if (phoneBook[key].length !== 0) {
                //var keyFiltered = key.sort();
                //console.log(phoneBook['Alex'].length === 0);
                //console.log(phoneBook['Alex']);
                //console.log(note);
                note[i] = key + ': ' + phoneBook[key].join(', ');
                note.sort();
            }

        }

        //return console.log(note);
        return note;
    };
}