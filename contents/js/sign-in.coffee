$ ->
  cs.validator.init(
    [
      $('input[name="email"]'),
      $('input[name="password"]')
    ]
  )
  $('input[type="submit"]').click (e) ->
    valid = cs.validator.validateForm()
    e.preventDefault() unless valid
