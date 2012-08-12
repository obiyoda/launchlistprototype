Content = new Meteor.Collection("content");
Chatter = new Meteor.Collection("user");

Session.set('message',null);
Session.set('username',null);

Session.set('new-content',null);
Session.set('image1',null);
Session.set('image2',null);
Session.set('image3',null);
Session.set('source',null);


if (Meteor.is_client) {
  Template.story.story = function () {
    return Content.find({},{sort:{date:-1}});
    //Todos.find(sel, {sort: {timestamp: 1}});
  };

  Template.story.image_objs = function(){
    var story_id = this._id;
    return _.map(this.media.images || [], function(image){
      if(image !== ''){
        return {story_id: story_id, image: image};
      }
    });
  };

  Template.form.events = {
    'blur #new-content' : function(){
      // console.log(this);
      Session.set('new-content',$('#new-content').val());
      
    },
    'blur #source' : function(){
      // console.log(this);
      Session.set('source',$('#source').val());
    },

    'blur #image1' : function(){
      Session.set('image1', $('#image1').val());
    },
    'blur #image2' : function(){
      Session.set('image2', $('#image2').val());
    },
    'blur #image3' : function(){
      Session.set('image3', $('#image3').val());
    },
    'click #submit' : function(){
      var image =[];
      if(Session.get('image1') !== "" && Session.get('image1') !== null ){
        image.push(Session.get('image1'));
      }
      if(Session.get('image2') !== "" && Session.get('image2') !== null){
        image.push(Session.get('image2'));
      }
      if(Session.get('image3') !== ""  && Session.get('image3') !== null){
        image.push(Session.get('image3'));
      }
      Content.insert({
        content:Session.get('new-content'),
        media:{
          images:image,
          link:Session.get('source')
        },
        date: (new Date()).getTime(),
        author:{
          id:1234,
          name:"Jared Daines"
        }
      });
      $('#new-content').val('');
      $('#image1').val('');
      $('#image2').val('');
      $('#image3').val('');
      $('#source').val('');
    }
  };

  //The chat box
  Template.chatform.events = {

    'blur #username' : function(){
      Session.set('username', $('#username').val());
      
    },
    'blur #message' : function(){
      Session.set('message', $('#message').val());
    },

    'click #submit' : function(){
      $('#message').val('');
      Chatter.insert({
        message : Session.get('message'),
        username: Session.get('username'),
        date: (new Date()).getTime()
      });
      $("#chatterbox").scrollTop($("#chatterbox")[0].scrollHeight);
    }
  };

  Template.chatbox.chat = function () {

    return Chatter.find({},{sort:{date:1}});

  };
}

  // Template.accounts.events = {
  // 'change #category_id': function() {
  //    Session.set('selected_category_id', $(this).val());
  // }

if (Meteor.is_server) {

}