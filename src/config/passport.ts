import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../modules/user/models/user.model';
import {userService} from "../modules/user/user.module";
import { UserRoles } from '../common/enums/userRoles.enum';

passport.serializeUser((user: any, done) => done(null, user._id));

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userService.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


// Local Strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await userService.findByEmail(email);
      if (!user) return done(null, false, { message: 'Incorrect email or password' });
      const isValid = await user.comparePassword(password);
      if (!isValid) return done(null, false, { message: 'Incorrect email or password' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));



// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      return done(null, false, { message: 'No email provided by Google profile' });
    }

    let user = await User.findOne({ 
      $or: [{ googleId: profile.id }, { email: email }] 
    });
    
    if (user) {
      if (!user.googleId) {
        user.googleId = profile.id;
        await user.save();
      }
      return done(null, user);
    }

    const newUser = new User({
      googleId: profile.id,
      email: email,
      displayName: profile.displayName || email.split('@')[0],
      username: email.split('@')[0],
      role: UserRoles.USER
    });
    await newUser.save();
    done(null, newUser);
  } catch (err) {
    done(err as any);
  }
}));

export default passport;