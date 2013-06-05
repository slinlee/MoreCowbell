if(Meteor.isServer) {
  Meteor.startup(function () {

if (this.userId) {
    Meteor.publish("counters", function () {
    return Counter.find({user: this.userId()});
}); }

  });

};

Meteor.Router.add('/ding', function() {
    // if(this.request.query && this.request.query.user) {
        if(this.request.query.user === null) {
            Counter.insert({user: 'anonymous', timestamp: new Date()});
        } else {
            Counter.insert({user: this.request.query.user, timestamp: new Date()});
        }
    // }
});

// Meteor.Router.add('/', function () {

// });
