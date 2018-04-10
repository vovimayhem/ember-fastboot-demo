@setupApplicationTest
Feature: Messages List

Scenario: Visiting the home screen
  Given there is a post "Test Post" from "test-user-1"
  When I visit the "home" page
  Then I should see the post "Test Post" from "test-user-1"
