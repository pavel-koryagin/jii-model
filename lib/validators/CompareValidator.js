/**
 * @author <a href="http://www.affka.ru">Vladimir Kozhin</a>
 * @license MIT
 */

'use strict';

/**
 * @namespace Jii
 * @ignore
 */
var Jii = require('jii');

require('./Validator');

/**
 * @class Jii.validators.CompareValidator
 * @extends Jii.validators.Validator
 */
Jii.defineClass('Jii.validators.CompareValidator', /** @lends Jii.validators.CompareValidator.prototype */{

	__extends: 'Jii.validators.Validator',

    compareAttribute: null,

    compareValue: null,

    operator: '==',

    init: function() {
        this.__super();
        if (this.message === null) {
            this.message = ''; // @todo
        }
    },

    validateAttribute: function(object, attribute) {
        var compareLabel = null;
        var value = object.get(attribute);

        if (Jii._.isArray(value)) {
            this.addError(object, attribute, Jii.t('{attribute} is invalid.'));
            return;
        }

        if (this.compareValue === null) {
            if (this.compareAttribute === null) {
                this.compareAttribute = attribute + '_repeat';
            }
            compareLabel = object.getAttributeLabel(this.compareAttribute);
            this.compareValue = object.get(this.compareAttribute);
        } else {
            compareLabel = this.compareValue;
        }

        if (!this.validateValue(value)) {
            this.addError(object, attribute, this.message, {
                compareAttribute: compareLabel,
                compareValue: this.compareValue
            });
        }
    },

    validateValue: function(value) {
        if (!this.compareValue) {
            throw new Jii.exceptions.ApplicationException('CompareValidator::compareValue must be set.');
        }

        switch (this.operator) {
            case '==': return this.compareValue == value;
            case '===': return this.compareValue === value;
            case '!=': return this.compareValue != value;
            case '!==': return this.compareValue !== value;
            case '>': return this.compareValue > value;
            case '>=': return this.compareValue >= value;
            case '<': return this.compareValue < value;
            case '<=': return this.compareValue <= value;
        }
        return false;
    }

});
