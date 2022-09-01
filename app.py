from flask import Flask, render_template, request, jsonify
import pyqrcode

app = Flask(__name__)

@app.route('/', methods=['GET'])
def init():
    return render_template('index.htm')

@app.route('/create-qrcode', methods=['POST'])
def create_qr():
    url = request.form.get('url', False)
    if url:
        return jsonify(
            data = f'data:image/png;base64,{pyqrcode.create(url).png_as_base64_str(scale=6)}',
            message = 'QR-Code Created Successfully',
            status = 200,
        ), 200

    return jsonify(
        message = 'No url provided!',
        status = 400
    ), 400

app.run(debug=False, host='0.0.0.0', port=33507)