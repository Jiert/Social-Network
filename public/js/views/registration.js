define([
  'text!templates/registration.html'
], function (
  registrationTemplate
) {
  var registerView = Backbone.View.extend({

    el: $('#content'),

    events: {
      'submit form': 'register'
    },

    register: function(){
      $.post('/register', {
        firstName: $('input[name=firstName]').val(),
        lastName: $('input[name=lastName]').val(),
        email: $('input[name=email]').val(),
        password: $('input[name=password]').val(),
      }, function(){
        console.log(data);
      });
      return false;
    },

    render: function(){
      this.$el.html(registrationTemplate);
    }

  });

  return registerView;
});