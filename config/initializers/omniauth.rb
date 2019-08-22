Rails.application.config.middleware.use OmniAuth::Builder do 
  {provider_ignores_state: true}
end