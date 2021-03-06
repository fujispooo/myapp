class CommentsController < ApplicationController

  def create
    @comment = Comment.create(text:comment_params[:text],user_id: current_user.id,tweet_id: comment_params[:tweet_id],parent_id:comment_params[:parent_id])
    respond_to do |format|
      format.html { redirect_to "/tweets/#{comment_params[:tweet_id]}"}
      format.json
    end
  end

  
  private
  def comment_params
    params.require(:comment).permit(:text,:parent_id).merge(tweet_id: params[:tweet_id], user_id: current_user.id)
  end
end
