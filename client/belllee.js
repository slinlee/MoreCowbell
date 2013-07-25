Meteor.subscribe("counters");
var count;
var handle;
var today = Date.create('today');
if (Meteor.isClient) {
    $(document).ready(function() {
        if (Meteor.userId()) {
            count = Counter.find({user: Meteor.userId(), timestamp: {$gte: today}});
        } else {
            count = Counter.find({timestamp: {$gte: today}});
        }

        handle = count.observeChanges({
            added: function (id, user) {
                ringBell();
                today = Date.create('today');
            }
        });
        // if ($.urlParam('user')) {
        //     console.log ("user: " + $.urlParam('user'));//debugging
        //     Counter.insert({user: $.urlParam('user'), timestamp: new Date()});
        // }
    });
}

$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results) {
        return results[1] || 0;
    } else {
        return 0;
    }
}

var ringBell = function () {
    if (Template.counter.liveCount() % 8 === 0) {
        $('#bellaudio').trigger('play');
        $('#bell div').removeClass('animated swing').addClass('animated hinge');
        $('#bellmsg').text('You broke it!').show();

    } else {
        $('#bellaudio').trigger('play');
        $('#bell div').removeClass('animated swing').addClass('animated swing');
        $('#bellmsg').text('More Cowbell!').show();

    }
    var wait = window.setTimeout( function() {
        $('#bell div').removeClass('animated swing hinge');
        $('#bellmsg').hide();
        },
        2300
    );
};

Template.counter.liveCount = function () {
    var tally;
    if (Meteor.userId()) {
        tally = Counter.find({user: Meteor.userId(), timestamp: {$gte: today}});
    } else {
        tally = Counter.find({timestamp: {$gte: today}});
    }
    return tally.count();
}

Template.footer.personalURL = function () {
    var url = location.href + 'ding';
    if (Meteor.userId()) {
        url += '?user=' + Meteor.userId();
    }

    return url;
}

Template.bell.events({
    'click #bell' : function () {
        ringBell();
    }
});

Template.footer.events({

    'click #clickme' : function () {
        // Counter.insert({user: Meteor.userId(), timestamp: new Date()});
        $.ajax(Template.footer.personalURL());
    }
});

