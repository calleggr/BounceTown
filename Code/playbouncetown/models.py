from google.appengine.ext import ndb

class Player(ndb.Model):
        display_name = ndb.StringProperty()
        scores = ndb.IntegerProperty(repeated=True)
        def get_name(self):
            """ Returns best available for a Player"""
            if self.display_name:
                return self.display_name
            return self.key.string_id()  # Email address
 
        def get_email(self):
            return self.key.string_id()
class Score(ndb.Model):
    creator_key = ndb.KeyProperty(kind=Player)
    last_touch_date_time = ndb.DateTimeProperty(auto_now=True)
    score = ndb.IntegerProperty()
    
