JsonapiSpecHelpers::Payload.register :post do
  key :body
  key(:'created-at') { |record| record.created_at }
  key(:'updated-at') { |record| record.updated_at }
end
