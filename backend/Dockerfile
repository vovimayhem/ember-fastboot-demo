# Stage I: Runtime =============================================================
# Step 1: Start off from the ruby official image, alpine version:
FROM ruby:2.5.1-alpine AS runtime

# Step 2: Set the home to the code path, and add the code executables to $PATH:
ENV HOME=/usr/src PATH=/usr/src/bin:$PATH

# Step 3: Set the main working directory:
WORKDIR /usr/src

# Step 4: Add the runtime packages (needed for the app to run) using Alpine's
# package manager:
RUN apk add --no-cache ca-certificates less libpq nodejs openssl tzdata

# Stage II: Development ========================================================
# Step 5: Use the "runtime" stage as the starting point:
FROM runtime AS development

# Step 6: Add the development packages (compilers, dev headers, etc):
RUN apk add --no-cache \
  build-base \
  chromium \
  chromium-chromedriver \
  git \
  postgresql-dev

# Step 7: Copy the project's Gemfile:
COPY Gemfile* /usr/src/

# Step 8: Download & Install the project's ruby libraries:
RUN bundle install --jobs=4 --retry=3

# Step 9: Set the default command for development images:
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]

# III: Testing stage: ==========================================================
# In this stage we'll add the current code from the project's source, so we can
# run tests with the code.
# Step 10: Start off from the "development" stage:
FROM development AS testing

# Copy the rest of the code:
COPY . /usr/src

# Stage IV: Builder ============================================================
# Pick off from development image:
FROM testing AS builder

# Precompile assets:
RUN DATABASE_URL=postgres://postgres@example.com:5432/fakedb \
 SECRET_KEY_BASE=10167c7f7654ed02b3557b05b88ece \
 RAILS_ENV=production \
 rails assets:precompile

# Cleanup the ruby libraries not used in a productive context:
RUN bundle config without development:test \
 && bundle clean

# Stage V: Release ============================================================
# Pick off from runtime image:
FROM runtime AS release

# Copy the ruby libraries remaining after the cleanup:
COPY --from=builder /usr/local/bundle /usr/local/bundle

# Copy the code including the compiled assets:
COPY --from=builder /usr/src /usr/src

# Set the environment name variables & default PORT:
ENV RAILS_ENV=production RACK_ENV=production PORT=3000

# Set the default command for deployable images:
CMD [ "puma" ]
