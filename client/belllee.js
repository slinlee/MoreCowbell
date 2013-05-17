Meteor.subscribe("counters");
var count;
var handle;
if (Meteor.isClient) {
    $(document).ready(function() {
        count = Counter.find({user: Meteor.userId()});

        handle = count.observeChanges({
            added: function (id, user) {
            ringBell();
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
    if (Template.counter.liveCount() % 5 === 0) {
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
    var tally = Counter.find({user: Meteor.userId()});
    return tally.count();
}

Template.footer.personalURL = function () {
    // var url = location.hostname + '/?user=' + Meteor.userId();
    var url = location.href + 'ding?user=' + Meteor.userId();
    console.log ("url: " + url);//debug
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

