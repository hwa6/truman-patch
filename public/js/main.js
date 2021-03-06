//$(document).ready(function() {

//Before Page load:
$('#content').hide();
$('#loading').show();

$(window).on('load', function () {
  //close loading dimmer on load
  $('#loading').hide();
  $('#content').attr('style', 'block');
  $('#content').fadeIn('slow');
  //close messages from flash message
  $('.message .close').on('click', function () {
    $(this).closest('.message').transition('fade');
  });

  $('.hide').hide();

  $('input.newcomment').click(function () {
    $('.hide').show(500);
    console.log('in input comment');
  });

  //check bell
  if (
    !(top.location.pathname === '/login' || top.location.pathname === '/signup')
  ) {
    $.getJSON('/bell', function (json) {
      if (json.result) {
        $('i.big.alarm.icon').replaceWith(
          '<i class="big icons"><i class="red alarm icon"></i><i class="corner yellow lightning icon"></i></i>'
        );
      }
    });
  }

  //make checkbox work
  $('.ui.checkbox').checkbox();

  $(' .ui.tiny.post.modal').modal({
    observeChanges: true,
  });

  $(' .ui.tiny.adminpost.modal').modal({
    observeChanges: true,
  });

  $('.ui.tiny.update.modal').modal({
    observeChanges: true,
  });

  $('.ui.tiny.newactor.modal').modal({
    observeChanges: true,
  });

  //get add new feed post modal to work
  $('#newpost, a.item.newpost').click(function () {
    $(' .ui.tiny.post.modal').modal('show');
  });

  //for admin new post modal
  $('#adminpost').click(function () {
    $('.ui.tiny.adminpost.modal').modal('show');
  });

  //for create new actor modal
  $('.newactorbutton').on('click', function () {
    $('.ui.tiny.newactor.modal').modal('show');
  });

  //new post validator (picture and text can not be empty)
  $('.ui.feed.form').form({
    on: 'blur',
    fields: {
      body: {
        identifier: 'body',
        rules: [
          {
            type: 'empty',
            prompt: 'Please add some text about your meal',
          },
        ],
      },
      picinput: {
        identifier: 'picinput',
        rules: [
          {
            type: 'notExactly[/public/photo-camera.svg]',
            prompt: 'Please click on Camera Icon to add a photo',
          },
        ],
      },
    },

    onSuccess: function (event, fields) {
      console.log('Event is :');
      //console.log(event);
      console.log('fields is :');
      //console.log(fields);
      $('.ui.feed.form')[0].submit();
    },
  });

  $('.ui.feed.form').submit(function (e) {
    e.preventDefault();
    console.log('Submit the junks!!!!');
    //$('.ui.tiny.nudge.modal').modal('show');
    //return true;
  });

  //new admin post validator
  $.fn.form.settings.rules.greaterEqualZero = function (value) {
    return value >= 0;
  };

  $('.ui.adminfeed.form').form({
    on: 'blur',
    fields: {
      user: {
        identifier: 'user',
        rules: [
          {
            type: 'empty',
            prompt: 'Please choose an actor',
          },
        ],
      },
      caption: {
        identifier: 'caption',
        rules: [
          {
            type: 'empty',
            prompt: 'Please add some text about your meal',
          },
        ],
      },
      time: {
        identifier: 'time',
        rules: [
          {
            type: 'regExp',
            value: /(\d{1,3}):(\d{1,3}):(\d{1,3})/i,
            prompt: 'Time should be formatted day:hr:min',
          },
        ],
      },
      likes: {
        identifier: 'likes',
        rules: [
          {
            type: 'integer',
            prompt: 'Likes should be an integer',
          },
          {
            type: 'greaterEqualZero[]',
            prompt: 'Likes should be nonnegative',
          },
        ],
      },
      expGroup: {
        identifier: 'expGroup',
        rules: [
          {
            type: 'empty',
            prompt: 'Please choose an experiment group',
          },
        ],
      },
      class: {
        identifier: 'class',
        rules: [
          {
            type: 'empty',
            prompt: 'Please choose a class',
          },
        ],
      },
      adminpicinput: {
        identifier: 'adminpicinput',
        rules: [
          {
            type: 'notExactly[/public/photo-camera.svg]',
            prompt: 'Please click on Camera Icon to add a photo',
          },
        ],
      },
    },

    onSuccess: function (event, fields) {
      console.log('Event is :');
      //console.log(event);
      console.log('fields is :');
      //console.log(fields);
      $('.ui.adminfeed.form')[0].submit();
    },
  });

  $('.ui.adminfeed.form').submit(function (e) {
    e.preventDefault();
    console.log('Submit the admin junks!!!!');
    //$('.ui.tiny.nudge.modal').modal('show');
    //return true;
  });

  //update photo
  $('.ui.update.form').form({
    on: 'blur',
    fields: {
      newpic: {
        identifier: 'newpic',
        rules: [
          {
            type: 'notExactly[/public/photo-camera.svg]',
            prompt: 'Please click on Camera Icon to add a photo',
          },
        ],
      },
    },

    onSuccess: function (event, fields) {
      console.log('THE ONSUCCESS FOR ADMIN');
      console.log($('.ui.update.form')[0]);
      $('.ui.update.form')[0].submit();
    },
  });

  $('.ui.update.form').submit(function (e) {
    e.preventDefault();
    console.log('Submit ');
    //$('.ui.tiny.nudge.modal').modal('show');
    //return true;
  });

  //new actor validator
  $.fn.form.settings.rules.greaterEqualNum = function (value, e) {
    return value >= e;
  };

  $('.ui.adminactor.form').form({
    on: 'blur',
    fields: {
      username: {
        identifier: 'username',
        //NEED TO CHECK THAT THIS USERNAME HASNT BEEN TAKEN YET!!!!
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter a username',
          },
        ],
      },
      profilename: {
        identifier: 'profilename',
        rules: [
          {
            type: 'empty',
            prompt: 'Please add a profile name',
          },
        ],
      },
      age: {
        identifier: 'age',
        rules: [
          {
            type: 'integer',
            prompt: 'Age should be an integer',
          },
          {
            type: 'greaterEqualNum[13]',
            prompt: 'Age should be >= 13',
          },
        ],
      },
      class: {
        identifier: 'class',
        rules: [
          {
            type: 'empty',
            prompt: 'Please choose a class',
          },
        ],
      },
      actorpicinput: {
        identifier: 'actorpicinput',
        rules: [
          {
            type: 'notExactly[/public/photo-camera.svg]',
            prompt: 'Please click on Camera Icon to add a photo',
          },
        ],
      },
    },

    onSuccess: function (event, fields) {
      console.log('Event is :');
      //console.log(event);
      console.log('fields is :');
      //console.log(fields);
      $('.ui.adminactor.form')[0].submit();
    },
  });

  $('.ui.adminactor.form').submit(function (e) {
    e.preventDefault();
    console.log('Submit the actor junks!!!!');
  });

  //Picture Preview on Image Selection
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      //console.log("Now changing a photo");
      reader.onload = function (e) {
        $('#imgInp').attr('src', e.target.result);
        //console.log("FILE is "+ e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  //Picture Preview on Image Selection for admin
  function readURLAdmin(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#imgInpAdmin').attr('src', e.target.result);
        //console.log("FILE is "+ e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  //Picture Preview on Image Selection for admin
  function readURLAdminPost(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#imgInpAdminPost').attr('src', e.target.result);
        console.log('FILE is ' + e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  //Picture Preview on Image Selection for actor profile
  function readURLAdminActor(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#imgInpActor').attr('src', e.target.result);
        console.log('FILE is ' + e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  $('#picinput').change(function () {
    console.log('@@@@@ changing a photo');
    readURL(this);
  });

  $('#newpic').change(function () {
    console.log('updating photo ..');
    readURLAdmin(this);
  });

  $('#adminpicinput').change(function () {
    console.log('adding photo ..');
    readURLAdminPost(this);
  });

  $('#actorpicinput').change(function () {
    console.log('adding actor profile photo ..');
    readURLAdminActor(this);
  });

  $('.actor.ui.selection.dropdown').dropdown();

  $('.var.ui.selection.dropdown').dropdown();

  //Modal to show "other users" in Notifications
  /*
$('a.others').click(function(){
  let key = $(this).attr('key');


  $('.ui.long.extrausers.modal#'+key).modal({
    onVisible: function() {
      var el = document.querySelector('.ui.long.extrausers.modal#'+key+" div.ui.extra.divided.items");
      var lazyLoad = new LazyLoad({
         container: el /// <--- not sure if this works here, read below
    });



    }
  }).modal('show')
}); */

  //add humanized time to all posts
  $('.right.floated.time.meta, .date').each(function () {
    var ms = parseInt($(this).text(), 10);
    let time = new Date(ms);
    $(this).text(humanized_time_span(time));
  });

  //add time for admin in edit mode to all posts, in form days:hours:minutes
  $('.right.floated.admintime.meta, .admindate').each(function () {
    var ms = parseInt($(this).text(), 10); //ms is the date (in ms) the post was created
    ms = Date.now() - ms; //subtract to get how long ago post happened
    var days = Math.floor(ms / 86400000);
    ms = ms % 86400000; //ms remaining after removing days
    var hours = Math.floor(ms / 3600000);
    ms = ms % 3600000; //ms remaining after removings days and hours
    var mins = Math.floor(ms / 60000);
    $(this).text(days + ':' + hours + ':' + mins);
  });

  //Make hashtags visible as links
  $('.description, .text').each(function () {
    $(this).html($(this).text());
  });

  //Sign Up Button
  $('.ui.big.green.labeled.icon.button.signup').on('click', function () {
    window.location.href = '/signup';
  });

  //Sign Up Info Skip Button
  $('button.ui.button.skip').on('click', function () {
    window.location.href = '/com';
  });

  //Community Rules Button (rocket!!!)
  $('.ui.big.green.labeled.icon.button.com').on('click', function () {
    window.location.href = '/info'; //maybe go to tour site???
  });

  //Community Rules Button (rocket!!!)
  $('.ui.big.green.labeled.icon.button.info').on('click', function () {
    window.location.href = '/'; //maybe go to tour site???
  });

  //Profile explaination Page
  $('.ui.big.green.labeled.icon.button.profile').on('click', function () {
    window.location.href = '/profile_info'; //maybe go to tour site???
  });

  //More info Skip Button
  $('button.ui.button.skip').on('click', function () {
    window.location.href = '/com'; //maybe go to tour site???
  });

  //Edit button
  $('.ui.editprofile.button').on('click', function () {
    window.location.href = '/account';
  });

  //admin delete post button
  $('.ui.adminDelete.button').on('click', function () {
    console.log('clicked delete');
    $('.ui.tiny.deletePost.modal').modal('show');
    var card = $(this).parents('.ui.fluid.card');
    var postID = card.attr('postID');
    //if they confirm the delete
    $('input.ui.confirmDelete.button').on('click', function () {
      console.log('confirmed delete');
      $('.ui.tiny.deletePost.modal').modal('hide');
      $.post(
        '/delete_post_admin',
        { postID: postID, _csrf: $('meta[name="csrf-token"]').attr('content') },
        function (response) {
          document.location.reload(true);
        }
      );
    });
  });

  //admin cancel post delete on confirmation modal
  $('input.ui.blue.cancelDelete.button').on('click', function () {
    console.log('canceled delete');
    $('.ui.tiny.deletePost.modal').modal('hide');
  });

  //admin delete actor button
  $('.ui.deleteActor.button').on('click', function () {
    $('.ui.tiny.deleteActor.modal').modal('show');
    var card = $(this).parents('.ui.fluid.card');
    var username = card.attr('actorUsername');
    //if they confirm the delete
    $('input.ui.confirmActorDelete.button').on('click', function () {
      $('.ui.tiny.deleteActor.modal').modal('hide');
      $.post(
        '/actor_delete',
        {
          username: username,
          _csrf: $('meta[name="csrf-token"]').attr('content'),
        },
        function (response) {
          document.location.reload(true);
        }
      );
    });
  });

  //admin cancel actor delete on confirmation modal
  $('input.ui.blue.cancelActorDelete.button').on('click', function () {
    $('.ui.tiny.deleteActor.modal').modal('hide');
  });

  // This will save the changes on the card that 'save' is clicked on
  $('.ui.adminSave.button').on('click', function () {
    var caption = $(this)
      .parents('.four.ui.bottom.attached.icon.buttons')
      .siblings('.content')
      .children('.description')[0].innerHTML;
    var card = $(this).parents('.ui.fluid.card');
    var likes = card.find('.ui.basic.red.left.pointing.label.count')[0]
      .innerHTML;
    var time = card.find('.right.floated.admintime.meta')[0].innerHTML; //day:hr:min ago of post

    var comments = $(this)
      .parents('.four.ui.bottom.attached.icon.buttons')
      .siblings('.content')
      .children('.ui.comments')
      .children('.comment');
    console.log(comments[0]);
    var commentsArray = [];
    for (var i = 0; i < comments.length; i++) {
      commentsArray.push(comments[i].getAttribute('commentid'));
      commentsArray.push(comments[i].children[1].children[3].innerText); //push body
      commentsArray.push(
        comments[i].children[1].children[1].children[1].children[1].innerText
      ); //push Likes
      commentsArray.push(
        comments[i].children[1].children[1].children[0].innerText
      ); //push date
      console.log(comments[i].getAttribute('commentid'));
      console.log(comments[i].children[1].children[3].innerText); //body
      console.log(
        comments[i].children[1].children[1].children[1].children[1].innerText
      ); //num likes
      console.log(comments[i].children[1].children[1].children[0].innerText); //date
    }

    var actor = card.find('.actor.ui.selection.dropdown')[0].innerText;
    console.log(actor);
    var expGroup = card.find('.var.ui.selection.dropdown.expGroup')[0]
      .innerText;
    var postClass = card.find('.var.ui.selection.dropdown.class')[0].innerText;

    var pID = card.attr('postID');
    $.post('/update_post_admin', {
      updated_time: time,
      actorName: actor,
      postID: pID,
      updated_caption: caption,
      updated_likes: likes,
      expGroup: expGroup,
      postClass: postClass,
      _csrf: $('meta[name="csrf-token"]').attr('content'),
    });
    if (comments.length > 0) {
      $.post('/update_comments', {
        postID: pID,
        saveComments: commentsArray,
        _csrf: $('meta[name="csrf-token"]').attr('content'),
      });
    }
  });

  // This will export database contents to a CSV
  $('a.item.adminExport').on('click', function () {
    console.log('Implement exporting');
    $.getScript('../../admin-export.js');
  });

  // This will turn admin mode on and off
  $('a.item.adminToggle').on('click', function () {
    var captions = document.getElementsByClassName('description');
    var comments = document.getElementsByClassName('commentText');
    var buttons = document.getElementsByClassName('adminSave');
    var likes = document.getElementsByClassName('left pointing label count');
    var comment_likes = document.getElementsByClassName('num');
    var admin_times = document.getElementsByClassName(
      'right floated admintime meta'
    );
    var norm_times = document.getElementsByClassName('right floated time meta');
    var admin_dates = document.getElementsByClassName('admindate');
    var norm_dates = document.getElementsByClassName('date');
    var delete_buttons = document.getElementsByClassName('adminDelete');
    var var_drops = document.getElementsByClassName('varDropdowns');
    var actor_drops = document.getElementsByClassName('actorDropdown');
    var actor_icons = document.getElementsByClassName('normalActorIcon');

    // Tells user whether they are activating/deactivating admin mode
    // Turning admin mode off will save all changes made
    if (captions[0].getAttribute('contenteditable') == 'true') {
      alert('Admin Mode Off');

      // Hide the 'save' button
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'none';
      }
      // Hide the 'delete post' button
      for (var i = 0; i < delete_buttons.length; i++) {
        delete_buttons[i].style.display = 'none';
      }
      // Hide the experimental group and class dropdowns
      for (var i = 0; i < var_drops.length; i++) {
        var_drops[i].style.display = 'none';
      }
      // Hide the actor dropdowns
      for (var i = 0; i < actor_drops.length; i++) {
        actor_drops[i].style.display = 'none';
      }
      //display actor icons
      for (var i = 0; i < actor_icons.length; i++) {
        actor_icons[i].style.display = 'initial';
      }
      for (var i = 0; i < captions.length; i++) {
        captions[i].setAttribute('contenteditable', 'false');
      }
      for (var i = 0; i < comments.length; i++) {
        comments[i].setAttribute('contenteditable', 'false');
      }
      for (var i = 0; i < likes.length; i++) {
        likes[i].setAttribute('contenteditable', 'false');
      }
      for (var i = 0; i < comment_likes.length; i++) {
        comment_likes[i].setAttribute('contenteditable', 'false');
      }

      //get all the admin times and change back to normal
      while (admin_times.length) {
        admin_times[0].setAttribute('contenteditable', 'false');
        //make text on page human time form
        var hidden_time = $(admin_times[0]).siblings('.hiddentime');
        var ms = parseInt($(hidden_time).text(), 10);
        let time = new Date(ms);
        $(admin_times[0]).text(humanized_time_span(time));
        //changing class name must happen last bc that removes this time from admin_times array
        admin_times[0].className = 'right floated time meta';
        //console.log("got admintime and made time");
      }
      //get all the admin comment times and change back to normal
      while (admin_dates.length) {
        admin_dates[0].setAttribute('contenteditable', 'false');
        //make text on page human time form
        var hidden_date = $($(admin_dates[0]).parent()).siblings('.hiddendate');
        var ms = parseInt($(hidden_date).text(), 10);
        let date = new Date(ms);
        $(admin_dates[0]).text(humanized_time_span(date));
        //changing class name must happen last bc that removes this time from admin_times array
        admin_dates[0].className = 'date';
        //console.log("got admintime and made time");
      }
      //reload the page so the posts update with new changes made
      location = location;
    } else {
      alert(
        "Admin Mode On: Click directly on the parts of the post that you would like to edit. Click 'save' next to the reply button to save your changes"
      );

      // Display the 'save' button
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'initial';
      }
      //display the 'delete post' button
      for (var i = 0; i < delete_buttons.length; i++) {
        delete_buttons[i].style.display = 'initial';
      }
      //display the experiemntal group and class dropdowns
      for (var i = 0; i < var_drops.length; i++) {
        var_drops[i].style.display = 'initial';
      }
      //display actor dropdowns
      for (var i = 0; i < actor_drops.length; i++) {
        actor_drops[i].style.display = 'initial';
      }
      // Hide the actor icons
      for (var i = 0; i < actor_icons.length; i++) {
        actor_icons[i].style.display = 'none';
      }
      for (var i = 0; i < captions.length; i++) {
        captions[i].setAttribute('contenteditable', 'true');
      }
      for (var i = 0; i < comments.length; i++) {
        comments[i].setAttribute('contenteditable', 'true');
      }
      for (var i = 0; i < likes.length; i++) {
        likes[i].setAttribute('contenteditable', 'true');
      }
      for (var i = 0; i < comment_likes.length; i++) {
        comment_likes[i].setAttribute('contenteditable', 'true');
      }
      //get all the normal times and change to admin time
      while (norm_times.length) {
        norm_times[0].setAttribute('contenteditable', 'true');
        //need to make text on page admin edit form
        var hidden_time = $(norm_times[0]).siblings('.hiddentime');
        var ms = parseInt($(hidden_time).text(), 10);
        ms = Date.now() - ms; //need to subtract to get how long ago post happened
        var days = Math.floor(ms / 86400000);
        ms = ms % 86400000; //ms remaining after removing days
        var hours = Math.floor(ms / 3600000);
        ms = ms % 3600000; //ms remaining after removings days and hours
        var mins = Math.floor(ms / 60000);
        $(norm_times[0]).html(days + ':' + hours + ':' + mins);
        //changing class name must happen last bc that removes this time from admin_times array
        norm_times[0].className = 'right floated admintime meta';
        //console.log("got time and made admintime");
      }

      //get all the normal comment times and change to admin time
      while (norm_dates.length) {
        norm_dates[0].setAttribute('contenteditable', 'true');
        //need to make text on page admin edit form
        var hidden_date = $($(norm_dates[0]).parent()).siblings('.hiddendate');
        var ms = parseInt($(hidden_date).text(), 10);
        ms = Date.now() - ms; //need to subtract to get how long ago post happened
        var days = Math.floor(ms / 86400000);
        ms = ms % 86400000; //ms remaining after removing days
        var hours = Math.floor(ms / 3600000);
        ms = ms % 3600000; //ms remaining after removings days and hours
        var mins = Math.floor(ms / 60000);
        $(norm_dates[0]).html(days + ':' + hours + ':' + mins);
        //changing class name must happen last bc that removes this time from admin_times array
        norm_dates[0].className = 'admindate';
        //console.log("got time and made admintime");
      }
    }

    // Make number of comment likes editable
    //      for (var i=0; i<commlikes.length; i++)
    //      {
    //        if (commlikes[i].getAttribute("contenteditable") == "true")
    //        {
    //          commlikes[i].setAttribute("contenteditable", "false")
    //        }
    //        else commlikes[i].setAttribute("contenteditable", "true")
    //      }
  });

  // Click image to replace with a new one (admin functionality)
  $('img.lazyload.post').click(function () {
    var captions = document.getElementsByClassName('description');
    if (captions[0].getAttribute('contenteditable') == 'true') {
      $(' .ui.tiny.update.modal').modal('show');
    }
  });

  // Change who posted the image (admin functionality)
  $('a.ui.avatar.image').click(function () {
    console.log('hello');
  });

  ////////////////////
  $('input.newcomment').keyup(function (event) {
    //i.big.send.link.icon
    //$(this).siblings( "i.big.send.link.icon")
    if (event.keyCode === 13) {
      $(this).siblings('i.big.send.link.icon').click();
    }
  });

  //create a new Comment
  $('i.big.send.link.icon').click(function () {
    var text = $(this).siblings('input.newcomment').val();
    var card = $(this).parents('.ui.fluid.card');
    var comments = card.find('.ui.comments');
    //no comments area - add it
    console.log('Comments is now ' + comments.length);
    if (!comments.length) {
      //.three.ui.bottom.attached.icon.buttons
      console.log('Adding new Comments sections');
      var buttons = card.find('.three.ui.bottom.attached.icon.buttons');
      buttons.after('<div class="content"><div class="ui comments"></div>');
      var comments = card.find('.ui.comments');
    }
    if (text.trim() !== '') {
      console.log(text);
      var date = Date.now();
      var ava = $(this).siblings('.ui.label').find('img.ui.avatar.image');
      var ava_img = ava.attr('src');
      var ava_name = ava.attr('name');
      var postID = card.attr('postID');

      var mess =
        '<div class="comment"> <a class="avatar"> <img src="' +
        ava_img +
        '"> </a> <div class="content"> <a class="author">' +
        ava_name +
        '</a> <div class="metadata"> <span class="date">' +
        humanized_time_span(date) +
        '</span> <i class="heart icon"></i> 0 Likes </div> <div class="text">' +
        text +
        '</div> <div class="actions"> <a class="like">Like</a> <a class="flag">Flag</a> </div> </div> </div>';
      $(this).siblings('input.newcomment').val('');
      comments.append(mess);
      console.log(
        '######### NEW COMMENTS:  PostID: ' +
          postID +
          ', new_comment time is ' +
          date +
          ' and text is ' +
          text
      );

      if (card.attr('type') == 'userPost')
        $.post('/userPost_feed', {
          postID: postID,
          new_comment: date,
          comment_text: text,
          _csrf: $('meta[name="csrf-token"]').attr('content'),
        });
      else
        $.post('/feed', {
          postID: postID,
          new_comment: date,
          comment_text: text,
          _csrf: $('meta[name="csrf-token"]').attr('content'),
        });
    }
  });
  ///////////////////

  //this is the REPORT User button
  $('button.ui.button.report').on('click', function () {
    var username = $(this).attr('username');

    $('.ui.small.report.modal').modal('show');

    $('.coupled.modal').modal({
      allowMultiple: false,
    });
    // attach events to buttons
    $('.second.modal').modal('attach events', '.report.modal .button');
    // show first now
    $('.ui.small.report.modal').modal('show');
  });

  //Report User Form//
  $('form#reportform').submit(function (e) {
    e.preventDefault();
    $.post($(this).attr('action'), $(this).serialize(), function (res) {
      // Do something with the response `res`
      console.log(res);
      // Don't forget to hide the loading indicator!
    });
    //return false; // prevent default action
  });

  $('.ui.home.inverted.button').on('click', function () {
    window.location.href = '/';
  });

  //this is the Block User button
  $('button.ui.button.block').on('click', function () {
    var username = $(this).attr('username');
    //Modal for Blocked Users
    $('.ui.small.basic.blocked.modal')
      .modal({
        closable: false,
        onDeny: function () {
          //report user
        },
        onApprove: function () {
          //unblock user
          $.post('/user', {
            unblocked: username,
            _csrf: $('meta[name="csrf-token"]').attr('content'),
          });
        },
      })
      .modal('show');

    console.log('***********Block USER ' + username);
    $.post('/user', {
      blocked: username,
      _csrf: $('meta[name="csrf-token"]').attr('content'),
    });
  });

  //Block Modal for User that is already Blocked
  $('.ui.on.small.basic.blocked.modal')
    .modal({
      closable: false,
      onDeny: function () {
        //report user
      },
      onApprove: function () {
        //unblock user
        var username = $('button.ui.button.block').attr('username');
        $.post('/user', {
          unblocked: username,
          _csrf: $('meta[name="csrf-token"]').attr('content'),
        });
      },
    })
    .modal('show');

  //this is the LIKE button
  $('.like.button').on('click', function () {
    //if already liked, unlike if pressed
    if ($(this).hasClass('red')) {
      console.log('***********UNLIKE: post');
      $(this).removeClass('red');
      var label = $(this).next('a.ui.basic.red.left.pointing.label.count');
      label.html(function (i, val) {
        return val * 1 - 1;
      });
    }
    //since not red, this button press is a LIKE action
    else {
      $(this).addClass('red');
      var label = $(this).next('a.ui.basic.red.left.pointing.label.count');
      label.html(function (i, val) {
        return val * 1 + 1;
      });
      var postID = $(this).closest('.ui.fluid.card').attr('postID');
      var like = Date.now();
      console.log('***********LIKE: post ' + postID + ' at time ' + like);

      if ($(this).closest('.ui.fluid.card').attr('type') == 'userPost')
        $.post('/userPost_feed', {
          postID: postID,
          like: like,
          _csrf: $('meta[name="csrf-token"]').attr('content'),
        });
      else
        $.post('/feed', {
          postID: postID,
          like: like,
          _csrf: $('meta[name="csrf-token"]').attr('content'),
        });
    }
  });

  //a.like.comment
  $('a.like.comment').on('click', function () {
    //if already liked, unlike if pressed
    if ($(this).hasClass('red')) {
      console.log('***********UNLIKE: post');
      //Un read Like Button
      $(this).removeClass('red');

      var comment = $(this).parents('.comment');
      comment.find('i.heart.icon').removeClass('red');

      var label = comment.find('span.num');
      label.html(function (i, val) {
        return val * 1 - 1;
      });
    }
    //since not red, this button press is a LIKE action
    else {
      $(this).addClass('red');
      var comment = $(this).parents('.comment');
      comment.find('i.heart.icon').addClass('red');

      var label = comment.find('span.num');
      label.html(function (i, val) {
        return val * 1 + 1;
      });

      var postID = $(this).closest('.ui.fluid.card').attr('postID');
      var commentID = comment.attr('commentID');
      var like = Date.now();
      console.log(
        '#########COMMENT LIKE:  PostID: ' +
          postID +
          ', Comment ID: ' +
          commentID +
          ' at time ' +
          like
      );

      if ($(this).closest('.ui.fluid.card').attr('type') == 'userPost')
        $.post('/userPost_feed', {
          postID: postID,
          commentID: commentID,
          like: like,
          _csrf: $('meta[name="csrf-token"]').attr('content'),
        });
      else
        $.post('/feed', {
          postID: postID,
          commentID: commentID,
          like: like,
          _csrf: $('meta[name="csrf-token"]').attr('content'),
        });
    }
  });

  //this is the FLAG button
  $('a.flag.comment').on('click', function () {
    var comment = $(this).parents('.comment');
    var postID = $(this).closest('.ui.fluid.card').attr('postID');
    var typeID = $(this).closest('.ui.fluid.card').attr('type');
    var commentID = comment.attr('commentID');
    comment.replaceWith(
      '<div class="comment" style="background-color:black;color:white"><h5 class="ui inverted header"><span>The admins will review this post further. We are sorry you had this experience.</span></h5></div>'
    );
    var flag = Date.now();
    console.log(
      '#########COMMENT FLAG:  PostID: ' +
        postID +
        ', Comment ID: ' +
        commentID +
        '  TYPE is ' +
        typeID +
        ' at time ' +
        flag
    );

    if (typeID == 'userPost')
      $.post('/userPost_feed', {
        postID: postID,
        commentID: commentID,
        flag: flag,
        _csrf: $('meta[name="csrf-token"]').attr('content'),
      });
    else
      $.post('/feed', {
        postID: postID,
        commentID: commentID,
        flag: flag,
        _csrf: $('meta[name="csrf-token"]').attr('content'),
      });
  });

  //this is the POST FLAG button
  $('.flag.button').on('click', function () {
    var post = $(this).closest('.ui.fluid.card.dim');
    var postID = post.attr('postID');
    var flag = Date.now();
    console.log('***********FLAG: post ' + postID + ' at time ' + flag);
    $.post('/feed', {
      postID: postID,
      flag: flag,
      _csrf: $('meta[name="csrf-token"]').attr('content'),
    });
    console.log('Removing Post content now!');
    post
      .find('.ui.dimmer.flag')
      .dimmer({
        closable: false,
      })
      .dimmer('show');
    //repeat to ensure its closable
    post
      .find('.ui.dimmer.flag')
      .dimmer({
        closable: false,
      })
      .dimmer('show');
  });

  //User wants to REREAD
  $('.ui.button.reread').on('click', function () {
    //.ui.active.dimmer
    $(this).closest('.ui.dimmer').removeClass('active');
    $(this)
      .closest('.ui.fluid.card.dim')
      .find('.ui.inverted.read.dimmer')
      .dimmer('hide');

    var postID = $(this).closest('.ui.fluid.card.dim').attr('postID');
    var reread = Date.now();
    console.log(
      '##########REREAD######SEND TO DB######: post ' +
        postID +
        ' at time ' +
        reread
    );
    $.post('/feed', {
      postID: postID,
      start: reread,
      _csrf: $('meta[name="csrf-token"]').attr('content'),
    });
    //maybe send this later, when we have a re-read event to time???
    //$.post( "/feed", { postID: postID, like: like, _csrf : $('meta[name="csrf-token"]').attr('content') } );
  });

  //////TESTING
  /*setTimeout(function() {
  //.ui.fluid.card.test
    $('.ui.fluid.card.test .content.read')
      .transition({
        animation: 'fade down',
        duration   : '1.5s',
      });
      }.bind(this), 1500);

  //Dimm cards as user scrolls - send Post to update DB on timing of events .image
  //$('.ui.fluid.card.dim') img.post $('.ui.fluid.card.dim .image'
  /*
  $('img.post.s3, .content.pro.s3')
  .visibility({
    once       : false,
    continuous : false,
    observeChanges: true,
    //throttle:100,
    offset: 250,

    //USER HAS NOW READ THE POST (READ EVENT)
    //onBottomVisibleReverse:function(calculations) { onBottomPassed
      onBottomPassed:function(calculations) {
        console.log(":::::Now passing onBottomPassed:::::");
        var parent = $(this).parents(".ui.fluid.card.dim, .profile_card");

        //As Post is not READ and We have a transparency condistion - Show Read Conent and send Post READ event
        if ((!(parent.attr( "state" )=='read')) && (parent.attr( "transparency" )=='yes'))
        {
          console.log("::::UI passing::::Adding Seen Box Now::::::::");

          var postID = parent.attr( "postID" );
          var read = Date.now();

          //actual show the element

           parent.find('.read')
            .transition({
              animation: 'fade',
              duration   : '1.5s',
            });
          //$('img.post').visibility('refresh')  $('img.post, .content.pro').visibility('refresh')
          //<div style="text-align:center;background:#b5bfce" class="content read"> <p>You've read this!</p><a href="/user/"><img src="/profile_pictures/" class="ui avatar image"><span>cat</span></a> has been notified.</div>
          //parent.append( '<div style="text-align:center;background:#b5bfce" class="content read"> <p>You have read this!</p><a href="/user/'+parent.attr( "actor_un" )+'"><img src="/profile_pictures/'+parent.attr( "actor_pic" )+'" class="ui avatar image"><span>'+parent.attr( "actor_name" )+'</span></a> has been notified.</div>' );
          parent.attr( "state", "read" );
          console.log("::::UI passing::::SENDING POST TO DB::::::::");
          $.post( "/feed", { postID: postID, read: read, _csrf : $('meta[name="csrf-token"]').attr('content') } );

        }

        //if we are not in UI condistion, and we are reading, then send off Post to DB for new Read Time
        //Maybe kill this so we don't fill the DB with all this stuff. Seems kind of silly (or only do like 10, etc)
        //else if ((parent.attr( "ui" )=='no') && (parent.attr( "state" )=='unread'))

        //Need to get all "read" and "start" times in non-UI case (as all other times rests on it)
        else if ((parent.attr( "transparency" )=='no'))
        {
          console.log("::::NO UI passing:::");
          //console.log("::::first time reading -> UNREAD:::");
          var postID = parent.attr( "postID" );
          var read = Date.now();
          //set to read now
          //parent.attr( "state" , "read");

          //send post to server to update DB that we have now read this
          console.log("::::NO UI :::::READ::::SENDING POST TO DB:::::::POST:"+postID+" at time "+read);
          if (parent.attr( "profile" )=="yes")
            $.post( "/pro_feed", { postID: postID, read: read, _csrf : $('meta[name="csrf-token"]').attr('content') } );
          else
            $.post( "/feed", { postID: postID, read: read, _csrf : $('meta[name="csrf-token"]').attr('content') } );
        }

        //UI and DIMMED READ, which does not count as a READ
        else
          {console.log("::::passing::::Already dimmed - do nothing - transparency is now "+parent.attr( "transparency" ));}

      },

    ////POST IS NOW Visiable - START EVENT
    onBottomVisible:function(calculations) {
        console.log("@@@@@@@ Now Seen @@@@@@@@@");
        var parent = $(this).parents(".ui.fluid.card.dim, .profile_card");

        var postID = parent.attr( "postID" );
        var start = Date.now();
        console.log("@@@@@@@ UI!!!! @@@@@@SENDING TO DB@@@@@@START POST UI has seen post "+postID+" at time "+start);
        if (parent.attr( "profile" )=="yes")
          $.post( "/pro_feed", { postID: postID, start: start, _csrf : $('meta[name="csrf-token"]').attr('content') } );
        else
          $.post( "/feed", { postID: postID, start: start, _csrf : $('meta[name="csrf-token"]').attr('content') } );

        }
  })
;//WTF!!!
//lazy loading of images
  $('.img.post img')
  .visibility({
    type       : 'image'
    //offset: 450,
    //transition : 'fade in',
    //duration   : 1000,


  })
;
*/
});
