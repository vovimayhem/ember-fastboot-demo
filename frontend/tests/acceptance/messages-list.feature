@setupApplicationTest
Feature: Messages List

Scenario: Visiting the messages screen
  Given there is a post "Test Post" from "test-user-1"
  When I visit the "messages" page
  Then I should see the post "Test Post" from "test-user-1"
