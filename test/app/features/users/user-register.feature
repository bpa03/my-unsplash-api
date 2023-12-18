Feature: User Register
  In order to have an account
  I want to can register with an email and password

  Scenario: An invalid request body
  Given I send a POST request to "/register" with body:
  """
  {}
  """
  Then the response status code should be 422

  Scenario: Request with valid email and password
  Given I send a POST request to "/register" with body:
  """
  {
    "email": "bpa@gmail.com",
    "password": "12345678"
  }
  """
  Then the response status code should be 201
  Then the response should be empty

  Scenario: User already exists
  Given I send a POST request to "/register" with body:
  """
  {
    "email": "test@gmail.com",
    "password": "12345678"
  }
  """
  Then the response status code should be 400