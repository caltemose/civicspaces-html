@cs ?= {}

@cs.validator = 

  fieldsToValidate: []

  init: (fields) ->
    @fieldsToValidate = fields
    @bindField field for field in @fieldsToValidate

  bindField: (field) ->
    if field.attr('type') is 'checkbox'
      field.on 'change', @prepValidatedField
    else
      field.on 'blur', @prepValidatedField

  prepValidatedField: (e) ->
    cs.validator.validateField $ e.target

  validateField: (field) ->
    valid = true
    parent = field.parent()
    span = parent.find 'span'
    rules = field.attr('data-validate-rules').split '|'
    errors = []

    for rule in rules
      do (rule) ->
        switch rule
          when "required" then unless field.val().length > 0
            errors.push rule
          when "zip" then unless field.val().match(cs.validator.patterns.zip)
            errors.push rule
          when "email" then unless field.val().match(cs.validator.patterns.email)
            errors.push rule
          when "checked" then unless field.is(':checked')
            errors.push rule
          else
            break;

    if errors.length
      valid = false
      err = 'Please supply a valid value for this field.' 
      if $.inArray('checked', errors) > -1
        err = 'You must agree to the Terms and Conditions.' 
      span.text err if span.length > 0
      parent.addClass 'has-error'

    else
      span.text('') unless span.length < 1
      parent.removeClass 'has-error'

    valid

  validateForm: ->
    valid = true;
    for field in @fieldsToValidate
      valid = false unless cs.validator.validateField field
    valid
    
  # @TODO fix/test zip and phone patterns
  patterns:  
    zip: /^([0-9]{5,5})$/i,  
    phone: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i,
    email: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/i