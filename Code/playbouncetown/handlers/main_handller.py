import webapp2

### Pages ###

class HomePage(webapp2.RequestHandler):
  def get_template(self):
    return "templates/home.html"


### Actions ###

class SetDisplayNameAction():
  def handle_post(self, player):
    """ Used to set the display name for a player. """
    player.display_name = self.request.get('display_name')
    player.put()
    self.redirect(self.request.referer)