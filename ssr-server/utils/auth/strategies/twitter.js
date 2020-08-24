const passport = require('passport')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const { get } = require('lodash')

const axios = require('axios');
const boom = require('@hapi/boom');

const {config} = require('../../../config');

//OAuth1.0

passport.use(
  new TwitterStrategy({
    consumerKey: config.twitterComsumerKey,
    consumerSecret: config.twitterComsumerSecret,
    callbackURL: "/auth/twitter/callback",
    includeEmail: true
  },
  async function(token, tokenSecret, profile, cb){
    const { data, status } = axios({
      url: `${config.apiUrl}/api/sign-povider`,
      method: 'post',
      data: {
        name: profile.displayName,
        email: get(profile, 'emails.0.value', `${profile.username}@twitter.com`),
        passport: profile.id,
        apiKeyToken: config.apiKeyToken
      }
    })

    if(!data || status !== 200){
      return cb(boom.unauthorized(), false)
    }

    return cb(null, data)
  }
  )
)