Rails.application.routes.draw do
    namespace :api do
      namespace :v1 do
        resources :users do 
          member do
            patch 'update_state'
          end
        end
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

    resources :course
    post '/course/:course_id/add_user/:user_id', to: 'user_course#create'
  
    resources :group, only: [:index, :create, :show, :update, :destroy] do
      get 'group_users', on: :member
    end
    
    post '/group/:group_id/add_user/:user_id', to: 'user_groups#create'  
    # post '/group/:groupId/add_user', to: 'user_groups#create'
    # get '/user_groups', to: 'user_groups#find'

    post '/assign_group', to: 'course_group#assign_group' 
    get 'groups/:name', to: 'groups#show_by_name', as: 'group_by_name'


    resources :user_groups, only: [:index, :create, :destroy] 
    delete '/group/:group_id/remove_user/:user_id', to: 'user_groups#destroy'

    
    resources :health
    resources :health_controllers

    resources :medical_record

    resources :course_group


    resources :user_roles, only: [:show, :index] do
      member do
        patch 'update_role'
        patch 'update_state'
      end
    end

    resources :subject
    get 'subject_types' , to: 'subject#subject_types'

    resources :user_subject


  end
