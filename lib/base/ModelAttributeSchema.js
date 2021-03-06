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

/**
 * @class Jii.base.ModelAttributeSchema
 * @extends Jii.base.Object
 */
Jii.defineClass('Jii.base.ModelAttributeSchema', /** @lends Jii.base.ModelAttributeSchema.prototype */{

	__extends: 'Jii.base.Object',

	/**
	 * @var {string} name of this column (without quotes).
	 */
	name: null,

	/**
	 * @var {string} abstract type of this column. Possible abstract types include:
	 * string, text, boolean, smallint, integer, bigint, float, decimal, datetime,
	 * timestamp, time, date, binary, and money.
	 */
	type: null,

	/**
	 * @var {string} the JS type of this column. Possible JS types include:
	 * string, boolean, number, double.
	 */
	jsType: null,

	/**
	 * @var {*} default value of this column
	 */
	defaultValue: null,

	/**
	 * @var {boolean} whether this column is a primary key
	 */
	isPrimaryKey: false,

	/**
	 * Converts the input value according to [[jsType]].
	 * If the value is null or an [[Expression]], it will not be converted.
	 * @param {*} value input value
	 * @return {*} converted value
	 */
	typecast: function(value) {
		if (value === '' && this.type !== Jii.sql.BaseSchema.TYPE_TEXT &&
			this.type !== Jii.sql.BaseSchema.TYPE_STRING &&
			this.type !== Jii.sql.BaseSchema.TYPE_BINARY) {
			return null;
		}

		// @todo php->js types
		if (value === null || typeof(value) === this.jsType || value instanceof Jii.sql.Expression) {
			return value;
		}

		switch (this.jsType) {
			case 'string':
				return String(value);

			case 'number':
				return Jii._.isBoolean(value) ?
					(value ? 1 : 0) :
					parseFloat(value);

			case 'boolean':
				return !!value;
		}

		return value;
	},

    toJSON: function() {
        var obj = {};

        if (this.defaultValue !== null) {
            obj.defaultValue = this.defaultValue;
        }
        if (this.isPrimaryKey) {
            obj.isPrimaryKey = this.isPrimaryKey;
        }
        if (this.jsType !== null) {
            obj.jsType = this.jsType;
        }
        if (this.name !== null) {
            obj.name = this.name;
        }

        if (Jii._.isEmpty(obj)) {
            return this.type;
        }

        if (this.type !== null) {
            obj.type = this.type;
        }
        return obj;
    }

});
