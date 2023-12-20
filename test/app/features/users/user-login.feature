Feature: User Register
  In order to access the app
  I want to can login with an email and password

  Scenario: An invalid request body
  Given I send a POST request to "/register" with body:
  """
  {}
  """
  Then the response status code should be 422

  Scenario: request with existing user
  Given I send a POST request to "/login" with body:
  """
  {
    "email": "test@gmail.com",
    "password": "12345678"
  }
  """
  Then the response status code should be 200

  Scenario: request with not existing user
  Given I send a POST request to "/login" with body:
  """
  {
    "email": "random@gmail.com",
    "password": "12345678"
  }
  """
  Then the response status code should be 401

  Scenario: request with invalid credentials (password)
  Given I send a POST request to "/login" with body:
  """
  {
    "email": "test@gmail.com",
    "password": "random"
  }
  """
  Then the response status code should be 401