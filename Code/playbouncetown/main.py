#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os
import jinja2
import webapp2

from handlers import main_handlers
from utils import date_utils
from handlers import base_handlers

from models import Player
from models import Score


jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)), autoescape=True)
jinja_env.filters["date_format"] = date_utils.date_format

    
        
class AddScore(base_handlers.BaseAction):
    def handle_post(self, player):
        new_score = int(self.request.get("new_score"))
        player.scores.append(new_score)
        player.put()
        self.redirect(self.request.referer)
        
class PlayPage(base_handlers.BasePage):
    def get_template(self):
        return "templates/play.html"
    
    def update_values(self,player,values):
        #Score.query().order(-Score.last_touch_date_time)
        last_five_scores = []
        for x in range(0,min(5,len(player.scores)-1)):
            last_five_scores.append(player.scores[-1])
        values["last_five_scores"] = last_five_scores
        values["last_score"] = player.scores[-1];
        
class Scores(base_handlers.BasePage):
    def get_template(self):
        return "templates/scores.html"
    
    def update_values(self,player,values):
         pass
        

app = webapp2.WSGIApplication([
    ('/', main_handlers.HomePage),
    ('/play', PlayPage),
    ('/addScore', AddScore)
], debug=True)
