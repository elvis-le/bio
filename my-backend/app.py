from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash  
from models import db, User, Link, ProductCatalog, Subcategory
import jwt
from functools import wraps
import datetime
import os
import uuid

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL',
    'sqlite:///database.db'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.filter_by(id=data['user_id']).first()
            if not current_user:
                return jsonify({"error": "User not found"}), 401
        except:
            return jsonify({"error": "Token is invalid"}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "Thiếu thông tin username, email, hoặc password"}), 400

    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({"error": "Username hoặc email đã tồn tại"}), 409

    
    hashed_password = generate_password_hash(password)

    
    new_user = User(
        id=str(uuid.uuid4()),
        username=username,
        email=email,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": f"User {username} đã được tạo thành công.", "userId": new_user.id}), 201

@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or user.password != password:
        return jsonify({"error": "Email hoặc password không đúng"}), 400
    token = jwt.encode(
        {
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        },
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )

    return jsonify({"token": token}), 200

@app.route('/api/catalogs', methods=['GET'])
# @token_required
def get_user_catalogs():
    # Lấy danh sách catalogs dựa trên user_id từ token
    catalogs = ProductCatalog.query.filter_by(user_id="@elvisle").all()

    catalog_list = [
        {
            "id": catalog.id,
            "locus": catalog.locus,
            "name": catalog.name
        } for catalog in catalogs
    ]

    return jsonify(catalog_list), 200

@app.route('/api/subcategories', methods=['GET'])
# @token_required
def get_user_subcategories():
    # Lấy danh sách catalogs dựa trên user_id từ token
    catalog_id = request.args.get('catalog_id')
    subcategories = Subcategory.query.filter_by(product_catalog_id=catalog_id).all()
    subcategorie_list = [
        {
            "id": subcategorie.id,
            "locus": subcategorie.locus,
            "name": subcategorie.name,
            "product_catalog_id": subcategorie.product_catalog_id
        } for subcategorie in subcategories
    ]

    return jsonify(subcategorie_list), 200

@app.route('/api/products', methods=['GET'])
# @token_required
def get_user_products():
    products = Link.query.filter_by(user_id="@elvisle").all()
    product_list = [
        {
            "id": product.id,
            "locus": product.locus,
            "name": product.name,
            "link": product.link,
            "image": product.image,
            "user_id": product.user_id,
            "product_catalog_id": product.product_catalog_id,
            "subcategory_id": product.subcategory_id
        } for product in products
    ]

    return jsonify(product_list), 200


@app.route('/api/users/<string:username>/links', methods=['GET'])
def get_user_links(username):
    user = User.query.filter_by(username=username).first_or_404()
    links = Link.query.filter_by(user_id=user.id).all()

    link_list = [{
        "id": link.id,
        "name": link.name,
        "link": link.link,
        "image": link.image,
        "product_catalog_id": link.product_catalog_id,
        "subcategory_id": link.subcategory_id,
    } for link in links]

    return jsonify(link_list)

@app.route('/api/catalogs', methods=['POST'])
def create_product_catalog():
    data = request.get_json()
    user_id = data.get('userId')
    name = data.get('name')
    locus = data.get('locus')

    if not user_id or not name or not locus:
        return jsonify({"error": "Thiếu thông tin userId, name hoặc locus"}), 400

    new_catalog = ProductCatalog(
        user_id=user_id,
        name=name,
        locus=locus
    )
    db.session.add(new_catalog)
    db.session.commit()

    return jsonify({"id": new_catalog.id, "name": new_catalog.name}), 201


if __name__ == "__main__":

    app.run(debug=True, port=5000)