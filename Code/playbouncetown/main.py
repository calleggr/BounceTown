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
    
    def update_values(self, player, values):
        # Score.query().order(-Score.last_touch_date_time)
        
        if(len(player.scores) < 1):
            values["last_score"] = 0
        else:    
            values["last_score"] = player.scores[-1];
        
class ScoresPage(base_handlers.BasePage):
    def get_template(self):
        return "templates/score.html"
    
    def update_values(self, player, values):
        top_ten = []
        top_twentyfive = []
        top_scores = sorted(player.scores)
        last_ten = []
        last_twentyfive = []
        top_scores_max = []
        for k in range (0,min(len(player.scores), 10)):
            last_ten.append(player.scores[-1*k])
        for k in range (0,min(len(player.scores), 25)):
            last_twentyfive.append(player.scores[-1*k])
        for k in range (1,min(len(top_scores)-1, 11)):
            top_ten.append(top_scores[-1*k])
        for k in range (1,min(len(top_scores)-1, 26)):
            top_twentyfive.append(top_scores[-1*k])
            
        for k in range (0,len(top_scores)-1):
            top_scores_max.append(top_scores[len(top_scores)-1-k]) 
              
        values["top_ten"] = top_ten
        values["top_twentyfive"] = top_twentyfive
        values["last_ten"] = last_ten
        values["last_twentyfive"] = last_twentyfive
        values["sorted_min"] = top_scores
        values["sorted_max"] = top_scores_max
        
        
        
        
     
        

app = webapp2.WSGIApplication([
    ('/', main_handlers.HomePage),
    ('/play', PlayPage),
    ('/addScore', AddScore),
    ('/scores', ScoresPage),
    ('/setdisplayname', main_handlers.SetDisplayNameAction),
], debug=True)
