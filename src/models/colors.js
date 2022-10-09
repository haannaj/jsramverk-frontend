const docsColor = {
    getColor: function getColor(index) {
         // Colorways button
        const colorArray = [
            // 'linear-gradient(to right, #2C3E50 0%, #4CA1AF  51%, #2C3E50  100%)',
            'linear-gradient(to right, #DE6262 0%, #FFB88C  51%, #DE6262  100%)',
            'linear-gradient(to right, #FFB75E 0%, #ED8F03  51%, #FFB75E  100%)',
            'linear-gradient(to right, #4CB8C4 0%, #3CD3AD  51%, #4CB8C4  100%)',
            'linear-gradient(to right, #DE6262 0%, #FFB88C  51%, #DE6262  100%)',
            ]
        while (colorArray.length <= index ) {
        let number = ((index/colorArray.length)/0.7)
        index = Math.round(number)
        }
        
        return colorArray[index]
    },
    
};

export default docsColor;
