$ ->
  cs.validator.init(
    [
      $('input[name="address"]'),
      $('input[name="zip"]'),
      $('input[name="contactName"]'),
      $('input[name="contactEmail"]'),
      $('input[name="contactPhone"]'),
      $('input[name="terms"]')
    ]
  )
  $('input[type="submit"]').click (e) ->
    valid = cs.validator.validateForm()
    e.preventDefault() unless valid
