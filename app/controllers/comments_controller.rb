class CommentsController < ApplicationController

  def create
    Comment.create(text:comment_params[:text],user_id: current_user.id,tweet_id: comment_params[:tweet_id])
    redirect_to "/tweets/#{comment_params[:tweet_id]}"
  end

  private
  def comment_params
    params.require(:comment).permit(:text).merge(tweet_id: params[:tweet_id], user_id: current_user.id)
  end
end
