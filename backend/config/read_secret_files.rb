# Reads the specified secret paths (i.e. Docker Secrets) into environment
# variables:

require 'active_support'
require 'active_support/core_ext/object'

# Process only a known list of env vars that can filled by reading a file (i.e.
# a docker secret):
Dir["#{ENV.fetch('SECRETS_PATH', '/run/secrets/')}*"].each do |secret_filepath|
  secret_envvarname = File.basename(secret_filepath, ".*").upcase

  # Skip if variable is already set - already-set variables have precedence over
  # the secret files:
  next if ENV.key?(secret_envvarname) && ENV[secret_envvarname].present?

  ENV[secret_envvarname] = File.read(secret_filepath).strip
end

# Substitute the URL passwords with the ones stored on the *_PASS
# DATABASE_URL: postgres://postgres@postgres.5432/demo_production
# DATABASE_PASSWORD: lalito
require 'uri' if (url_keys = ENV.keys.select { |key| key =~ /_URL/ }).any?

url_keys.each do |url_key|
  pass_key = url_key.gsub('_URL', '_PASSWORD')
  next unless ENV.key?(url_key) && ENV.key?(pass_key)

  uri = URI(ENV[url_key])
  uri.password = ENV[pass_key]
  ENV[url_key] = uri.to_s
end

# STDERR.puts ENV.inspect
