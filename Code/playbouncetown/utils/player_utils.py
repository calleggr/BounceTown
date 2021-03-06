from models import Player
import logging
from google.appengine.ext import ndb
from google.storage.speckle.proto.jdbc_type import NULL


def get_player_from_email(email):
  """Helper method to get the Player object corresponding to the given User.
  Creates a new Player object if one didn't exist already.
  """
  email = email.lower()
  player = Player.get_by_id(email, parent=get_parent_key_from_email(email))
  logging.info("player = " + str(player)) 
  if not player:
    logging.info("Failed to find player by id, creating new user")
    player = Player(parent = get_parent_key_from_email(email),
                    id = email)
    player.put()
  return player

def get_parent_key(user):
    return get_parent_key_from_email(user.email())

def get_parent_key_from_email(email):
    return ndb.Key("Entity", email.lower())

def retrieve_player_from_email(email):
    email = email.lower()
    player = Player.get_by_id(email, parent=get_parent_key_from_email(email))
    if not player:
        return NULL
    return player

