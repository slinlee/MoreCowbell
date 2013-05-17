if (Meteor.isClient) {

  Template.counter.liveCount = function () {
    return "7";//testing
  };

  Template.bell.events({
    'click #bell' : function () {
        $('#bellaudio').trigger('play');
        $('#bell').removeClass().addClass('icon-bell animated swing');

        var wait = window.setTimeout( function(){
          $('#bell').removeClass('animated swing')},
          2300
        );
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
