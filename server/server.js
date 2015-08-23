var verifyEmail = true;

Meteor.startup(function() {

  // read environment variables from Meteor.settings
  if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
    for(var variableName in Meteor.settings.env) {
      process.env[variableName] = Meteor.settings.env[variableName];
    }
  }

});

Meteor.methods({
  "sendMail": function(options) {
    this.unblock();

    Email.send(options);
  }
});


Users.before.insert(function(userId, doc) {
  if(doc.emails && doc.emails[0] && doc.emails[0].address) {
    doc.profile = doc.profile || {};
    doc.profile.email = doc.emails[0].address;
  } else {
    // oauth
    if(doc.services) {
      // google e-mail
      if(doc.services.google && doc.services.google.email) {
        doc.profile = doc.profile || {};
        doc.profile.email = doc.services.google.email;
      } else {
        // github e-mail
        if(doc.services.github && doc.services.github.accessToken) {
          var github = new GitHub({
            version: "3.0.0",
            timeout: 5000
          });

          github.authenticate({
            type: "oauth",
            token: doc.services.github.accessToken
          });

          try {
            var result = github.user.getEmails({});
            var email = _.findWhere(result, { primary: true });
            if(!email && result.length && _.isString(result[0])) {
              email = { email: result[0] };
            }

            if(email) {
              doc.profile = doc.profile || {};
              doc.profile.email = email.email;
            }
          } catch(e) {
            console.log(e);
          }
        } else {
          // linkedin email
          if(doc.services.linkedin && doc.services.linkedin.emailAddress) {
            doc.profile = doc.profile || {};
            doc.profile.name = doc.services.linkedin.firstName + " " + doc.services.linkedin.lastName;
            doc.profile.email = doc.services.linkedin.emailAddress;
          } else {
            if(doc.services.facebook && doc.services.facebook.email) {
              doc.profile = doc.profile || {};
              doc.profile.email = doc.services.facebook.email;
            } else {
              if(doc.services.twitter && doc.services.twitter.email) {
                doc.profile = doc.profile || {};
                doc.profile.email = doc.services.twitter.email;
              } else {
                if(doc.services["meteor-developer"] && doc.services["meteor-developer"].emails && doc.services["meteor-developer"].emails.length) {
                  doc.profile = doc.profile || {};
                  doc.profile.email = doc.services["meteor-developer"].emails[0].address;
                }
              }
            }
          }
        }
      }
    }
  }
});

Users.before.update(function(userId, doc, fieldNames, modifier, options) {
  if(modifier.$set && modifier.$set.emails && modifier.$set.emails.length && modifier.$set.emails[0].address) {
    modifier.$set.profile.email = modifier.$set.emails[0].address;
  }
});