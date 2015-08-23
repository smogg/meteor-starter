Users = Meteor.users
UserProfileSchema = new SimpleSchema({
    creditCardVerified: {
        type: Boolean,
        defaultValue: false,
        autoform: {
            omit: true
        }
    },
    firstName: {
        type: String,
        optional: true,
        label: function() {
            if (Meteor.isClient)
                return TAPi18n.getLanguage() === "pl" ? "Imię" : "First name";
        }
    },
    lastName: {
        type: String,
        optional: true,
        label: function() {
            if (Meteor.isClient)
                return TAPi18n.getLanguage() === "pl" ? "Nazwisko" : "Last name";
        }
    },
    street: {
        type: String,
        optional: true,
        label: function() {
            if (Meteor.isClient)
                return TAPi18n.getLanguage() === "pl" ? "Ulica" : "Street";
        }
    },
    zipCode: {
        type: String,
        optional: true,
        label: function() {
            if (Meteor.isClient)
                return TAPi18n.getLanguage() === "pl" ? "Kod pocztowy" : "Zip code";
        }
    },
    city: {
        type: String,
        optional: true,
        label: function() {
            if (Meteor.isClient)
                return TAPi18n.getLanguage() === "pl" ? "Miasto" : "City";
        }
    },
    country: {
        type: String,
        optional: true,
        label: "Kraj"
    },
    phone: {
        type: String,
        optional: true,
        label: function() {
            if (Meteor.isClient)
                return TAPi18n.getLanguage() === "pl" ? "Telefon" : "Phone";
        },
        autoform: {
            type: 'intl-tel-input',
            class: 'form-control',
            afFieldInput: {
                inputOptions: {
                    autoFormat: true,
                    defaultCountry: 'auto',
                }
            }
        }
    },
    // Email settings
    notificationEmail: {
        type: Object,
    },
    // "notificationEmail.maxBid": { 
    //     type: Boolean, defaultValue: false,
    //     label: function() {
    //         if (Meteor.isClient && TAPi18n.getLanguage() === "pl")
    //             return "Aktualizacja maksymalnej oferty";
    //         return  "Your max offer has been updated";
    //     }
    // },
    // "notificationEmail.autoBid": { 
    //     type: Boolean, defaultValue: false,
    //     label: function() {
    //         if (Meteor.isClient && TAPi18n.getLanguage() === "pl")
    //             return "Automatyczne przebicie";
    //         return  "Automatic bid placed";
    //     }
    // },
    "notificationEmail.outbid": { 
        type: Boolean, defaultValue: true,
        label: function() {
            if (Meteor.isClient && TAPi18n.getLanguage() === "pl")
                return "Zostałeś/aś przelicytowany/a";
            return  "You've been outbid";
        }
    },
    "notificationEmail.winning": { 
        type: Boolean, defaultValue: true,
        label: function() {
            if (Meteor.isClient && TAPi18n.getLanguage() === "pl")
                return "Aktualnie wygrywasz licytację";
            return  "You are currently winning";
        }
    },
    "notificationEmail.won": { 
        type: Boolean, defaultValue: true,
        label: function() {
            if (Meteor.isClient && TAPi18n.getLanguage() === "pl")
                return "Wygrałeś/aś licytację";
            return  "You won an auction";
        }
    },
    "notificationEmail.lost": { 
        type: Boolean, defaultValue: true,
        label: function() {
            if (Meteor.isClient && TAPi18n.getLanguage() === "pl")
                return "Przegrałeś/aś licytację";
            return  "You lost an auction";
        }
    }
})

UserSchema = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
        autoform: {
            omit: true
        }
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true,
        autoform: {
            omit: true
        }
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
        autoform: {
            omit: true
        }
    },
    profile: {
        type: UserProfileSchema,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true,
        autoform: {
            omit: true
        }
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    // roles: {
    //     type: Object,
    //     optional: true,
    //     blackbox: true
    // },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true,
        autoform: {
            omit: true
        }
    }
});
Users.attachSchema(UserSchema);