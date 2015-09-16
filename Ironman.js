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
      var date = moment(event.target.date.value);
      Entries.insert({
        owner: Meteor.user().profile.name,
        sport: event.target.sport.value,
        distance: event.target.distance.value,
        date: date.toDate(),
        week: date.week()
      });
      event.target.distance.value = "";
      return false;
    }
  });

  Template.entry_form.helpers({
    today: function(){
      return moment().format("YYYY-MM-DD");
    }
  })

  Template.entry.helpers({
    unit: function(){
     return this.sport == "Cross-fit" ? "hours" : "km";
    },
    formattedDate: function(){
      return moment(this.date).format("D/M (W)");
    }
  });

  Template.entry.events({
    "click": function(event){
      console.log("li clicked");
    }
  });

  Template.player_entries.helpers({
    entries: function(){
      return Entries.find({}, {sort: {date: -1}});
    }
  })

  Template.leaderboard_weekly.helpers({
    weekData: function(){
      return Entries.find({week: {$eq : moment().week()}})
    },
    contestants: function(){
      return Entries.find({week: {$eq : moment().week()}})
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
