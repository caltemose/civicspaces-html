(function() {
  if (this.cs == null) {
    this.cs = {};
  }

  this.cs.validator = {
    fieldsToValidate: [],
    init: function(fields) {
      var field, _i, _len, _ref, _results;
      this.fieldsToValidate = fields;
      _ref = this.fieldsToValidate;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        _results.push(this.bindField(field));
      }
      return _results;
    },
    bindField: function(field) {
      if (field.attr('type') === 'checkbox') {
        return field.on('change', this.prepValidatedField);
      } else {
        return field.on('blur', this.prepValidatedField);
      }
    },
    prepValidatedField: function(e) {
      return cs.validator.validateField($(e.target));
    },
    validateField: function(field) {
      var err, errors, parent, rule, rules, span, valid, _fn, _i, _len;
      valid = true;
      parent = field.parent();
      span = parent.find('span');
      rules = field.attr('data-validate-rules').split('|');
      errors = [];
      _fn = function(rule) {
        switch (rule) {
          case "required":
            if (!(field.val().length > 0)) {
              return errors.push(rule);
            }
            break;
          case "zip":
            if (!field.val().match(cs.validator.patterns.zip)) {
              return errors.push(rule);
            }
            break;
          case "email":
            if (!field.val().match(cs.validator.patterns.email)) {
              return errors.push(rule);
            }
            break;
          case "checked":
            if (!field.is(':checked')) {
              return errors.push(rule);
            }
            break;
          default:
            break;
        }
      };
      for (_i = 0, _len = rules.length; _i < _len; _i++) {
        rule = rules[_i];
        _fn(rule);
      }
      if (errors.length) {
        valid = false;
        err = 'Please supply a valid value for this field.';
        if ($.inArray('checked', errors) > -1) {
          err = 'You must agree to the Terms and Conditions.';
        }
        if (span.length > 0) {
          span.text(err);
        }
        parent.addClass('has-error');
      } else {
        if (!(span.length < 1)) {
          span.text('');
        }
        parent.removeClass('has-error');
      }
      return valid;
    },
    validateForm: function() {
      var field, valid, _i, _len, _ref;
      valid = true;
      _ref = this.fieldsToValidate;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        if (!cs.validator.validateField(field)) {
          valid = false;
        }
      }
      return valid;
    },
    patterns: {
      zip: /^([0-9]{5,5})$/i,
      phone: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i,
      email: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/i
    }
  };

}).call(this);
