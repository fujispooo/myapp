class TweetsController < ApplicationController

  def index
    @tweets = Tweet.all.order(created_at: :desc)
  end

  def new
    @tweet = Tweet.new
  end

  def create
    Tweet.create(user_id: current_user.id,text: tweet_params[:text],image: tweet_params[:image])
    respond_to do |format|
      flash[:notice] = "ツイートが完了しました"
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
      flash[:notice] = "ツイートの編集が完了しました"
      format.js { render ajax_redirect_to(root_path) }
    end
  end
  
private
  def tweet_params
    params.permit(:text,:image)
  end

  def ajax_redirect_to(redirect_uri)
    { js: "window.location.replace('#{redirect_uri}');" }
  end
end
