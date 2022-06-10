// MEASURE brightness
input.onButtonPressed(Button.A, function () {
    led.plotBarGraph(
    input.lightLevel(),
    255
    )
    basic.pause(5000)
    basic.clearScreen()
})
// INITIALIZE
let light_level_diff = 0
basic.showIcon(IconNames.Heart)
let strip = neopixel.create(DigitalPin.P0, 6, NeoPixelMode.RGB)
basic.pause(100)
basic.showIcon(IconNames.Yes)
basic.clearScreen()
let light_level_max = 0
let light_level_min = 255
// MEASURE max/min brightness
loops.everyInterval(1000, function () {
    light_level_max = Math.max(light_level_max, input.lightLevel())
    light_level_min = Math.min(light_level_min, input.lightLevel())
    light_level_diff = light_level_max - light_level_min
})
// CONTROL LED
basic.forever(function () {
    if (input.lightLevel() - light_level_min < 0.3 * light_level_diff) {
        strip.showColor(neopixel.colors(NeoPixelColors.Violet))
    } else {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
    }
    strip.show()
})
// SIMULATE random brightness by covering light
loops.everyInterval(randint(5000, 10000), function () {
    servos.P1.setAngle(0)
    basic.pause(randint(2000, 4000))
    servos.P1.setAngle(90)
    basic.pause(randint(2000, 4000))
})
