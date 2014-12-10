/**
 * Created by harshmalewar on 12/8/14.
 */
'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    url = require('url'),
    DropboxOAuth2Strategy = require('passport-dropbox-oauth2').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users');

module.exports = function() {
    // Use dropbox strategy
    passport.use(new DropboxOAuth2Strategy({
            clientID: config.dropbox.clientID,
            clientSecret: config.dropbox.clientSecret,
            callbackURL: config.dropbox.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            // Set the provider data and include tokens
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;
            var name = profile.displayName;
            var nameArray = name.split(' ');
            console.log(nameArray);
            // Create the user OAuth profile
            var providerUserProfile = {
                firstName: nameArray[0],
                lastName: nameArray[1],
                displayName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.emails[0].value,
                provider: 'dropbox',
                dropboxAuthenticated: true,
                providerIdentifierField: 'email',
                providerData: providerData
            };

            // Save the user OAuth profile
            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};


