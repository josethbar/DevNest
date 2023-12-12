Rails.application.routes.draw do
    namespace :api do
      namespace :v1 do
        resources :users
        # Agrega más recursos si necesitas más controladores dentro de este namespace
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
    

    resources :group, only: [:index, :create, :show, :update, :destroy]
    resources :user_groups
    # post '/groups/:group_id/add_user/:user_id', to: 'groups#add_user'
    post '/groups/:group_id/add_user/:user_id', to: 'user_groups#create'
    # resources :course

  end
