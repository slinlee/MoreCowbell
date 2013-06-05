Counter = new Meteor.Collection("counters");

Counter.allow ({
    insert: function (userId, counter) {
        return false;
    },

    remove: function (userId, counter) {
        return false;
    }
});
