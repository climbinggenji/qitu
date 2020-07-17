(function ($) {
    jQuery.fn.pluginName = function (settings) {
        this.each(function () {
            // element-specific code here
            let width = this.image.width;
            let height = this.image.height;

            let canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            let ctx = canvas.getContext("2d");
            ctx.drawImage(this.image, 0, 0);
            let data = ctx.getImageData(0, 0, width, height).data;
            let colorCount = 1 << 15;
            let histogram = new Int16Array(colorCount);

            for (let i = 0; i < data.length; i += 4) {
                let r = data[i] >> 3;
                let g = data[i + 1] >> 3;
                let b = data[i + 2] >> 3;
                histogram[r << (10) | g << 5 | b]++;
            }
            let distinctColorCount = 0;
            for (let color = 0; color < colorCount; color++) {
                if (histogram[color] > 0 && ColorCutQuantizer.shouldIgnoreColor(color)) {
                    histogram[color] = 0;
                }

                if (histogram[color] > 0) {
                    distinctColorCount++
                }
            }

            let colors = new Int16Array(distinctColorCount);
            let index = 0;
            for (let color = 0; color < colorCount; color++) {
                if (histogram[color] > 0) {
                    colors[index++] = color;
                }
            }
        });

        return this;
    };

    function fitBox() {
        this.minRed = this.minGreen = this.minBlue = Number.MAX_VALUE;
        this.maxRed = this.maxGreen = this.maxBlue = 0;
        this.population = 0;
    
        for (let i = this.lowerIndex; i <= this.upperIndex; i++) {
            let color = this.colors[i];
            this.population += this.histogram[color];
    
            let r = quantizedRed(color);
            let g = quantizedGreen(color);
            let b = quantizedBlue(color);
    
            if (r > this.maxRed) {
                this.maxRed = r
            }
            if (r < this.minRed) {
                this.minRed = r
            }
            if (g > this.maxGreen) {
                this.maxGreen = g
            }
            if (g < this.minGreen) {
                this.minGreen = g
            }
            if (b > this.maxBlue) {
                this.maxBlue = b
            }
            if (b < this.minBlue) {
                this.minBlue = b
            }
        }
    };
})(jQuery);