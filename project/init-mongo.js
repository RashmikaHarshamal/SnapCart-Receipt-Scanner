// MongoDB initialization script
db = db.getSiblingDB('snapcart');

db.createUser({
  user: 'snapcart_user',
  pwd: 'snapcart_password',
  roles: [
    {
      role: 'readWrite',
      db: 'snapcart',
    },
  ],
});

db.createCollection('receipts');
db.createCollection('items');

print('Database initialized successfully');