Rails.application.routes.draw do
    namespace :api do
      namespace :v1 do
        resources :users
      end
    end
  


  root 'private#welcome'
  devise_for :users, 
    path: '', 
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
    delete '/logout', to: 'users/sessions#destroy', as: :logout

    # get 'course', to: 'course#index'
    # post 'course/create'
    # delete 'course/:id', to: 'course#destroy'

    # resources :course, only: [:index, :create, :destroy]
    resources :course, only: [:index, :create, :show, :update, :destroy]
    post '/course/:course_id/add_user/:user_id', to: 'user_course#create'
    

    resources :group, only: [:index, :create, :show, :update, :destroy]
    resources :user_groups
    # post '/groups/:group_id/add_user/:user_id', to: 'groups#add_user'
    post '/group/:group_id/add_user/:user_id', to: 'user_groups#create'
    # post '/group/:group_id/add_user/:user_id/group/:group_id/add_user/:user_id'
    # resources :course
    resources :health

  

  end
