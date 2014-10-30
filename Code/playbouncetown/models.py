from google.appengine.ext import ndb

class Player(ndb.Model):
        """ Human Player in the dice with friends game """
        display_name = ndb.StringProperty()
        hourly_high_score = ndb.StringProperty()
        daily_high_score = ndb.StringProperty()
        all_time_high_score = ndb.StringProperty()
        friends = ndb.StringProperty(repeated=True)
        def get_name(self):
            """ Returns best available for a Player"""
            if self.display_name:
                return self.display_name
            return self.key.string_id()  # Email address
 
class Game(ndb.Model):
    """ Game between two players """
    creator_key = ndb.KeyProperty(kind=Player)
    invitee_key = ndb.KeyProperty(kind=Player)
    creator_scores = ndb.IntegerProperty(repeated=True)
    invitee_scores=ndb.IntegerProperty(repeated=True)
    last_touch_date_time = ndb.DateTimeProperty(auto_now=True)
    is_complete = ndb.BooleanProperty(default=False)
