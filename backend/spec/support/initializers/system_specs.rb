# The default 'selenium_chrome_headless' capybara driver lacks the 'no-sandbox' option, and crashes
# when run inside the development container:
Capybara.register_driver :selenium_chrome_headless do |app|
  options = Selenium::WebDriver::Chrome::Options.new args: %w[headless disable-gpu no-sandbox]
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

RSpec.configure do |config|
  # For "normal" system tests (i.e. no javascript UI, etc) use the :rack_test driver:
  config.before :each, type: :system do
    driven_by :rack_test
  end

  # For system tests involving javascript use the :selenium_chrome_headless driver:
  config.before :each, type: :system, js: true do
    driven_by :selenium_chrome_headless
  end
end
