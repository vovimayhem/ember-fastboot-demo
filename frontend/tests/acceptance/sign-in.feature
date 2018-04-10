@setupApplicationTest
Feature: Sign-In

Scenario: Signing-in to the app
  Given I visit the "home" page
  When I click on the "sign-in" link
  Then I should be redirected to the "sign-in" page
