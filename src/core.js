const XML = require('xml-artist');

class Scale {

    constructor(scale, precision) {
        this.scale = scale;
        this.precision = precision;

        this.scaleProperties = [
            "width",
            "height",
            "x",
            "y",
            "r",
            "rx",
            "ry",
            "stroke-width",
            "c",
            "cx",
            "cy",
            "",
        ];

        this.multiValueScaleProperties = [
            "viewport"
        ];

    }

    scaleObject(object, scaleProperties = this.scaleProperties, multiValueScaleProperties = this.multiValueScaleProperties) {
        console.log(object);
        for (const scaleProperty of scaleProperties) {
            if (this.propertyIsAvailable(object, scaleProperty)) {
                console.log(scaleProperty);
                const value = this.getPropertyValue(object, scaleProperty);
                console.log('value: ', value);
                const scaledValue = this.scaleValue(value)
                console.log('scaledValue: ', scaledValue);
                this.updateProperty(object, scaleProperty, scaledValue);
            }
        }
    }

    getPropertyValue(object, property) {
        return object.attributes[property];
    }

    propertyIsAvailable(object, property) {
        return !(!this.getPropertyValue(object, property));
    }

    /**
     * Scales the given value, rounds it to desired precision, strips and trims it.
     * @param value Numeric value
     */
    scaleValue(value) {
        return (Math.round((value * this.scale + Number.EPSILON) * 100) / 100).toString().trim();
    }

    updateProperty(object, property, newValue) {
        object.attributes[property] = newValue;
    }
}

module.exports = Scale;