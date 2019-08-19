class TweetsController < ApplicationController

  def index
    @tweets = Tweet.all.order(created_at: :desc).limit(30)
  end
  
  def new
    @tweet = Tweet.new
  end
  
  def create
    Tweet.create(user_id: current_user.id,text: tweet_params[:text],image: tweet_params[:image])
    respond_to do |format|
      format.js { render ajax_redirect_to(root_path) }
    end
  end
  
  def destroy
    tweet = Tweet.find(params[:id])
    tweet.destroy if tweet.user_id == current_user.id
    redirect_to action: 'index'
  end
  
  def edit
    @tweet = Tweet.find(params[:id])
  end
  
  def show
    @tweet = Tweet.find(params[:id])
    @comments = @tweet.comments.includes(:user).order(created_at: :desc)
    @comment = Comment.new
  end
  
  def update
    tweet = Tweet.find(params[:id])
    if tweet.user_id == current_user.id
      tweet.update(tweet_params)
    end
    respond_to do |format|
      format.js { render ajax_redirect_to(root_path) }
    end
  end
  
  def search
    @tweets = Tweet.where("text LIKE(?)","%#{search_params[:keyword]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end
  
private
  def tweet_params
    params.permit(:text,:image)
  end

  def search_params
    params.permit(:keyword)
  end

  def ajax_redirect_to(redirect_uri)
    { js: "window.location.replace('#{redirect_uri}');" }
  end
end
