import json
import tweepy
from tweepy import Stream
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
 
consumer_key = '7IFFoi0i2Flc7pA6cf7PdXdAM'
consumer_secret = 'P1jMNCZqQuTecNBZnkjCqXCNerZFDs2FFDVCrXYDepDmwxDEKD'
access_token = '842449503093321728-DyyM9VflvFgM3Fj1DNDeKe4nxdG4nOY'
access_secret = 'Y7OyVLHrYhaiOZxvFSUfoZWXPlr10u3QCe1qflaekVxW7'
 
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)

api = tweepy.API(auth)
f = open('output.json', 'a')

gotKeyWords = ['game of thrones', '#got' ,'#gotseason7', 'gameofthrones', 'jon snow', 'you know nothing', 'lannister', 'targaryen', 'George R.R. Martin']


class MyListener(StreamListener):
 
    def on_data(self, data):
        count = 0

        #How many tweets you want to find, could change to time based
        if count <= 100:
            json_data = json.loads(data)
            coords = None
            
            try:
                coords = json_data["coordinates"]
                if coords == None:
                    print "Null coords"
            except KeyError:
                print "Coords not found!"
                return
            
            if coords is not None:
                f.write(data)
                print coords["coordinates"]
                count += 1
        return True
 
    def on_error(self, status):
        print(status)
 
twitter_stream = Stream(auth, MyListener())
#twitter_stream.filter(track=['#got']) # Grab tweets with the specified term that also have geotags
twitter_stream.filter(track=gotKeyWords) # Grab tweets with the specified terms
f.close()

