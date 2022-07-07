from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        image_url='https://images.squarespace-cdn.com/content/v1/5d7dafb4eabf16592a823ca0/df0f10e7-07a7-4866-a8ea-3b15d0037c86/20-0129_DEMO.png',
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaSP6seTMb4N1jcY1_L1z1yPelB91v2STK7Q&usqp=CAU',

        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaSP6seTMb4N1jcY1_L1z1yPelB91v2STK7Q&usqp=CAU',
        username='bobbie', email='bobbie@aa.io', password='password')

    charlie = User(
        image_url='https://m.media-amazon.com/images/I/61jjNdNQ-DL._AC_SL1000_.jpg',
        username='charlie', email='charlie@aa.io', password='password')

    chase = User(
        image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaSP6seTMb4N1jcY1_L1z1yPelB91v2STK7Q&usqp=CAU',
        username='chase', email='chase@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(charlie)
    db.session.add(chase)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
