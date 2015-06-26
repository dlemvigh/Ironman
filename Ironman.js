Entries = new Mongo.Collection("entries");

var sports_list = [
      {sport: "run", unit: "km"},
      {sport: "swim", unit: "km"},
      {sport: "bike", unit: "km"},
      {sport: "cross-fit", unit: "hour(s)"}
];

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.entry_form.events({
    "submit form": function(event){
      Entries.insert({
        owner: Meteor.user().profile.name,
        sport: event.target.sport.value,
        distance: event.target.distance.value,
        date: new Date()
      });
    }
  });

  Template.entry.helpers({
    unit: function(){
     return this.sport == "Cross-fit" ? "hours" : "km";
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
