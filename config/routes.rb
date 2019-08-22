Rails.application.routes.draw do
  root 'tweets#index'
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
  resources :likes, only: [:create, :destroy]
  resources :users, only: [:show]
  resources :tweets do
    resources :comments, only: [:create]
    resources :likes, only: [:create,:destroy]
    collection do
      get 'search'
    end
  end
end
