(function() {
  $(function() {
    cs.validator.init([$('input[name="address"]'), $('input[name="zip"]'), $('input[name="contactName"]'), $('input[name="contactEmail"]'), $('input[name="contactPhone"]'), $('input[name="terms"]')]);
    return $('input[type="submit"]').click(function(e) {
      var valid;
      valid = cs.validator.validateForm();
      if (!valid) {
        return e.preventDefault();
      }
    });
  });

}).call(this);
