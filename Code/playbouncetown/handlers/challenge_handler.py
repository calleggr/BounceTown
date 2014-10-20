import webapp2

class MainPage(webapp2.RequestHandler):
    def get_template(self):
        return "templates/challenges.html"