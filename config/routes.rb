Rails.application.routes.draw do
  resources :products, controller: "products", type: "Good"
  # scope :products do
  #   resources :air_conditioners, as: "acs", type: "Ac"
  # end
  resources :modifications, controller: "products", type: "Mod"
  get "download_pdf/:id", to: "main#download_pdf", as: "download_pdf"

  root 'main#index'
end
