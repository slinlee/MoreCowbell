Meteor.subscribe("counters");

if (Meteor.isClient) {
  Template.counter.liveCount = function () {
    var count = Counter.find({user: Meteor.userId()});
    return count.count();
};

Template.bell.events({
    'click #bell' : function () {

        $('#bellaudio').trigger('play');
        $('#bell div').removeClass('animated swing').addClass('animated swing');

        var wait = window.setTimeout( function() {
            $('#bell div').removeClass('animated swing');
            $('#bellmsg').text('Ring Ring!')
            },
          2300
          );
    }
});

Template.footer.events({

    'click #clickme' : function () {
        Counter.insert({user: Meteor.userId(), timestamp: new Date()});

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
    }
});
}
