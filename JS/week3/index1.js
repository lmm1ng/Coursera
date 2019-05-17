/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    var arr = [];
    for (var i = 0; i < hashtags.length; i++) {
        if (arr.lastIndexOf(hashtags[i].toLowerCase()) == -1) {
            arr.push(hashtags[i].toLowerCase());
        }
    }
    return arr.join(', ');
};
