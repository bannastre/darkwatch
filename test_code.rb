require 'something'

# Grids are responsible for combining cells in an N x N pattern
class Grid
  N_LENGTH = 3

  attr_reader :cells

  def initialize(cells = {})
    @cells = cells
  end

  def number_of_cells
    N_LENGTH**2
  end

  def populate_cells
    number_of_cells.times { |i| @cells[i + 1] = Cell.new }
  end

  def find_cell(x, y)
    cell_position = (y * N_LENGTH) - (N_LENGTH - x)
    @cells[cell_position].show_contents
  end

  def row(row_number)
    @cells.map do |cell|
      cell[1].show_contents if cell[0] / N_LENGTH == row_number
    end.join
  end

  def in_dictionary?(dictionary, row_number)
    File.open(dictionary).select do |line|
      line if line.split(' ')[0] == row(row_number)
    end[0].delete("\n")
  end
end

class App < Sinatra::Base
  get "/sessions/new" do
    erb :"sessions/new"
  end

  post "/sessions" do
    user = Login.new(User).user(params[:email], params[:password])
    session[:user_id] = user.id if user
    redirect "/"
  end

  delete "/sessions" do
    session.delete(:user_id)
    redirect "/"
  end
end
