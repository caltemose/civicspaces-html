(function() {
  $(function() {
    cs.validator.init([$('input[name="email"]'), $('input[name="password"]')]);
    return $('input[type="submit"]').click(function(e) {
      var valid;
      valid = cs.validator.validateForm();
      if (!valid) {
        return e.preventDefault();
      }
    });
  });

}).call(this);
