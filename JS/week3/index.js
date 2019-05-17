/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    var arrayOfHashtags = [];
    var arr = tweet.split(' ');
    for (var i =0; i < arr.length; i++) {
        tweeet = arr[i];
        if (tweeet[0] == '#') {
            arrayOfHashtags.push(tweeet.replace(/#/, ''));
        }
    }
    return arrayOfHashtags;
};