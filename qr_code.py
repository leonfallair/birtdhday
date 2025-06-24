import qrcode

url = "https://leonfallair.github.io/birtdhday/"

img = qrcode.make(url)
img.save("geburtstag_nina_qrcode.png")
img.show()
