module.exports = {
    subscribers : [],


    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        var new_subr = {
            event : event,
            subscriber :  subscriber,
            handler :  handler,
            disable : false
        };
        module.exports.subscribers.push(new_subr);
        return (this);

    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        subArr = module.exports.subscribers;
        for(var i=0; i < subArr.length ; i++)
        {
            var s = subArr[i];
            if(s.event == event && s.subscriber == subscriber) {
                s.disable = true;
            }
        }

        return (this);
        },

    /**
     * @param {String} event
     */
    emit: function (event) {
               subArr = module.exports.subscribers;
        for(var i=0; i< subArr.length; i++)
        {
            var s = subArr[i];
            if(s.event == event && !s.disable){
                s.handler.call(s.subscriber);
            }
        }
        return (this);
    }
};
