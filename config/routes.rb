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


    # Rails.application.routes.draw do
    #   devise_for :users, path: '', path_names: {
    #     sign_in: 'login',
    #     sign_out: 'logout',
    #     registration: 'signup'
    #   },
    #   controllers: {
    #     sessions: 'users/sessions',
    #     registrations: 'users/registrations'
    #   }
    # end

    
    # get 'course', to: 'course#index'
    # post 'course/create'
    # delete 'course/:id', to: 'course#destroy'

    # resources :course, only: [:index, :create, :destroy]
    resources :course
    post '/course/:course_id/add_user/:user_id', to: 'user_course#create'
  
    resources :group, only: [:index, :create, :show, :update, :destroy] do
      get 'show_users', on: :member
    end
    # post '/group/:group_id/add_user/:user_id', to: 'user_groups#create'  //origin
    post '/group/:groupId/add_user', to: 'user_groups#create'
    # get '/user_groups', to: 'user_groups#find'


    # match 'assign_group/:group_id', to: 'course_group#assign_group', as: :assign_group, via: [:get, :post]
    # match 'assign_group/:course_id/:group_id', to: 'course_group#assign_group', as: :assign_group, via: [:get, :post]  se estaba usando esta anytes de pruebas
    # config/routes.rb

    # post '/assign_group/:course_id/:group_id', to: 'course_group#assign_group' 

    post '/assign_group', to: 'course_group#assign_group' 




    resources :user_groups, only: [:index, :create, :destroy] 
    
    resources :health
    resources :health_controllers

    resources :medical_record

    resources :course_group
    # post 'assign_group/:group_id', action: :assign_group, as: :assign_group

    # post '/course/assign_group/:group_id', to: 'course_group#assign_group', as: :assign_group
    # post 'assign_group/:group_id', to: 'course_group#assign_group', as: :assign_group


    get '/user_role', to: 'user_roles#show'

    resources :subject

    # post '/refresh-token', to: 'auth#refresh_token'


  end
