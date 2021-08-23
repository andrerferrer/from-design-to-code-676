class MoviesController < ApplicationController
  def index
    @movies = Movie.order(year: :desc)

    if params[:query].present?
      @movies = @movies.where('title ILIKE ?', "%#{params[:query]}%")
    end

    # by default this runs here hidden
    respond_to do |format|
      
      # this here is just trivia for you. Rails does this by default
      format.html do 
        render :index #html.erb 
      end

      format.text do
        render partial: 'movies/list', locals: { movies: @movies }, formats: [:html]
      end
    end

  end

  def update
    # find the movie
    @movie = Movie.find(params[:id])
    # update the movie
    @movie.update(strong_params)
    # respond with something
    respond_to do |format|
      format.html { redirect_to movies_path }
      format.text { render partial: 'movies/movie_infos', locals: { movie: @movie }, formats: [:html] }
    end
    
  end

  private 

  def strong_params
    params.require(:movie)
          .permit(:title, :year)
  end
end
