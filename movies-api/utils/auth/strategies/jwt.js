const passport = require('passport');
const { Strategy, ExtractJwt} = require('passport-jwt');

const boom = require('@hapi/boom');

const UserService = require('../../../services/users');
const { config } = require('../../../config');

passport.use(
  new Strategy({
    secretOrKey: config.authJtwSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()//esto indica que vamos a sacar el JWT del Header de la petición
  },
  await function(tokenPayload, cb){
    const userService = new UserService();
    try {
      const user = await userService.getUser({ email: tokenPayload.email });

      if(!user){
        return cb(boom.unauthorized(), false)
      }

      delete user.passport;

      cb(null, {...user, scope: tokenPayload.scopes})
    } catch (error) {
      return cb(error)
    }
  }
  )
)


