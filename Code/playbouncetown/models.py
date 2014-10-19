from google.appengine.ext import ndb




class Player():
  display_name = ndb.StringProperty()
  past_opponent_emails = ndb.StringProperty(repeated=True)
  hourly_high_score = ndb.StringProperty()
  daily_high_score = ndb.StringProperty()
  all_time_high_score = ndb.StringProperty()
  friends = ndb.StringProperty(repeated=True)
  def get_name(self):
    """Returns the best name available for a Player."""
    if self.display_name:
      return self.display_name
    return self.key.string_id()  # email address


class Game():
  """ BounceTown Game """

  last_touch_date_time = ndb.DateTimeProperty(auto_now=True)
  user_id = ndb.StringProperty()
  score = ndb.IntegerProperty()
  
  
class Challenge():
    """ A challenge """
    is_completed = ndb.BooleanProperty(default=False)
    challenge_length = ndb.StringProperty()
    challenger_high_score = ndb.StringProperty()
    challengee_high_score = ndb.StringProperty()
