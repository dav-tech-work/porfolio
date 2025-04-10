function random10 (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    console.log(Math.floor(Math.random() * (max-min +1) + min));
}
random10(1,10)
random10(1,10)

