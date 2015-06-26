Entries = new Mongo.Collection("entries");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.entry_form.events({
    "submit form": function(event){
      Entries.insert({
        owner: "me",
        sport: event.target.sport.value,
        distance: event.target.distance.value,
        date: new Date()
      });
    }
  });

  Template.player_entries.helpers({
    entries: function(){
      return Entries.find({}, {sort: {date: -1}});
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
