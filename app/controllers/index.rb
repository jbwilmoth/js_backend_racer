#===============GET=================

get '/' do
  # Look in app/views/index.erb
  erb :index
end

# Gets the game by unique SecureRandom url.
get '/game' do
  @game = Game.find_by_url(session[:url])
  erb :game
end

# Gets the stats of the last game played.
get '/end_game' do
  @game = Game.last
  erb :end_game
end

#==============POST=================

# Creates a new game with 2 new players and assigns a unique url to the session.
post '/game' do
  player1 = Player.find_or_create_by_name(:name => params["newgame"]["player1"])
  player2 = Player.find_or_create_by_name(:name => params["newgame"]["player2"])
  game = Game.create(:url => SecureRandom.urlsafe_base64)
  game.players << player1 << player2
  session[:url] = game.url
  redirect '/game'
end

# Assigns the winner and stats to the session url. Game time is a float.
post '/end_game' do
  @game = Game.find_by_url(session[:url])
  winner = (params["winner"] == ? @game.players.first : @game.players.last)
  @game.update_attributes(:winner => winner.id, :game_time => params["game_time"].to_f)
end


