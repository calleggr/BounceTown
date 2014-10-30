import base_handlers

### Pages ###

class HomePage(base_handlers.BasePage):
  def get_template(self):
    return "templates/home.html"

  def update_values(self, player, values):
    pass
class FriendPage(base_handlers.BasePage):
    def get_template(self):
        return "templates/friends.html"
    
    def update_values(self, player, values):
        pass
### Actions ###

class SetDisplayNameAction(base_handlers.BaseAction):
  def handle_post(self, player):
    """ Used to set the display name for a player. """
    player.display_name = self.request.get('display_name')
    player.put()
    self.redirect(self.request.referer)
    
    
class AddFriend(base_handlers.BaseAction):
    def handle_post(self, player, friend):
        player.friends.append(friend)
        player.put()
        self.redirect(self.request.referer)
        
