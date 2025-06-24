import qrcode

url = "https://deinname.github.io/birthday-nina"

img = qrcode.make(url)
img.save("geburtstag_nina_qrcode.png")
img.show()
