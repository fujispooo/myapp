class LikesController < ApplicationController
  def create
    @tweet = Tweet.find(params[:tweet_id])
    @tweet.iine(current_user)
    respond_to do |format|
      format.html { redirect_to request.referrer || root_path }
      format.js
    end
  end

  def destroy
    @tweet = Like.find(params[:id]).tweet
    @tweet.remove_iine(current_user)
    respond_to do |format|
      format.html { redirect_to request.referrer || root_path }
      format.js
    end
  end
end
