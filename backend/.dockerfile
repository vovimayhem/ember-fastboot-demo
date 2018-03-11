# Ignore docker and environment files:
*Dockerfile*
docker-compose*.yml
**/*.env
bin/dev-entrypoint
.dockerignore

# Ignore log files:
log/*.log

# Ignore temporary files:
tmp/

# Ignore test files:
.rspec
Guardfile
spec/

# Ignore springified binstubs - we'll leave the `bin/rails` and `bin/rake` as they are used by hutch
# to detect a rails app:
bin/rspec
config/spring.rb

# Ignore OS artifacts:
**/.DS_Store

.rspec

# 3: Ignore Development container's Home artifacts:
# 3.1: Ignore bash / IRB / Byebug history files
.*_hist*

# 3.3: bundler stuff
.bundle/*

# 3.4: Codeclimate stuff:
.codeclimate.yml
.csslintrc
.eslintignore
.eslintrc
.rubocop.yml
coffeelint.json

# Ignore development executables:
bin/checkdb
bin/setup
bin/spring
bin/update
bin/dev-entrypoint

# Ignore test coverage reports:
coverage/*

# Ignore auto-generated documentation:
docs/**/*.apib
docs/**/*.html
