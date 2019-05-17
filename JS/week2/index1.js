/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    var time = date.split(/[\s:-]/);
    return {
        firstValue : new Date(Date.UTC(time[0], time[1] - 1, time[2], time[3], time[4], 0, 0)),
        add: function (i, s) {
            if (isNaN(i) || i < 0) {
                throw new TypeError('Передано неверное значение');
            }
            if (s === 'years') {
                this.firstValue.setFullYear(this.firstValue.getFullYear() + i);
                return this;
            }
            if (s === 'months') {
                this.firstValue.setMonth(this.firstValue.getMonth() + i);
                return this;
            }
            if (s === 'days') {
                this.firstValue.setDate(this.firstValue.getDate() + i);
                return this;
            }
            if (s === 'hours') {
                this.firstValue.setHours(this.firstValue.getHours() + i);
                return this;
            }
            if (s === 'minutes') {
                this.firstValue.setMinutes(this.firstValue.getMinutes() + i);
                return this;
            }
            throw new TypeError('Передано неверное значение');
        },
        subtract: function (i, s) {
            if (isNaN(i) || i < 0) {
                throw new TypeError('Передано неверное значение');
            }
            if (s === 'years') {
                this.firstValue.setFullYear(this.firstValue.getFullYear() - i);
                return this;
            }
            if (s === 'months') {
                this.firstValue.setMonth(this.firstValue.getMonth() - i);
                return this;
            }
            if (s === 'days') {
                this.firstValue.setDate(this.firstValue.getDate() - i);
                return this;
            }
            if (s === 'hours') {
                this.firstValue.setHours(this.firstValue.getHours() - i);
                return this;
            }
            if (s === 'minutes') {
                this.firstValue.setMinutes(this.firstValue.getMinutes() - i);
                return this;
            }
            throw new TypeError('Передано неверное значение');
        },
        get value () {
            var valueArr = this.firstValue.toISOString().split(/-|:|T/);
            var resultValue = ''+ valueArr[0] + '-' + valueArr[1] + '-' + valueArr[2] + ' ' + valueArr[3] +':' + valueArr[4];
            return resultValue;
        }
        //valueArr : this.firstValue.toISOString().split(/-|:|T/),
        //firstValue :new Date(Date.UTC(time[0], time[1] - 1, time[2], time[3], time[4], 0, 0)),
        //value : ''+ this.valueArr[0] + '-' + this.valueArr[1] + '-' + this.valueArr[2] + ' ' + this.valueArr[3] +':' + this.valueArr[4]
        //value : ''+ this.valueArr[0] + '-' + this.valueArr[1] + '-' + this.valueArr[2] + ' ' + this.valueArr[3] +':' + this.valueArr[4]
    }
};