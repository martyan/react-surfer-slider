function getTextWidth(text: string, font: string): number {
    // re-use canvas object for better performance
    let canvas = (getTextWidth as any).canvas || ((getTextWidth as any).canvas = document.createElement('canvas'))
    let context = canvas.getContext('2d')
    context.font = font
    let metrics = context.measureText(text)
    return Math.ceil(metrics.width)
}

export default getTextWidth
