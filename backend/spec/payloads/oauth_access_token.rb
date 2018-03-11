JsonapiSpecHelpers::Payload.register :oauth_access_token do
  key :'expires-in-seconds', allow_nil: true
  key(:scopes) { |record| record.scopes.as_json }
  key(:'created-at') { |record| record.created_at }
end
