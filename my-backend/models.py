from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.String, primary_key=True)  
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120))
    image = db.Column(db.String(200))

class ProductCatalog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    locus = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)

    user_id = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)

class Subcategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    locus = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    
    product_catalog_id = db.Column(db.Integer, db.ForeignKey('product_catalog.id'), nullable=False)

class Link(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    locus = db.Column(db.String(80), nullable=False)
    link = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(200))
    name = db.Column(db.String(120), nullable=False)
    
    user_id = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)

    product_catalog_id = db.Column(db.Integer, db.ForeignKey('product_catalog.id'))
    
    subcategory_id = db.Column(db.Integer, db.ForeignKey('subcategory.id'))